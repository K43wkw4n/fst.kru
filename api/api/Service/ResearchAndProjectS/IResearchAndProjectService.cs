using api.DTO.researchAndProject;
using api.Models.researchAndProject;

namespace api.Service.ResearchAndProjectS
{
    public interface IResearchAndProjectService 
    {
        Task<Object> GetResearchAndProjectByIdAsync(int branchId);
        Task<Object> GetResearchAndProjectByIdAdminAsync(int branchId);
        Task<Object> GetResearchAndProjectByUserAsync();
        Task<Object> GetResearchAndProjectByUserIdAsync(int userId);

        Task<Object> GetResearchAndProjectByBranchByGroupAllAsync(int branchId);
        Object SearchResearchAndProjectAsync(int branchId, string? category, string? search);

        Task<Object> CreateUpdateRAPAsync(ResearchAndProjectDto request);
        Task<Object> RemoveRAPAsync(int researchId);
        Task<Object> IsUsedResearchAsync(int researchId);

        Task<Object> UploadFileAsync(IFormFile file);
        Task<Object> UploadImageAsync(IFormFile file);


        //-------------------------------------category-------------------------------------//

        Task<List<Category>> GetCategoryAsync(); 
        Task<Object> GetCategoryNameDDByBranchByGroupAsync(int branchId);
        Task<Object> CtreateUpdateCategoryAsync(Category request);
        Task<Object> RemoveCategoryAsync(int categoryId);

    }
}
