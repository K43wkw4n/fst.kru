using api.DTO.Course;
using api.Models.Course;

namespace api.Service.CourseS
{
    public interface ICourseSpecificationService
    {

        //-------------------------------------courseSpecification-------------------------------------//

        Task<Object> GetAllCourseSpecificationsAsync(); 
        Task<Object> GetCourseSpecificationsByIdAsync(int branchId);
        Task<Object> GetCourseSpecificationsByUserAsync();
        Task<Object> CreateUpdateCourseSpecificationAsync(CourseSpecificationDto request);
        Task<Object> UploadFileAsync(IFormFile file);
        Task<Object> RemoveCourseSpecificationAsync(int courseId);

        //-------------------------------------categoryCourseSpecification-------------------------------------//
         
        Task<List<CategoryCourseSpecification>> GetCategoryCourseSAsync();
        Task<object> GetCountCategoryCourseSpecificationAsync();
        Task<Object> CreateUpdateCategoryCourseSAsync(CategoryCourseSpecification request);
        Task<Object> RemoveCategoryCourseSAsync(int categoryCourseId);

        //-------------------------------------subjects-------------------------------------//

        Task<List<Subjects>> GetSubjectsAsync();
        Task<Object> CreateUpdateSubjectsAsync(Subjects request);
        Task<Object> RemoveSubjectsAsync(int subjectsId);
    }
} 
