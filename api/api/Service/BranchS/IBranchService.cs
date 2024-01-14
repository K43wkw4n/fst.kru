using api.DTO.fst;
using api.DTO.systemSetting;
using api.Models.fst;
using api.Models.system;

namespace api.Service.BranchS
{
    public interface IBranchService
    {
        Task<List<Branch>> GetBranchAsync(); 
        Task<Object> GetBranchByIdAsync(int branchId);
        Task<Object> CreateUpdateBranchAsync(BranchDto request);
        Task<Object> RemoveBranchAsync(int branchId);

        //-------------------------------------systemSetting-------------------------------------//

        Task<Object> GetSystemSettingsByBranchAsync(int branchId);
        Task<Object> CreateUpdateSystemSettingsAsync(SystemSettingDto request);

        //-------------------------------------SlideShow-------------------------------------//

        Task<Object> GetSlideShowByIdAsync(int branchId);
        Task<Object> CreateUpdateSlideShowAsync(SlideShowDto request);
        Task<Object> RemoveSlideShowAsync(int slideShowId);

        //-------------------------------------news-------------------------------------//

        Task<Object> GetNewsByIdAync(int branchId);
        Task<Object> CreateUpdateNewsAync(NewsDto request);
        Task<Object> RemoveNewsAsync(int newsId);
        Task<Object> RemoveNewsPhotoAsync(int newsPhotoId);
        Task<Object> IsUsedNewsAync(int newsId);

        //-------------------------------------what do we learn-------------------------------------//

        Task<Object> GetWeLearnAsync(int branchId);
        Task<Object> CreateUpdateWeLearnAsync(WeLearnDto request);
        Task<Object> RemoveWeLearnAsync(int weLearnId);
        Task<Object> IsUsedWeLearnAsync(int weLearnId);

        //-------------------------------------curriculum-------------------------------------//

        Task<Object> GetCurriculumByIdAsync(int branchId);
        Task<Object> CreateUpdateCurriculumAsync(CurriculumDto request);
        Task<Object> UploadFileAsync(IFormFile file);
        Task<Object> RemoveCurriculumAsync(int curriculumId);
        Task<Object> RemoveSubjectGroupAsync(int id);
        Task<Object> RemoveSubSubjectGroupAsync(int id);
        Task<Object> RemoveGeneralTopicAsync(int id);
        Task<Object> RemoveSubGeneralTopicAsync(int id);
    }
}
 