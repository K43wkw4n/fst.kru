using api.DTO.fst;
using api.DTO.systemSetting;
using api.Service.BranchS;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BranchController : BaseController
    {
        private readonly IBranchService _branchService;

        public BranchController(IBranchService branchService)
        {
            _branchService = branchService;
        }

        private ActionResult ReturnStatus(object result)
        {
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetBranch()
            => Ok(await _branchService.GetBranchAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetBranchById(int branchId)
        {
            var result = await _branchService.GetBranchByIdAsync(branchId);
            if (result is int i && i == 1) return Ok(NotFound());
            else return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateBranch([FromForm] BranchDto request)
            => ReturnStatus(await _branchService.CreateUpdateBranchAsync(request));


        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveBranch(int branchId)
            => ReturnStatus(await _branchService.RemoveBranchAsync(branchId));

        //-------------------------------------systemSetting-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetSystemSettingsByBranch(int branchId)
        {
            var result = await _branchService.GetSystemSettingsByBranchAsync(branchId);
            if (result is int i && i == 1) return Ok(NotFound());
            else if (result is int j && j == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            else return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateSystemSettings([FromForm] SystemSettingDto request)
            => ReturnStatus(await _branchService.CreateUpdateSystemSettingsAsync(request));

        //-------------------------------------SlideShow-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetSlideShowById(int branchId)
            => Ok(await _branchService.GetSlideShowByIdAsync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateSlideShow([FromForm] SlideShowDto request)
        => ReturnStatus(await _branchService.CreateUpdateSlideShowAsync(request));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveSlideShow(int slideShowId)
       => ReturnStatus(await _branchService.RemoveSlideShowAsync(slideShowId));

        //-------------------------------------news-------------------------------------//


        [HttpGet("[action]")]
        public async Task<ActionResult> GetNewsById(int branchId)
            => Ok(await _branchService.GetNewsByIdAync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateNews([FromForm] NewsDto request)
            => ReturnStatus(await _branchService.CreateUpdateNewsAync(request));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveNews(int newsId)
            => ReturnStatus(await _branchService.RemoveNewsAsync(newsId));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveNewsPhoto(int newsPhotoId)
            => ReturnStatus(await _branchService.RemoveNewsPhotoAsync(newsPhotoId));

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedNews(int newsId)
            => ReturnStatus(await _branchService.IsUsedNewsAync(newsId));

        //-------------------------------------what do we learn-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetWeLearn(int branchId)
            => Ok(await _branchService.GetWeLearnAsync(branchId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateWeLearn([FromForm] WeLearnDto request)
         => ReturnStatus(await _branchService.CreateUpdateWeLearnAsync(request));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveWeLearn(int weLearnId)
         => ReturnStatus(await _branchService.RemoveWeLearnAsync(weLearnId));

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedWeLearn(int weLearnId) => Ok(await _branchService.IsUsedWeLearnAsync(weLearnId));

        //-------------------------------------curriculum-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetCurriculumById(int branchId)
        {
            var result = await _branchService.GetCurriculumByIdAsync(branchId);
            if (result is int i && i == 1) return Ok(NotFound());
            else return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateCurriculum(CurriculumDto request)
         => ReturnStatus(await _branchService.CreateUpdateCurriculumAsync(request));

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadFile([FromForm] IFormFile file)
            => Ok(await _branchService.UploadFileAsync(file));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveCurriculum(int curriculumId)
            => ReturnStatus(await _branchService.RemoveCurriculumAsync(curriculumId));
         
        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveSubjectGroup(int id)
            => ReturnStatus(await _branchService.RemoveSubjectGroupAsync(id));

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveSubSubjectGroup(int id)
            => ReturnStatus(await _branchService.RemoveSubSubjectGroupAsync(id));

        
        [HttpDelete("[action]")] 
        public async Task<ActionResult> RemoveGeneralTopic(int id) 
            => ReturnStatus(await _branchService.RemoveGeneralTopicAsync(id));
        
        [HttpDelete("[action]")] 
        public async Task<ActionResult> RemoveSubGeneralTopic(int id) 
            => ReturnStatus(await _branchService.RemoveSubGeneralTopicAsync(id));






    }
}
