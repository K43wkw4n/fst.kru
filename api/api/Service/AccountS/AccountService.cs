using api.Data;
using api.DTO.Account;
using api.Models.fst;
using api.Models.Parcel;
using api.Models.Person;
using api.Service.UploadFileS;
using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

        public AccountService(Context context, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IUploadFileService uploadFileService)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _uploadFileService = uploadFileService;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;

        public async Task<UserDto> GetCurrentUserAsync()
        {
            var user = await _context.Personnels.Include(x => x.Roles).FirstOrDefaultAsync(x => x.ID.Equals(Convert.ToInt32(GetUserId())));

            return new UserDto() { UserName = user.UserName, UserId = user.ID, Token = CreateToken(user) };
        }

        public async Task<object> GetPrefixAndPositionAsync()
        {
            var Prefix = await _context.Prefixes.ToListAsync();
            var GeneralPosition = await _context.GeneralPositions.ToListAsync();
            var Position = await _context.Positions.ToListAsync();
            var Role = await _context.Roles.ToListAsync();

            return new { Prefix, GeneralPosition, Position, Role };
        }

        public async Task<List<Personnel>> GetAllUserAsync() =>
            await _context.Personnels.Include(x => x.GeneralPositions)
                .Include(x => x.Roles)
                .Include(x => x.Prefixes).ToListAsync();

        public async Task<Personnel> GetUserByIdAsync(int userId)
        {
            var result = await _context.Personnels.FirstOrDefaultAsync(x => x.ID == userId);
            if (result == null) { return null!; }
            return result;
        }

        public async Task<object> RegisterAsync(RegisterDto request)
        {
            var user = await _context.Personnels.FirstOrDefaultAsync(x => x.UserName == request.UserName);

            if (user != null) { return $"มี {request.UserName} อยู่แล้ว"; }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var userMapper = _mapper.Map<Personnel>(request);
            userMapper.PasswordHash = passwordHash;
            userMapper.RoleID = request.GeneralPositionID == 2 ? 2 : 3;
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

        public async Task<dynamic> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Personnels.Include(x => x.Roles).FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) { return null!; }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash)) { return 0; }

            return new UserDto() { UserName = user.UserName, UserId = user.ID, Token = CreateToken(user) };
        }

        public async Task<object> GetPersonnelByIdAsync(int branchId)
        {
            var result = await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Position).Where(x => x.BranchId.Equals(branchId)).ToListAsync();

            return result == null ? 1 : result;
        }

        public async Task<object> UpdatePersonnelAsync(PersonnelDto request)
        {
            var result = await _context.PersonnelinBranchs
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Roles)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes).FirstOrDefaultAsync(x => x.PersonnelId.Equals(request.ID));
             
            //if (result is null)
            //{
            //    var user = _mapper.Map<Personnel>(request);
            //    user.PasswordHash = passwordHash;

            //    var PiB = new PersonnelinBranch()
            //    {
            //        Personnel = user,
            //        BranchId = request.BranchId,
            //        PositionId = request.PositionId,
            //        IsUsed = 1,
            //    };

            //    await _context.PersonnelinBranchs.AddAsync(PiB);
            //}

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
                await _uploadFileService.DeleteFileImage(result.Personnel.Image, "person");
                (string errorMessge, string imageName) =
                    await UploadImageAsync(request.Image, "person");

                if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

                result.Personnel.Image = imageName;
            }
             
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedUserAsync(int userId)
        {
            var result = await _context.PersonnelinBranchs.Include(x => x.Personnel).FirstOrDefaultAsync(x => x.PersonnelId.Equals(userId));

            if (result is null) { return 1; }

            result.IsUsed = (result.IsUsed == 0) ? 1 : 0;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        private string CreateToken(Personnel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"])); // ที่อยู่ securityKey
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); // (1,2) 1. รหัสลับ 2. เข้ารหัส
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,user.ID.ToString()),
                new Claim(ClaimTypes.Role,user.Roles.RoleName)
            };

            var token = new JwtSecurityToken(
                //issuer: _configuration["Jwt:Issuer"],
                //audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddYears(1),
                signingCredentials: credentials);

            var a = token;
            var s = new JwtSecurityTokenHandler().WriteToken(a);
            var d = s;

            return d;

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

        //-------------------------------------Another-------------------------------------//

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
