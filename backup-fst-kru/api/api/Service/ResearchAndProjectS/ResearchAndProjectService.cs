using api.Data;
using api.DTO.researchAndProject;
using api.Models.researchAndProject;
using api.Service.UploadFileS;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Claims;

namespace api.Service.ResearchAndProjectS
{
    public class ResearchAndProjectService : IResearchAndProjectService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUploadFileService _uploadFileService;

        public ResearchAndProjectService(Context context, IMapper mapper, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment, IUploadFileService uploadFileService)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _webHostEnvironment = webHostEnvironment;
            _uploadFileService = uploadFileService;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;
         
        public async Task<object> GetResearchAndProjectByIdAsync(int branchId)
            => await _context.ResearchAndProjects
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                    .ThenInclude(x => x.Branch)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budget)
                .Include(x => x.Category)
                .Where(x => x.IsUsed.Equals(true) 
                && x.Hidden.Equals(false) 
                && x.Personnel.PersonnelinBranchs
                .Any(x => x.BranchId.Equals(branchId))).ToListAsync();

        public async Task<object> GetResearchAndProjectByIdAdminAsync(int branchId)
            => await _context.ResearchAndProjects
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                    .ThenInclude(x => x.Branch)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budget)
                .Include(x => x.Category)
                .Where(x => x.Hidden.Equals(false)
                && x.Personnel.PersonnelinBranchs
                .Any(x => x.BranchId.Equals(branchId))).ToListAsync();

        public async Task<object> GetResearchAndProjectByUserAsync()
        {
            var result = await _context.ResearchAndProjects
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                    .ThenInclude(x => x.Branch)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budget)
                .Include(x => x.Category)
                .Where(x => x.Personnel.UserName.Equals(GetUserId()) 
                && x.Hidden.Equals(false) && x.IsUsed.Equals(true)).ToListAsync();

            return result;
        }

        public async Task<object> GetResearchAndProjectByUserIdAsync(int userId)
        {
            var result = await _context.ResearchAndProjects
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.PersonnelinBranchs)
                    .ThenInclude(x => x.Branch)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budget)
                .Include(x => x.Category)
                .Where(x => x.PersonnelId.Equals(userId)
                && x.Hidden.Equals(false) && x.IsUsed.Equals(true)).ToListAsync();

            return result;
        }
        
        //หน้า jobhistory-page ทั้งหมด 
        public async Task<object> GetResearchAndProjectByBranchByGroupAllAsync(int branchId)
        {
            var result = await _context.ResearchAndProjects
                .Include(x => x.Personnel)
                .ThenInclude(x => x.PersonnelinBranchs)
                .ThenInclude(x => x.Branch)
                .Include(x => x.Personnel)
                .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budget)
                .Include(x => x.Category)
                 .Where(x => x.Personnel.PersonnelinBranchs.FirstOrDefault().BranchId.Equals(branchId))
                 .ToListAsync();

            if (result == null || result.Count == 0) return Array.Empty<object>();

            return result
                .OrderByDescending(x => x.CreatedAt)
                .ToList();
        }

        public object SearchResearchAndProjectAsync(int branchId, string? category, string? search)
        {
            var rap = _context.ResearchAndProjects
                    .Include(x => x.Personnel)
                        .ThenInclude(x => x.PersonnelinBranchs)
                        .ThenInclude(x => x.Branch)
                    .Include(x => x.Personnel)
                        .ThenInclude(x => x.Prefixes)
                    .Include(x => x.Budget)
                    .Include(x => x.Category)
                    .Where(x => x.IsUsed.Equals(true)
                    && x.Hidden.Equals(false)
                    && x.Personnel.PersonnelinBranchs
                    .Any(x => x.BranchId.Equals(branchId)))
                    .ToList();

            if (category != null)
            {
                rap = rap.Where(x => x.Category.Name.Contains(category)).ToList();
            }

            if (search != null)
            {
                rap = rap.Where(x => x.Name.Contains(search)).ToList();
            }
            
            return rap; 
        }

        public async Task<object> CreateUpdateRAPAsync(ResearchAndProjectDto request)
        {
            var result = await _context.ResearchAndProjects
                .FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var RAP = _mapper.Map<ResearchAndProject>(request);
                RAP.CreatedAt = DateTime.Now;
                RAP.IsUsed = true;
                RAP.Hidden = false;

                await _context.ResearchAndProjects.AddAsync(RAP);
            }
            else
            {
                _mapper.Map(request, result);
                _context.ResearchAndProjects.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveRAPAsync(int researchId)
        {
            var result = await _context.ResearchAndProjects.FirstOrDefaultAsync(x => x.ID.Equals(researchId));

            if (result is null) { return 1; }

            result.Hidden = !result.Hidden;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedResearchAsync(int researchId)
        {
            var result = await _context.ResearchAndProjects.FirstOrDefaultAsync(x => x.ID.Equals(researchId));

            if (result is null) { return 1; }

            result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UploadFileAsync(IFormFile file) => await ProcessFileUpload(file);

        public async Task<object> UploadImageAsync(IFormFile file)
        {
            (string errorMessge, string imageName) = await UploadImageAsync(file, "research");

            return imageName;
        }
         
        //-------------------------------------category-------------------------------------//

        public async Task<List<Category>> GetCategoryAsync()
            => await _context.Categories.ToListAsync();
         
        //ทำ dropdown หน้า home-project 
        public async Task<object> GetCategoryNameDDByBranchByGroupAsync(int branchId)
        {
            var result = await _context.Categories
                 .GroupBy(x => x.Name)
                 .ToListAsync();

            return result.Select(x => new
            {
                //ID = x.Select(item => item.ID).ToList(),
                x.Key,
            });
        }

        public async Task<object> CtreateUpdateCategoryAsync(Category request)
        {
            var result = await _context.Categories.FirstOrDefaultAsync(x => x.ID.Equals(request));

            if (result is null)
            {
                var cate = new Category()
                {
                    Name = request.Name,
                };

                await _context.Categories.AddAsync(cate);
            }
            else
            {
                result.Name = request.Name;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveCategoryAsync(int categoryId)
        {
            var result = await _context.Categories.FirstOrDefaultAsync(x => x.ID.Equals(categoryId));

            if (result is null) return 1;

            _context.Categories.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------another-------------------------------------//

        private async Task<string> ProcessFileUpload(IFormFile file)
        {
            string fileName = null;

            if (file != null && file.Length > 0)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                var uploadsPath = Path.Combine(wwwRootPath, "upload-pdf-research");

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

        public async Task<(string errorMessge, string imageNames)> UploadImageAsync(IFormFile formfile, string pathName)
        {
            var errorMessge = string.Empty;
            var imageName = string.Empty;

            if (_uploadFileService.IsUpload(formfile))
            {
                errorMessge = _uploadFileService.Validation(formfile);
                if (errorMessge is null)
                {
                    imageName = await _uploadFileService.UploadImage(formfile, pathName);
                }
            }

            return (errorMessge, imageName);
        }

        
    }
}
