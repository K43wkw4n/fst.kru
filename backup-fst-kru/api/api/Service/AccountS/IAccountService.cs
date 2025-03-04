using api.DTO.Account;
using api.DTO.job;
using api.DTO.project;
using api.Models.Person;

namespace api.Service.AccountS
{
    public interface IAccountService
    { 
        Task<Object> GetPrefixAndPositionAsync();
        Task<UserDto> GetCurrentUserAsync(); 
        Task<Object> GetAllUserAsync();
        Task<Personnel> GetUserByIdAsync(int userId);
        Task<Object> RegisterAsync(RegisterDto registerDto);
        Task<Object> LoginAsync(LoginDto loginDto);

        //-----------------------------------admin---------------------------------------// 

        Task<Object> GetAllAdminByIdAsync(int branchId);

        //-----------------------------------personnel---------------------------------------//
         
        Task<Object> GetPersonnelByIdAsync(int branchId);
        Task<Object> GetPersonnelAdminByIdAsync(int branchId); 
        Task<Object> UpdatePersonnelAsync(PersonnelDto request);
        Task<Object> UpdateMyAccountPersonnelAsync(MyAccountPersonnelDto request);
        Task<Object> IsUsedUserAsync(int userId);
        Task<Object> RemoveUserAsync(int userId);
        Task<Object> GetStudentByIdAsync(int branchId);

        //-----------------------------------student---------------------------------------//

        Task<Object> CreateStudentAsync(CreateStudentDto request);
        Task<Object> UpdateStudentAsync(EditStudentDto request);
        Task<Object> UpdateMyAccountStudentAsync(MyAccountStudentDto request);
        Task<Object> IsUsedStudentAsync(int studentId);
        Task<Object> RemoveStudentAsync(int studentId);

        //-----------------------------------jobHistory---------------------------------------//

        Task<Object> GetJobHistoryByBranchAsync(int branchId); 
        Task<Object> GetJobHistoryDDByBranchByGroupAsync(int branchId);
        Task<Object> GetJobHistoriesByNameAsync(string JobHistoryName);
        Task<Object> GetJobHistoryByBranchByGroupAllAsync(int branchId); 
        Task<Object> GetJobHistoryByIdAsync();
        Task<Object> GetJobHistoryByUserIdAsync(int userId);
        Task<Object> CreateUpdateJobHistoryAsync(JobHistoryDto request);
        Task<Object> IsUsedJobAsync(int jobId);
        Task<Object> RemoveJobHistoryAsync(int jobHistoryId);

        //-----------------------------------user---------------------------------------//
        Task<Object> UpdateImageUserAsync(IFormFile? file);
        Task<Object> ChangePasswordAsync(ChangePasswordDto request);

        //-------------------------------------projects-------------------------------------//

        Task<Object> GetProjectByIdAsync(int branchId);
        Task<Object> GetProjectByIdAdminAsync(int branchId);
        Object SearchProjectAsync(int branchId, string? search);
        Task<Object> GetProjectByUserAsync();
        Task<Object> GetProjectByUserIdAsync(int userId);
        Task<Object> CreateUpdateProjectAsync(ProjectDto request);  
        Task<Object> UploadFileAsync(IFormFile file);
        Task<Object> UploadImageAsync(IFormFile file);
        Task<Object> RemoveConsultantAsync(int consultantId);
        Task<Object> IsUsedProjectAsync(int projectId);
        Task<Object> RemoveProjectAsync(int projectId);

        //-----------------------------------roles---------------------------------------//

        Task<Object> GetRolesAsync();
        Task<Object> CreateUpdateRoleAsync(Role request);
        Task<Object> RemoveRoleAsync(int roleId);

        //-------------------------------------prefixes-------------------------------------//

        Task<Object> GetPrefixesAsync();
        Task<Object> CreateUpdatePrefixAsync(Prefix request);
        Task<Object> RemovePrefixAsync(int prefixId);
         
        //-------------------------------------position-------------------------------------//

        Task<Object> GetPositionsAsync();
        Task<Object> CreateUpdatePositionAsync(Position request);
        Task<bool> CheckCountPositionAsync(int positionId);
        Task<Object> RemovePositionAsync(int positionId);

        //-------------------------------------generalPosition-------------------------------------//

        Task<Object> GetGeneralPositionsAsync();
        Task<Object> CreateUpdateGeneralPositionAsync(GeneralPosition request);
        Task<Object> RemoveGeneralPositionAsync(int gpId);

        //-----------------------------------another---------------------------------------//

        Object GetDecodeTokenAsync(string token);
    }
}
