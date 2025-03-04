using api.DTO.Course; 
using api.Models.Course;
using api.Service.CourseS;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{ 
    public class CourseSpecificationController : BaseController
    {
        private readonly ICourseSpecificationService _service;

        public CourseSpecificationController(ICourseSpecificationService service)
        {
            _service = service;
        }

        //-------------------------------------courseSpecification-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAllCourseSpecifications()
            => Ok(await _service.GetAllCourseSpecificationsAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetCourseSpecificationsById(int branchId) 
            => Ok(await _service.GetCourseSpecificationsByIdAsync(branchId));

        [Authorize]
        [HttpGet("[action]")] 
        public async Task<ActionResult> GetCourseSpecificationsByUser()
            => Ok(await _service.GetCourseSpecificationsByUserAsync());

        [HttpPost("[action]")] 
        public async Task<ActionResult> CreateUpdateCourseSpecification(CourseSpecificationDto request)
            => Ok(await _service.CreateUpdateCourseSpecificationAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")]
        public async Task<ActionResult> UploadFile([FromForm] IFormFile file)
            => Ok(await _service.UploadFileAsync(file));

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveCourseSpecification(int courseId)
        {
            var result = await _service.RemoveCourseSpecificationAsync(courseId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //-------------------------------------categoryCourseSpecification-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetCategoryCourseS()
            => Ok(await _service.GetCategoryCourseSAsync());

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetCountCategoryCourseSpecification()
            => Ok(await _service.GetCountCategoryCourseSpecificationAsync());

        [HttpPost("[action]")] 
        public async Task<ActionResult> CreateUpdateCategoryCourseS(CategoryCourseSpecification request)
            => Ok(await _service.CreateUpdateCategoryCourseSAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")] 
        public async Task<ActionResult> RemoveCategoryCourseS(int categoryCourseId)
        {
            var result = await _service.RemoveCategoryCourseSAsync(categoryCourseId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        //-------------------------------------subjects-------------------------------------//

        [HttpGet("[action]")]
        public async Task<ActionResult> GetSubjects()
            => Ok(await _service.GetSubjectsAsync());
         
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateSubjects(Subjects request)
            => Ok(await _service.CreateUpdateSubjectsAsync(request) == null ?
                StatusCode(StatusCodes.Status200OK) :
                StatusCode(StatusCodes.Status400BadRequest));

        [HttpPost("[action]")]
        public async Task<ActionResult> RemoveSubjects(int subjectsId)
        {
            var result = await _service.RemoveSubjectsAsync(subjectsId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        } 
    }
}
