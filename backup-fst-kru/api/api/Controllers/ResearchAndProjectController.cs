using api.DTO.researchAndProject;
using api.Models.researchAndProject;
using api.Service.ResearchAndProjectS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ResearchAndProjectController : BaseController
    {
        private readonly IResearchAndProjectService _service;

        public ResearchAndProjectController(IResearchAndProjectService service)
        {
            _service = service;
        }

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetResearchAndProjectById(int branchId)
            => Ok(await _service.GetResearchAndProjectByIdAsync(branchId));
         
        [HttpGet("[action]")] 
        public async Task<ActionResult> GetResearchAndProjectByIdAdmin(int branchId)
            => Ok(await _service.GetResearchAndProjectByIdAdminAsync(branchId));

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult> GetResearchAndProjectByUser() 
            => Ok(await _service.GetResearchAndProjectByUserAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetResearchAndProjectByUserId(int userId)
            => Ok(await _service.GetResearchAndProjectByUserIdAsync(userId));

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetResearchAndProjectByBranchByGroupAll(int branchId)
            => Ok(await _service.GetResearchAndProjectByBranchByGroupAllAsync(branchId));

        [HttpGet("[action]")]
        public ActionResult SearchResearchAndProject(int branchId, string? category, string? search)
            => Ok(_service.SearchResearchAndProjectAsync(branchId, category, search));
         
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateRAP(ResearchAndProjectDto request)
            => Ok(await _service.CreateUpdateRAPAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveRAP(int researchId)
        {
            var result = await _service.RemoveRAPAsync(researchId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedResearch(int researchId)
        {
            var result = await _service.IsUsedResearchAsync(researchId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadFile(IFormFile file)
            => Ok(await _service.UploadFileAsync(file));

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadImage(IFormFile file)
            => Ok(await _service.UploadImageAsync(file));

        //-------------------------------------category-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetCategory() 
            => Ok(await _service.GetCategoryAsync());

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetCategoryNameDDByBranchByGroup(int branchId)
            => Ok(await _service.GetCategoryNameDDByBranchByGroupAsync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CtreateUpdateCategory(Category request) 
        {
            var result = await _service.CtreateUpdateCategoryAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveCategory(int categoryId)
        {
            var result = await _service.RemoveCategoryAsync(categoryId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

    }
}
