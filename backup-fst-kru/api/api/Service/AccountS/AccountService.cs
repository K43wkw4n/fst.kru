using api.Data;
using api.DTO.Account;
using api.DTO.job;
using api.DTO.project;
using api.Models.fst;
using api.Models.jobHistory; 
using api.Models.Person;
using api.Models.project;
using api.Service.UploadFileS;
using AutoMapper; 
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.IdentityModel.Tokens; 
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Service.AccountS
{
    public class AccountService : IAccountService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUploadFileService _uploadFileService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountService(Context context, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IUploadFileService uploadFileService, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _uploadFileService = uploadFileService;
            _webHostEnvironment = webHostEnvironment;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;
        
        private async Task<PersonnelinBranch> GetPersonnelinBranchIdAsync(string userId)
        {   
            var personnelInBranch = await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Position)
                .FirstOrDefaultAsync(x => x.Personnel.UserName.Equals(userId));
            
            if (personnelInBranch == null)
            {
                return null!;
            }

            return personnelInBranch;
        }
        
        public async Task<UserDto> GetCurrentUserAsync()
        {
            var user = await GetPersonnelinBranchIdAsync(GetUserId());

            //var test = await _context.Personnels
            //    .Include(x => x.Roles)
            //    .Include(x=>x.GeneralPositions)
            //    .FirstOrDefaultAsync(x => x.ID.Equals(Convert.ToInt32(GetUserId())));

            if (user is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

                var projects = await _context.Projects
                    .Include(x => x.Student)
                    .Where(x => x.StudentId.Equals(student.ID)).ToListAsync();

                return new UserDto()
                {
                    FullName = student.FullName,
                    UserName = student.UserName,
                    Image = student.Image,
                    UserId = student.ID,
                    Token = CreateToken(student, 1),
                    RoleId = 0,
                    Projects = projects,
                    YearEdu = student.YearEdu.Value,
                    Address = student.Address,
                };
            }
            else
            {
                return new UserDto()
                {
                    FullName = user.Personnel.FullName,
                    UserName = user.Personnel.UserName,
                    Image = user.Personnel.Image,
                    UserId = user.Personnel.ID,
                    Token = CreateToken(user.Personnel, 0),
                    RoleId = user.Personnel.RoleID,

                    Projects = new List<Project>(),

                    //personnel
                    Expert = user.Personnel.Expert,
                    LvEdu = user.Personnel.LvEdu,
                    Description = user.Personnel.Description,
                    PrefixId = user.Personnel.PrefixID,
                    PrefixName = user.Personnel.Prefixes.PrefixName,

                    PositionId = user.Position.ID,
                    PositionName = user.Position.PositionName,
                    GeneralPositionId = user.Personnel.GeneralPositions.ID,
                    GeneralPositionName = user.Personnel.GeneralPositions.GeneralPositionName,
                };
            }
        }

        // get prefix และ generalPositions และ position และ role
        public async Task<object> GetPrefixAndPositionAsync()
        {
            var Prefix = await _context.Prefixes.ToListAsync();
            var GeneralPosition = await _context.GeneralPositions.ToListAsync();
            var Position = await _context.Positions.ToListAsync();
            var Role = await _context.Roles.ToListAsync();

            return new { Prefix, GeneralPosition, Position, Role };
        }

        public async Task<object> GetAllUserAsync()
        {
            var result = await _context.Personnels
                .Include(x => x.GeneralPositions)
                .Include(x => x.Roles)
                .Include(x => x.Prefixes)
                .Include(x => x.Consultants)
                .Where(x => x.Hidden == false && x.RoleID != 1).ToListAsync();

            return result.Select(x => new
            {
                Projects = x,
                x.Consultants
            }).ToList();
        }

        public async Task<Personnel> GetUserByIdAsync(int userId)
        {
            var result = await _context.Personnels.FirstOrDefaultAsync(x => x.ID == userId);
            if (result == null) { return null!; }
            return result;
        }

        public async Task<object> RegisterAsync(RegisterDto request)
        {
            var user = await _context.Personnels.FirstOrDefaultAsync(x => x.UserName == request.UserName);

            if (user is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName == request.UserName);

                if (student is null)
                {
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                    var userMapper = _mapper.Map<Personnel>(request);
                    userMapper.PasswordHash = passwordHash;
                    userMapper.RoleID = request.RoleID;

                    if (request.Image != null)
                    {
                        (string errorMessge, string imageName) =
                        await UploadImageAsync(request.Image, "person");

                        if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                        userMapper.Image = imageName;
                    }

                    var PiB = new PersonnelinBranch()
                    {
                        Personnel = userMapper,
                        BranchId = request.BranchId,
                        PositionId = request.PositionId,
                        IsUsed = 1,
                    };

                    await _context.PersonnelinBranchs.AddAsync(PiB);

                    return await _context.SaveChangesAsync() > 0 ? null! : 0;
                }
                else
                {
                    return $"มี ชื่อผู้ใช้ {request.UserName} อยู่แล้ว";
                }
            }
            else
            {
                return $"มี ชื่อผู้ใช้ {request.UserName} อยู่แล้ว";
            }
        }

        public async Task<dynamic> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
            .ThenInclude(x => x.Roles)
                .FirstOrDefaultAsync(x => x.Personnel.UserName.Equals(loginDto.UserName)
                && x.BranchId.Equals(loginDto.BranchId)
                && x.IsUsed.Equals(1));

            if (user is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(loginDto.UserName)
                && x.BranchId.Equals(loginDto.BranchId)
                && x.IsUsed.Equals(1));

                if (student is null) { return null!; }

                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, student.PasswordHash)) { return 0; }

                return new UserDto() { UserName = student.UserName, FullName = student.FullName, UserId = student.ID, Token = CreateToken(student, 1) };
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Personnel.PasswordHash)) { return 0; }

            return new UserDto() { UserName = user.Personnel.UserName, FullName = user.Personnel.FullName, UserId = user.Personnel.ID, Token = CreateToken(user.Personnel, 0), RoleId = user.Personnel.RoleID };
        }

        //public async Task<dynamic> LoginAsync(LoginDto loginDto)
        //{
        //    var user = await _context.PersonnelinBranchs
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Prefixes)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.GeneralPositions) 
        //        .Include(x => x.Position)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Roles) 
        //        .FirstOrDefaultAsync(x => x.Personnel.UserName.Equals(loginDto.UserName)
        //        && x.BranchId.Equals(loginDto.BranchId)
        //        && x.IsUsed.Equals(1));

        //    if (user is null)
        //    {
        //        var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(loginDto.UserName)
        //        && x.BranchId.Equals(loginDto.BranchId)
        //        && x.IsUsed.Equals(1));

        //        if (student is null) { return null!; }

        //        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, student.PasswordHash)) { return 0; }


        //        var projects = await _context.Projects
        //            .Include(x => x.Student)
        //            .Where(x => x.StudentId.Equals(student.ID)).ToListAsync();

        //        //return new UserDto() { UserName = student.UserName, FullName = student.FullName, UserId = student.ID, Token = CreateToken(student, 1) };
        //        return new UserDto()
        //        {
        //            FullName = student.FullName,
        //            UserName = student.UserName,
        //            Image = student.Image,
        //            UserId = student.ID,
        //            Token = CreateToken(student, 1),
        //            RoleId = 0,
        //            Projects = projects,
        //            YearEdu = student.YearEdu.Value,
        //            Address = student.Address,
        //        };
        //    }

        //    if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Personnel.PasswordHash)) { return 0; }

        //    return new UserDto()
        //    {
        //        FullName = user.Personnel.FullName,
        //        UserName = user.Personnel.UserName,
        //        Image = user.Personnel.Image,
        //        UserId = user.Personnel.ID,
        //        Token = CreateToken(user.Personnel, 0),
        //        RoleId = user.Personnel.RoleID,

        //        //personnel
        //        Expert = user.Personnel.Expert,
        //        LvEdu = user.Personnel.LvEdu,
        //        Description = user.Personnel.Description,
        //        PrefixId = user.Personnel.PrefixID,
        //        PrefixName = user.Personnel.Prefixes.PrefixName,

        //        PositionId = user.Position.ID,
        //        PositionName = user.Position.PositionName,
        //        GeneralPositionId = user.Personnel.GeneralPositions.ID,
        //        GeneralPositionName = user.Personnel.GeneralPositions.GeneralPositionName,
        //    };
        //    //return new UserDto() { PrefixName = user.Personnel.Prefixes.PrefixName, UserName = user.Personnel.UserName, FullName = user.Personnel.FullName, UserId = user.Personnel.ID, Token = CreateToken(user.Personnel, 0), RoleId = user.Personnel.RoleID };
        //}


        //-------------------------------------admin-------------------------------------//

        public async Task<object> GetAllAdminByIdAsync(int branchId)
        {
            return await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Where(x => x.BranchId.Equals(branchId) && x.Personnel.Hidden.Equals(false)
                && x.IsUsed.Equals(1)
                && x.Personnel.RoleID.Equals(1)
                ).ToListAsync();
        }

        //-------------------------------------personnel-------------------------------------//

        public async Task<object> GetPersonnelByIdAsync(int branchId)
        {
            var query = _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Position).Where(x => x.Hidden.Equals(false));

            if (branchId != 0)
            {
                query = query.Where(x => x.BranchId.Equals(branchId));
            }

            return await query.ToListAsync();
        }
         
        public async Task<object> GetPersonnelAdminByIdAsync(int branchId) 
        {
            var query = _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Position).Where(x => x.Hidden.Equals(false));

            if (branchId != 0)
            {
                query = query.Where(x => x.BranchId.Equals(branchId));
            }

            return await query.ToListAsync();
        }

        //public async Task<object> GetPersonnelByIdAsync(int branchId)
        //{
        //    if (branchId == 0)
        //    {
        //        return await _context.PersonnelinBranchs
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.GeneralPositions)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Roles)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Prefixes)
        //        .Include(x => x.Position).Where(x => x.Hidden.Equals(false)).ToListAsync();
        //    }
        //    else
        //    {
        //        return await _context.PersonnelinBranchs
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.GeneralPositions)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Roles)
        //        .Include(x => x.Personnel)
        //            .ThenInclude(x => x.Prefixes)
        //        .Include(x => x.Position).Where(x => x.BranchId.Equals(branchId) && x.Hidden.Equals(false)).ToListAsync();
        //    }

        //}

        public async Task<object> UpdatePersonnelAsync(PersonnelDto request)
        {
            var result = await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Personnel) 
                    .ThenInclude(x => x.Prefixes).FirstOrDefaultAsync(x => x.PersonnelId.Equals(request.ID));

            result.Personnel.FullName = request.FullName;
            result.Personnel.UserName = request.UserName;
            result.Personnel.Expert = request.Expert;
            result.Personnel.LvEdu = request.LvEdu;
            result.Personnel.Description = request.Description;
            result.Personnel.GeneralPositionID = request.GeneralPositionId;
            result.Personnel.RoleID = request.RoleId;
            result.Personnel.PrefixID = request.PrefixId;
            result.BranchId = request.BranchId;
            result.PositionId = request.PositionId;

            if (request.Password != null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                result.Personnel.PasswordHash = passwordHash;
            }

            if (request.Image != null)
            {
                if (result.Personnel.Image is not null)
                {
                    await _uploadFileService.DeleteFileImage(result.Personnel.Image, "person");
                }

                (string errorMessge, string imageName) =
                    await UploadImageAsync(request.Image, "person");

                if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                result.Personnel.Image = imageName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UpdateMyAccountPersonnelAsync(MyAccountPersonnelDto request)
        {
            var result = await GetPersonnelinBranchIdAsync(GetUserId());
            
            if (result is null) return 1;

            result.Personnel.FullName = request.FullName;
            result.Personnel.Expert = request.Expert;
            result.Personnel.LvEdu = request.LvEdu;
            result.Personnel.Description = request.Description;
            result.Personnel.PrefixID = request.PrefixId;
            result.PositionId = request.PositionId;
            result.Personnel.GeneralPositionID = request.GeneralPositionId;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedUserAsync(int userId)
        {
            var result = await _context.PersonnelinBranchs.Include(x => x.Personnel).FirstOrDefaultAsync(x => x.PersonnelId.Equals(userId));

            if (result is null) { return 1; }

            result.IsUsed = (result.IsUsed == 0) ? 1 : 0;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveUserAsync(int userId)
        {
            var result = await _context.Personnels.FirstOrDefaultAsync(x => x.ID.Equals(userId));

            if (result is null) { return 1; }

            //if(result.Image is not null)
            //{
            //    await _uploadFileService.DeleteFileImage(result.Image, "person");
            //}

            var userinBranch = await _context.PersonnelinBranchs.FirstOrDefaultAsync(x => x.PersonnelId.Equals(result.ID));

            result.Hidden = !result.Hidden;
            userinBranch.Hidden = !userinBranch.Hidden;

            //_context.Personnels.Remove(result);
            //_context.PersonnelinBranchs.Remove(userinBranch);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------student-------------------------------------//

        public async Task<object> GetStudentByIdAsync(int branchId)
        {
            var query = _context.Students.Where(x => x.Hidden.Equals(false));

            if(branchId != 0)
            {
                query = query.Where(x => x.BranchId.Equals(branchId));
            }

            return await query.ToListAsync();
        }

        public async Task<object> CreateStudentAsync(CreateStudentDto request)
        {
            var result = await _context.Personnels.FirstOrDefaultAsync(x => x.ID.Equals(request.UserName));

            if (result is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName == request.UserName);

                if (student is null)
                {
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                    var studentMapper = _mapper.Map<Student>(request);
                    studentMapper.PasswordHash = passwordHash;
                    studentMapper.IsUsed = 1;
                    studentMapper.CreatedAt = DateTime.Now;

                    if (request.Image != null)
                    {
                        (string errorMessge, string imageName) =
                            await UploadImageAsync(request.Image, "student");

                        if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                        studentMapper.Image = imageName;
                    }

                    await _context.Students.AddAsync(studentMapper);
                    return await _context.SaveChangesAsync() > 0 ? null! : 0;
                }
                else
                {
                    return $"มี ชื่อผู้ใช้ {request.UserName} อยู่แล้ว";
                }
            }
            else
            {
                return $"มี ชื่อผู้ใช้ {request.UserName} อยู่แล้ว";
            }
        }

        public async Task<object> UpdateStudentAsync(EditStudentDto request)
        {
            var result = await _context.Students.FirstOrDefaultAsync(x => x.ID == request.ID);

            result.FullName = request.FullName;
            result.UserName = request.UserName;
            result.YearEdu = request.YearEdu;
            result.Address = request.Address;

            if (request.Password != null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                result.PasswordHash = passwordHash;
            }

            if (request.Image is not null)
            {
                if (result.Image is not null)
                {
                    await _uploadFileService.DeleteFileImage(result.Image, "student");
                }

                (string errorMessge, string imageName) =
                    await UploadImageAsync(request.Image, "student");

                if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                result.Image = imageName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
         
        public async Task<object> UpdateMyAccountStudentAsync(MyAccountStudentDto request)
        {
            var result = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

            result.FullName = request.FullName;
            result.Address = request.Address;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedStudentAsync(int studentId)
        {
            var result = await _context.Students.FirstOrDefaultAsync(x => x.ID.Equals(studentId));

            if (result is null) { return 1; }

            result.IsUsed = (result.IsUsed == 0) ? 1 : 0;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveStudentAsync(int studentId)
        {
            var result = await _context.Students.FirstOrDefaultAsync(x => x.ID.Equals(studentId));

            if (result is null) { return 1; }

            //if (result.Image is not null)
            //{
            //    await _uploadFileService.DeleteFileImage(result.Image, "student");
            //}

            result.Hidden = !result.Hidden;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public object GetDecodeTokenAsync(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodetoken = handler.ReadJwtToken(token);

            if (decodetoken != null)
            {
                var tokenExp = decodetoken.Claims.First(claim => claim.Type.Equals("exp")).Value;
                var time = long.Parse(tokenExp);
                var tokenDate = DateTimeOffset.FromUnixTimeSeconds(time).UtcDateTime;

                var now = DateTime.Now.ToUniversalTime();

                var exp = tokenDate >= now;

                //return new { decodetoken.Payload, time, exp };
                return exp;
            }

            return null!;
        }

        //-------------------------------------jobHistory-------------------------------------//

        public async Task<object> GetJobHistoryByBranchAsync(int branchId)
        {
            var result = await _context.JobHistories
                 .Include(x => x.Student)
                 .Where(x => x.Student.BranchId.Equals(branchId))
                 .OrderByDescending(x => x.CreatedAt).ToListAsync();
             
            return result.Select(x=> new
            {
                x.ID,
                x.Student.Image,
                x.Student.FullName,
                x.JobName,
                x.Company,
                x.Position,
                x.IsUsed,
                x.CreatedAt,
                x.StartJob,
            });
        }

        //ทำ dropdown หน้า jobhistory-page
        public async Task<object> GetJobHistoryDDByBranchByGroupAsync(int branchId)
        {
            var result = await _context.JobHistories
                 .Include(x => x.Student)
                 .Where(x => x.Student.BranchId.Equals(branchId))
                 .OrderByDescending(x => x.CreatedAt)
                 .GroupBy(x=>x.JobName)
                 .ToListAsync();

            return result.Select(x=> new
            {
                //ID = x.Select(item => item.ID).ToList(),
                x.Key,
            });
        }

        //หน้า jobhistory-page
        public async Task<object> GetJobHistoriesByNameAsync(string JobHistoryName)
        {
            var result = await _context.JobHistories
                 .Include(x => x.Student)
                 .Where(x => x.JobName.Equals(JobHistoryName))
                 .OrderByDescending(x => x.CreatedAt).ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.Student.Image,
                x.Student.FullName,
                x.JobName,
                x.Company,
                x.Position,
                x.IsUsed,
                x.CreatedAt,
                x.StartJob,
            });
        }

        //หน้า jobhistory-page ทั้งหมด
        public async Task<object> GetJobHistoryByBranchByGroupAllAsync(int branchId) 
        {
            var result = await _context.JobHistories
                 .Include(x => x.Student)
                 .Where(x => x.Student.BranchId.Equals(branchId)) 
                 .ToListAsync();
             
            if (result == null || result.Count == 0) return Array.Empty<object>();

            return result 
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new
                {
                    x.ID,
                    x.Student.Image,
                    x.Student.FullName,
                    x.JobName,
                    x.Company,
                    x.Position,
                    x.IsUsed,
                    x.CreatedAt,
                    x.StartJob,
                })
                .GroupBy(x => x.JobName)
                .ToList(); 
        }

        public async Task<object> GetJobHistoryByIdAsync()
            => await _context.JobHistories
                .Include(x=>x.Student)
                .Where(x => x.Student.UserName.Equals(GetUserId()))
            .OrderByDescending(x => x.CreatedAt).ToListAsync();

        public async Task<object> GetJobHistoryByUserIdAsync(int userId)
            => await _context.JobHistories
                .Where(x => x.StudentId.Equals(userId))
            .OrderByDescending(x => x.CreatedAt).ToListAsync();

        public async Task<object> CreateUpdateJobHistoryAsync(JobHistoryDto request)
        {
            var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

            var result = await _context.JobHistories.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));
             
            if (result is null)
            {
                var job = _mapper.Map<JobHistory>(request);
                job.CreatedAt = DateTime.Now;
                job.Student = student;

                await _context.JobHistories.AddAsync(job);
            }
            else
            {
                request.StudentId = student.ID;

                _mapper.Map(request, result);
                _context.JobHistories.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedJobAsync(int jobId)
        {
            var result = await _context.JobHistories.FirstOrDefaultAsync(x=>x.ID.Equals(jobId));

            if (result is null) return 1;

            result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveJobHistoryAsync(int jobHistoryId)
        {
            var result = await _context.JobHistories.FirstOrDefaultAsync(x=>x.ID.Equals(jobHistoryId));

            if (result is null) return 1;

            _context.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------user-------------------------------------//

        public async Task<object> UpdateImageUserAsync(IFormFile? file)
        {
            var user = await _context.Personnels.Include(x => x.Roles).FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

            if (user is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

                (string errorMessge, string imageName) =
               await UploadImageAsync(file, "student");

                if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                if (student.Image is not null)
                {
                    await _uploadFileService.DeleteFileImage(student.Image, "student");
                }

                student.Image = imageName;
            }
            else
            {
                (string errorMessge, string imageName) =
              await UploadImageAsync(file, "person");

                if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                if (user.Image is not null)
                {
                    await _uploadFileService.DeleteFileImage(user.Image, "person");
                }

                user.Image = imageName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> ChangePasswordAsync(ChangePasswordDto request)
        {
            var user = await _context.Personnels.Include(x => x.Roles).FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            if (user is null)
            {
                var student = await _context.Students.FirstOrDefaultAsync(x => x.UserName.Equals(GetUserId()));

                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, student.PasswordHash)) { return 0; }

                student.PasswordHash = passwordHash;
            }
            else
            {
                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash)) { return 0; }

                user.PasswordHash = passwordHash;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------projects-------------------------------------//

        public async Task<object> GetProjectByIdAsync(int branchId)
        => await _context.Projects
            .Include(x => x.Student)
            .Include(x => x.Consultants)
                .ThenInclude(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
            .Where(x => x.Student.BranchId.Equals(branchId) 
            && x.Hidden.Equals(false)
            && x.IsUsed.Equals(true)).ToListAsync();

        public async Task<object> GetProjectByIdAdminAsync(int branchId)
        => await _context.Projects
            .Include(x => x.Student)
            .Include(x => x.Consultants)
                .ThenInclude(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
            .Where(x => x.Student.BranchId.Equals(branchId) && x.Hidden.Equals(false)).ToListAsync();
         
        public object SearchProjectAsync(int branchId,string? search)
        {
            var projects = _context.Projects.Include(x => x.Student)
                .Include(x => x.Consultants)
                    .ThenInclude(x => x.Personnel)
                        .ThenInclude(x => x.Prefixes)
                .Where(x => x.Student.BranchId.Equals(branchId)
                && x.Hidden.Equals(false)
                && x.IsUsed.Equals(true))
                .ToList();

            if (search != null)
            {
                projects = projects.Where(p => p.NameTH.Contains(search) ||
                    JsonConvert.DeserializeObject<List<string>>(p.KeyWords).Any(kw => kw.Contains(search)))
                    .ToList();

            }
              
            return projects;
        }

        public async Task<object> GetProjectByUserAsync()
            => await _context.Projects
                .Include(x => x.Student)
                .Include(x => x.Consultants)
                    .ThenInclude(x => x.Personnel)
                        .ThenInclude(x => x.Prefixes)
                .Where(x => x.Student.UserName.Equals(GetUserId()) && x.Hidden.Equals(false) && x.IsUsed.Equals(true)).ToListAsync();
         
        public async Task<object> GetProjectByUserIdAsync(int userId)
            => await _context.Projects
                .Include(x => x.Student)
                .Include(x => x.Consultants)
                    .ThenInclude(x => x.Personnel)
                        .ThenInclude(x => x.Prefixes)
                .Where(x => x.Student.ID.Equals(userId) && x.Hidden.Equals(false) && x.IsUsed.Equals(true)).ToListAsync();

        public async Task<object> CreateUpdateProjectAsync(ProjectDto request)
        {
            var result = await _context.Projects
                .Include(x => x.Consultants)
                .FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var project = _mapper.Map<Project>(request);
                project.IsUsed = true;
                project.CreatedAt = DateTime.Now;

                await _context.Projects.AddAsync(project);
            }
            else
            { 
                _mapper.Map(request, result);
                result.IsUsed = true;
                _context.Projects.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UploadFileAsync(IFormFile file) => await ProcessFileUpload(file);

        public async Task<object> UploadImageAsync(IFormFile file)
        {
            (string errorMessge, string imageName) = await UploadImageAsync(file, "project");

            return imageName;
        }

        public async Task<object> RemoveConsultantAsync(int consultantId)
        {
            var result = await _context.Consultants.FirstOrDefaultAsync(x => x.ID.Equals(consultantId));

            if (result is null) return 1;

            _context.Consultants.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedProjectAsync(int projectId)
        {
            var result = await _context.Projects.FirstOrDefaultAsync(x => x.ID.Equals(projectId));

            if (result is null) { return 1; }

            result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveProjectAsync(int projectId)
        {
            var result = await _context.Projects.FirstOrDefaultAsync(x => x.ID.Equals(projectId));

            if (result is null) { return 1; }

            result.Hidden = !result.Hidden;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------roles-------------------------------------//

        public async Task<object> GetRolesAsync()
        {
            var result = await _context.Roles.Include(x => x.Personnels).ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.RoleName,
                Personnels = x.Personnels.Select(x => new
                {
                    x.ID,
                }),
            });
        }

        public async Task<object> CreateUpdateRoleAsync(Role request)
        {
            var result = await _context.Roles.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var role = new Role()
                {
                    RoleName = request.RoleName,
                };

                await _context.Roles.AddAsync(role);
            }
            else
            {
                result.RoleName = request.RoleName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveRoleAsync(int roleId)
        {
            var result = await _context.Roles.FirstOrDefaultAsync(x => x.ID.Equals(roleId));

            if (result is null) return 1;

            if (result.Personnels.Count == 0)
            {
                _context.Roles.Remove(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------prefixes-------------------------------------//

        public async Task<object> GetPrefixesAsync()
        {
            var result = await _context.Prefixes.ToListAsync();

            List<object> prefixes = new List<object>();

            foreach (var item in result)
            {
                var disable = await CheckCountPrefixesAsync(item.ID);

                prefixes.Add(new { item, disable });
            }

            return prefixes;
        } 

        public async Task<object> CreateUpdatePrefixAsync(Prefix request)
        {
            var prefix = await _context.Prefixes.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (prefix is null)
            {
                var Prefix = new Prefix()
                {
                    PrefixName = request.PrefixName,
                };

                await _context.Prefixes.AddAsync(Prefix);
            }
            else
            {
                prefix.PrefixName = request.PrefixName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<bool> CheckCountPrefixesAsync(int prefixesId)
        {
            var personCount = await _context.Personnels.Where(x => x.PrefixID == prefixesId).ToListAsync();

            return personCount.Count > 0;
        }

        public async Task<object> RemovePrefixAsync(int prefixId)
        {
            var result = await _context.Prefixes.FirstOrDefaultAsync(x => x.ID.Equals(prefixId));

            if (result is null) return 1;

            _context.Prefixes.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
         
        //-------------------------------------position-------------------------------------//
         
        public async Task<object> GetPositionsAsync()
        {
            var result = await _context.Positions.OrderBy(x => x.Sequence).ToListAsync();

            List<object> position = new List<object>();

            foreach (var item in result)
            {
                var disable = await CheckCountPositionAsync(item.ID);
                
                position.Add(new { item, disable });
            }
            
            return position;
        }

        public async Task<object> CreateUpdatePositionAsync(Position request)
        {
            var positions = await _context.Positions.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (positions is null)
            {
                var position = new Position()
                {
                    PositionName = request.PositionName,
                    Sequence = request.Sequence,
                };

                await _context.Positions.AddAsync(position); 
            }
            else
            {
                positions.PositionName = request.PositionName;
                positions.Sequence = request.Sequence;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<bool> CheckCountPositionAsync(int positionId)
        { 
            var personCount = await _context.PersonnelinBranchs.Include(x=>x.Position).Where(x=>x.PositionId == positionId).ToListAsync();

            var directorCount = await _context.Directors.Include(x => x.Position).Where(x => x.PositionId == positionId).ToListAsync();

            int count = personCount.Count + directorCount.Count;

            return count > 0;
        }

        public async Task<object> RemovePositionAsync(int positionId)
        {
            var result = await _context.Positions.FirstOrDefaultAsync(x => x.ID.Equals(positionId));
             
            if (result is null) return 1;

            _context.Positions.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------generalPosition-------------------------------------//
 
        public async Task<object> GetGeneralPositionsAsync()
        {
            var result = await _context.GeneralPositions.ToListAsync();

            List<object> generalPosition = new List<object>();

            foreach (var item in result)
            {
                var disable = await CheckCountGeneralPositionAsync(item.ID);

                generalPosition.Add(new { item, disable });
            }

            return generalPosition;
        }

        public async Task<object> CreateUpdateGeneralPositionAsync(GeneralPosition request)
        {
            var gp = await _context.GeneralPositions.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (gp is null)
            {
                var GP = new GeneralPosition()
                {
                    GeneralPositionName = request.GeneralPositionName,
                };

                await _context.GeneralPositions.AddAsync(GP);
            }
            else
            {
                gp.GeneralPositionName = request.GeneralPositionName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<bool> CheckCountGeneralPositionAsync(int gPositionId) 
        {
            var personCount = await _context.Personnels.Where(x => x.GeneralPositionID == gPositionId).ToListAsync();
            
            return personCount.Count > 0;
        }

        public async Task<object> RemoveGeneralPositionAsync(int gpId)
        {
            var result = await _context.GeneralPositions.FirstOrDefaultAsync(x => x.ID.Equals(gpId));

            if (result is null) return 1;

            _context.GeneralPositions.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        //-------------------------------------another-------------------------------------//

        private async Task<string> ProcessFileUpload(IFormFile file)
        {
            string fileName = null;

            if (file != null && file.Length > 0)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                var uploadsPath = Path.Combine(wwwRootPath, "upload-pdf-project");

                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                fileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }

            return fileName;
        }

        private string CreateToken(dynamic user, int status)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"])); // ที่อยู่ securityKey
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); // (1,2) 1. รหัสลับ 2. เข้ารหัส

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
                //new Claim(ClaimTypes.Name, user.ID.ToString())
            };

            if (status == 0)
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Roles.RoleName));
            }

            var token = new JwtSecurityToken(
                //issuer: _configuration["Jwt:Issuer"],
                //audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            var a = token;
            var s = new JwtSecurityTokenHandler().WriteToken(a);
            var d = s;

            return d;

        }

        public async Task<(string errorMessge, string imageNames)> UploadImageAsync(IFormFile formfile, string pathName)
        {
            var errorMessge = string.Empty;
            var imageName = string.Empty;

            if (_uploadFileService.IsUpload(formfile))
            {
                errorMessge = _uploadFileService.Validation(formfile);
                if (errorMessge is null)
                {
                    imageName = await _uploadFileService.UploadImage(formfile, pathName);
                }
            }

            return (errorMessge, imageName);
        }
         
    }
}
