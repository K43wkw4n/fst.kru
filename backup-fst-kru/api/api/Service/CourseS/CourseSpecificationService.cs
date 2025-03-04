using api.Data;
using api.DTO.Course;
using api.Models.Course;
using api.Models.fst;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Service.CourseS
{
    public class CourseSpecificationService : ICourseSpecificationService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CourseSpecificationService(Context context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _webHostEnvironment = webHostEnvironment;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;

        //-------------------------------------courseSpecification-------------------------------------//

        public async Task<object> GetAllCourseSpecificationsAsync()
        {
            var result = await _context.CourseSpecifications
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Subjects)
                .Include(x => x.CategoryCourseSpecification)
                .Where(x => x.Hidden.Equals(false))
                .OrderByDescending(x => x.Personnel.FullName)
                .ThenByDescending(x => x.CreatedAt).ToListAsync();

            var newList = new List<object>();

            //var response = _mapper.Map<List<CourseSpecificationRespone>>(courseSpecifications);

            if (result == null) return null;

            foreach (var item in result)
            {
                var branchs = await _context.PersonnelinBranchs.Include(x => x.Branch).Where(x => x.PersonnelId.Equals(item.PersonnelId)).ToListAsync();

                newList.Add(new { item, Branch = branchs });
            }

            return newList;
        }

        public async Task<object> GetCourseSpecificationsByIdAsync(int branchId)
        {
            var result = await _context.CourseSpecifications
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Subjects)
                .Include(x => x.CategoryCourseSpecification)
                .Where(x => x.Hidden.Equals(false) && x.Personnel.PersonnelinBranchs.Any(x => x.BranchId.Equals(branchId))).OrderByDescending(x => x.CreatedAt).ToListAsync();

            var newList = new List<object>();

            //var response = _mapper.Map<List<CourseSpecificationRespone>>(courseSpecifications);

            if (result == null) return null;

            foreach (var item in result)
            {
                var branchs = await _context.PersonnelinBranchs.Include(x => x.Branch).Where(x => x.PersonnelId.Equals(item.PersonnelId)).ToListAsync();

                newList.Add(new { item, Branch = branchs });
            }

            return newList;
        }

        public async Task<object> GetCourseSpecificationsByUserAsync()
        {
            var courseSpecifications = await _context.CourseSpecifications
                .Include(x => x.Personnel)
                    .ThenInclude(x=>x.Prefixes)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                .Include(x => x.Subjects)
                .Include(x => x.CategoryCourseSpecification)
                .Where(x => x.Personnel.UserName.Equals(GetUserId()) && x.Hidden.Equals(false))
                .OrderByDescending(x=>x.CreatedAt)
                .ToListAsync();
             
            var newList = new List<object>();

            //var response = _mapper.Map<List<CourseSpecificationRespone>>(courseSpecifications);

            if (courseSpecifications == null) return null;

            foreach (var item in courseSpecifications)
            {
                var branchs = await _context.PersonnelinBranchs.Include(x=>x.Branch).Where(x => x.PersonnelId.Equals(item.PersonnelId)).ToListAsync();

                newList.Add(new { item , Branch = branchs });
            }

            return newList;
        }


        public async Task<object> CreateUpdateCourseSpecificationAsync(CourseSpecificationDto request)
        {
            var result = await _context.CourseSpecifications.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var course = _mapper.Map<CourseSpecification>(request);
                course.Hidden = false;
                course.CreatedAt = DateTime.Now;

                await _context.CourseSpecifications.AddAsync(course);
            }
            else
            {
                _mapper.Map(request, result);
                _context.CourseSpecifications.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UploadFileAsync(IFormFile file) => await ProcessFileUpload(file);

        public async Task<object> RemoveCourseSpecificationAsync(int courseId)
        {
            var result = await _context.CourseSpecifications.FirstOrDefaultAsync(x => x.ID.Equals(courseId));

            if (result is null) { return 1; }

            result.Hidden = !result.Hidden;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------categoryCourseSpecification-------------------------------------//

        public async Task<List<CategoryCourseSpecification>> GetCategoryCourseSAsync()
           => await _context.CategoryCourseSpecifications.ToListAsync();

        public async Task<object> GetCountCategoryCourseSpecificationAsync()
        {
            var result = await _context.CategoryCourseSpecifications.ToListAsync();

            List<object> list = new List<object>();

            if (result.Count > 0)
            {
                foreach (var item in result)
                {
                    var test = await _context.CourseSpecifications.Where(x => x.CategoryCourseSpecificationId.Equals(item.ID)).ToListAsync();

                    var count = test.Count();

                    list.Add(new { item, count });
                }
            }

            return list;
        }

        public async Task<object> CreateUpdateCategoryCourseSAsync(CategoryCourseSpecification request)
        {
            var result = await _context.CategoryCourseSpecifications.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var DT = new CategoryCourseSpecification()
                {
                    Name = request.Name,
                };

                await _context.CategoryCourseSpecifications.AddAsync(DT);
            }
            else
            {
                result.Name = request.Name;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveCategoryCourseSAsync(int categoryCourseId)
        {
            var result = await _context.CategoryCourseSpecifications.FirstOrDefaultAsync(x => x.ID.Equals(categoryCourseId));

            if (result is null) { return 1; }

            _context.CategoryCourseSpecifications.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------subjects-------------------------------------//

        public async Task<List<Subjects>> GetSubjectsAsync()
          => await _context.Subjects.ToListAsync();

        public async Task<object> CreateUpdateSubjectsAsync(Subjects request)
        {
            var result = await _context.Subjects.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var DT = new Subjects()
                {
                    CourseCode = request.CourseCode,
                    CourseName = request.CourseName,
                };

                await _context.Subjects.AddAsync(DT);
            }
            else
            {
                result.CourseCode = request.CourseCode;
                result.CourseName = request.CourseName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveSubjectsAsync(int subjectsId)
        {
            var result = await _context.Subjects.FirstOrDefaultAsync(x => x.ID.Equals(subjectsId));

            if (result is null) { return 1; }

            _context.Subjects.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------another-------------------------------------//

        private async Task<string> ProcessFileUpload(IFormFile file)
        {
            string fileName = null;

            if (file != null && file.Length > 0)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                var uploadsPath = Path.Combine(wwwRootPath, "upload-file-CourseSpecification");

                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                fileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }

            return fileName;
        }

    }
}
