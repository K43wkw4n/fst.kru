using api.DTO.AnnualDirector; 
using api.Models.director;
using api.Service.AnnualDirectorS;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class AnnualDirectorController : BaseController
    {
        private readonly IAnnualDirectorService _service;

        public AnnualDirectorController(IAnnualDirectorService service)
        {
            _service = service;
        }

        //-------------------------------------director-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAnnualDirector()
            => Ok(await _service.GetAnnualDirectorAsync());
         
        [HttpPost("[action]")] 
        public async Task<ActionResult> CreateUpdateAnnualDirector(DirectorTypeDto request)
            => Ok(await _service.CreateUpdateAnnualDirectorAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));
         
        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveAnnualDirector(int annDirectorId)
        {
            var result = await _service.RemoveAnnualDirectorAsync(annDirectorId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedAnnDirector(int annDirectorId)
        {
            var result = await _service.IsUsedAnnDirectorAsync(annDirectorId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadFileAnnDirector([FromForm] IFormFile file)
            => Ok(await _service.UploadFileAnnDirectorAsync(file));

        //-------------------------------------directorType-------------------------------------//

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetDirectorType()
           => Ok(await _service.GetDirectorTypeAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetDirectorTypeById(int directorTypeId)
            => Ok(await _service.GetDirectorTypeByIdAsync(directorTypeId));

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateDirectorType(DirectorType request)
            => Ok(await _service.CreateUpdateDirectorTypeAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveDirectorTypeAsync(int directorTypeId)
        {
            var result = await _service.RemoveDirectorTypeAsync(directorTypeId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedDirectorType(int directorTypeId)
        {
            var result = await _service.IsUsedDirectorTypeAsync(directorTypeId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //-------------------------------------director-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetDirector()
           => Ok(await _service.GetDirectorAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateDirector(DirectorDto request)
            => Ok(await _service.CreateUpdateDirectorAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));
         
        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveDirector(int directorId)
        {
            var result = await _service.RemoveDirectorAsync(directorId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedDirector(int directorId)
        {
            var result = await _service.IsUsedDirectorAsync(directorId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadImage(IFormFile file)
            => Ok(await _service.UploadImageAsync(file));

        //-------------------------------------directorPosition-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetDirectorPosition()
          => Ok(await _service.GetDirectorPositionAsync());

        [HttpPost("[action]")] 
        public async Task<ActionResult> CreateUpdateDirectorPosition(DirectorPosition request)
            => Ok(await _service.CreateUpdateDirectorPositionAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")] 
        public async Task<ActionResult> RemoveDirectorPosition(int directorPositionId)
        {
            var result = await _service.RemoveDirectorPositionAsync(directorPositionId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

    }
}
