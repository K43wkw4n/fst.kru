using api.Data;
using api.DTO.Account;
using api.DTO.job;
using api.DTO.project;
using api.Models.Person;
using api.Service.AccountS; 
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;  

namespace api.Controllers
{
    public class AccountController : BaseController
    {
        private readonly Context _context;
        private readonly IAccountService _accountService;

        public AccountController(Context context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAllUser() => Ok(await _accountService.GetAllUserAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPrefixAndPosition() => Ok(await _accountService.GetPrefixAndPositionAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetUserById(int userId)
        {
            var result = await _accountService.GetUserByIdAsync(userId);
            if(result == null) return NotFound();
            return Ok(result);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult> GetCurrentUser()
        { 
            return Ok(await _accountService.GetCurrentUserAsync());
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Register([FromForm] RegisterDto request)
        {
            var result = await _accountService.RegisterAsync(request);
            if (result == null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Login(LoginDto request)
        {
            var result = await _accountService.LoginAsync(request);
            if (result == null) return Ok(NotFound());
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest)); 
            return Ok(result);
        }

        //------------------------------admin--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAllAdminById(int branchId)
           => Ok(await _accountService.GetAllAdminByIdAsync(branchId));

        //------------------------------personnel--------------------------------//
         
        [HttpGet("[action]")]
        public async Task<ActionResult> GetPersonnelById(int branchId)
            => Ok(await _accountService.GetPersonnelByIdAsync(branchId));

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPersonnelAdminById(int branchId)
            => Ok(await _accountService.GetPersonnelAdminByIdAsync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> UpdatePersonnel([FromForm] PersonnelDto request)
        {
            var result = await _accountService.UpdatePersonnelAsync(request);

            return Ok(result == null ?
            StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }
          
        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> UpdateMyAccountPersonnel(MyAccountPersonnelDto request)
        {
            var result = await _accountService.UpdateMyAccountPersonnelAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedUser(int userId)
        {
            var result = await _accountService.IsUsedUserAsync(userId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")] 
        public async Task<ActionResult> RemoveUser(int userId)
        {
            var result = await _accountService.RemoveUserAsync(userId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------student--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetStudentById(int branchId)
            => Ok(await _accountService.GetStudentByIdAsync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateStudent([FromForm] CreateStudentDto request)
        {
            var result = await _accountService.CreateStudentAsync(request); 
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UpdateStudent([FromForm] EditStudentDto request)
        {
            var result = await _accountService.UpdateStudentAsync(request);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(result); 
        }
         
        [HttpPost("[action]")] 
        public async Task<ActionResult> IsUsedStudent(int studentId)
        {
            var result = await _accountService.IsUsedStudentAsync(studentId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [Authorize]
        [HttpPost("[action]")] 
        public async Task<ActionResult> UpdateMyAccountStudent(MyAccountStudentDto request)
        {
            var result = await _accountService.UpdateMyAccountStudentAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveStudent(int studentId)
        {
            var result = await _accountService.RemoveStudentAsync(studentId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------jobHistory--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetJobHistoryByBranch(int branchId)
            => Ok(await _accountService.GetJobHistoryByBranchAsync(branchId));

        [HttpGet("[action]")]
        public async Task<ActionResult> GetJobHistoryDDByBranchByGroup(int branchId) 
            => Ok(await _accountService.GetJobHistoryDDByBranchByGroupAsync(branchId));
        
        [HttpGet("[action]")] 
        public async Task<ActionResult> GetJobHistoriesByName(string JobHistoryName)
            => Ok(await _accountService.GetJobHistoriesByNameAsync(JobHistoryName));

        [HttpGet("[action]")]
        public async Task<ActionResult> GetJobHistoryByBranchByGroupAll(int branchId) 
            => Ok(await _accountService.GetJobHistoryByBranchByGroupAllAsync(branchId));

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult> GetJobHistoryById()
        {
            var result = await _accountService.GetJobHistoryByIdAsync();

            return Ok(result is int i && i == 1 ? NotFound() : result); 
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetJobHistoryByUserId(int userId)
        {
            var result = await _accountService.GetJobHistoryByUserIdAsync(userId);

            return Ok(result is int i && i == 1 ? NotFound() : result);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateJobHistory(JobHistoryDto request)
        {
            var result = await _accountService.CreateUpdateJobHistoryAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest)); 
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedJob(int jobId)
        {
            var result = await _accountService.IsUsedJobAsync(jobId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }
         
        [HttpPost("[action]")] 
        public async Task<ActionResult> RemoveJobHistory(int jobHistoryId)
        {
            var result = await _accountService.RemoveJobHistoryAsync(jobHistoryId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------user--------------------------------//

        [HttpPost("[action]")]
        public async Task<ActionResult> UpdateImageUser(IFormFile? file)
            => Ok(await _accountService.UpdateImageUserAsync(file));

        [Authorize]
        [HttpPost("[action]")] 
        public async Task<ActionResult> ChangePassword(ChangePasswordDto request)
        {
            var result = await _accountService.ChangePasswordAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------project--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetProjectById(int branchId) 
            => Ok(await _accountService.GetProjectByIdAsync(branchId));

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetProjectByIdAdmin(int branchId)
            => Ok(await _accountService.GetProjectByIdAdminAsync(branchId));

        [HttpGet("[action]")]
        public  ActionResult SearchProject(int branchId, string? search)
           => Ok(_accountService.SearchProjectAsync(branchId, search)); 

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult> GetProjectByUser()
            => Ok(await _accountService.GetProjectByUserAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetProjectByUserId(int userId)
            => Ok(await _accountService.GetProjectByUserIdAsync(userId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateProject(ProjectDto request)
        {
            var result = await _accountService.CreateUpdateProjectAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadFile(IFormFile file)
            => Ok(await _accountService.UploadFileAsync(file));

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadImage(IFormFile file)
            => Ok(await _accountService.UploadImageAsync(file));

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveConsultant(int consultantId)
        {
            var result = await _accountService.RemoveConsultantAsync(consultantId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedProject(int projectId) 
        {
            var result = await _accountService.IsUsedProjectAsync(projectId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveProject(int projectId) 
        {
            var result = await _accountService.RemoveProjectAsync(projectId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------roles--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetRoles()
            => Ok(await _accountService.GetRolesAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateRole(Role request) 
        {
            var result = await _accountService.CreateUpdateRoleAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveRole(int roleId) 
        {
            var result = await _accountService.RemoveRoleAsync(roleId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------prefixes--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPrefixes()
            => Ok(await _accountService.GetPrefixesAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdatePrefix(Prefix request)
        {
            var result = await _accountService.CreateUpdatePrefixAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemovePrefix(int prefixId)
        {
            var result = await _accountService.RemovePrefixAsync(prefixId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }
         
        //------------------------------position--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPositions()
            => Ok(await _accountService.GetPositionsAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdatePosition(Position request)
        {
            var result = await _accountService.CreateUpdatePositionAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> CheckCountPosition(int positionId)
            => Ok(await _accountService.CheckCountPositionAsync(positionId));
         
        [HttpPost("[action]")]
        public async Task<ActionResult> RemovePosition(int positionId)
        {
            var result = await _accountService.RemovePositionAsync(positionId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //------------------------------generalPosition--------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetGeneralPositions()
            => Ok(await _accountService.GetGeneralPositionsAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateGeneralPosition(GeneralPosition request)
        {
            var result = await _accountService.CreateUpdateGeneralPositionAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveGeneralPosition(int gpId)
        {
            var result = await _accountService.RemoveGeneralPositionAsync(gpId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }
        
        //------------------------------another--------------------------------//

        [HttpGet("[action]")]
        public ActionResult GetDecodeToken(string token)
        {
            var exp = _accountService.GetDecodeTokenAsync(token);
            if(exp == null) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(exp);
        }

    }
}
