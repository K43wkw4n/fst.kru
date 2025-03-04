using api.Data;
using api.DTO.AnnualDirector;
using api.Models.director;
using api.Models.fst;
using api.Service.UploadFileS;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Service.AnnualDirectorS
{
    public class AnnualDirectorService : IAnnualDirectorService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IUploadFileService _uploadFileService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AnnualDirectorService(Context context, IMapper mapper, IUploadFileService uploadFileService, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _uploadFileService = uploadFileService;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<object> GetAnnualDirectorAsync()
        {
            var annualDirectors = await _context.DirectorTypes
                .Include(x => x.AnnualDirectors.Where(x => !x.Hidden)).ThenInclude(x=>x.Director).ThenInclude(x=>x.Position)
                //.Include(x => x.Director)
                //    .ThenInclude(x => x.DirectorPosition)
                //.Where(x => x.AnnualDirectors.Any(x=>x.!Hidden))
                .ToListAsync();

            //var groupedAnnualDirectors = annualDirectors
            //    .GroupBy(x => x.DirectorType)
            //    .Select(group => new
            //    {
            //        DirectorType = group.Key,
            //        AnnualDirectors = group.ToList()
            //    })
            //    .ToList();

            return annualDirectors;
        }
         
        public async Task<object> CreateUpdateAnnualDirectorAsync(DirectorTypeDto request)
        {
            var result = await _context.DirectorTypes.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));
            
            if (result is null)
            {
                var directorType = _mapper.Map<DirectorType>(request);

                directorType.IsUsed = true;

                await _context.DirectorTypes.AddAsync(directorType);
            }
            else
            {
                _mapper.Map(request, result);

                _context.DirectorTypes.Update(result);
            }
            
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<object> RemoveAnnualDirectorAsync(int annDirectorId)
        {
            var result = await _context.AnnualDirectors.FirstOrDefaultAsync(x => x.ID.Equals(annDirectorId));

            if (result is null) { return 1; }

            result.Hidden = !result.Hidden;
            //_context.AnnualDirectors.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<object> IsUsedAnnDirectorAsync(int annDirectorId) 
        {
            var result = await _context.AnnualDirectors.FirstOrDefaultAsync(x => x.ID.Equals(annDirectorId));

            if (result is null) { return 1; }

            result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<object> UploadFileAnnDirectorAsync(IFormFile file)
            => await ProcessFileUpload(file, "upload-file-annualDirector");

        //-------------------------------------directorType-------------------------------------//

        public async Task<List<DirectorType>> GetDirectorTypeAsync()
            => await _context.DirectorTypes
            .Include(x=>x.AnnualDirectors.Where(x => x.IsUsed && !x.Hidden))
            .Where(x => x.AnnualDirectors.Count() != 0).ToListAsync();

        public async Task<object> GetDirectorTypeByIdAsync(int directorTypeId)
        {
            var result = await _context.DirectorTypes
            .Include(x => x.AnnualDirectors)
                .ThenInclude(x => x.Director)
                    .ThenInclude(x => x.Position)
            .FirstOrDefaultAsync(x => x.ID == directorTypeId && x.IsUsed);

            if (result == null || result.AnnualDirectors.Count == 0) return Array.Empty<object>();

            return result.AnnualDirectors
                .Where(x => x.IsUsed == true && x.Hidden == false) 
                .GroupBy(x=>x.Director.Position.Sequence)
                .OrderBy(x=>x.Key)
                .ToList();
        }

        public async Task<object> CreateUpdateDirectorTypeAsync(DirectorType request)
        {
            var result = await _context.DirectorTypes.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var DT = new DirectorType()
                {
                    Name = request.Name,
                };

                await _context.DirectorTypes.AddAsync(DT);
            }
            else
            {
                result.Name = request.Name;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<object> RemoveDirectorTypeAsync(int directorTypeId)
        {
            var result = await _context.DirectorTypes.FirstOrDefaultAsync(x => x.ID.Equals(directorTypeId));

            if (result is null) { return 1; }

            _context.DirectorTypes.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedDirectorTypeAsync(int directorTypeId)
        {
            var result = await _context.DirectorTypes.FirstOrDefaultAsync(x => x.ID.Equals(directorTypeId));

            if (result is null) { return 1; }

            result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------director-------------------------------------//

        public async Task<List<Director>> GetDirectorAsync()
            => await _context.Directors
            .Include(x=>x.Position)
            .Where(x => x.Hidden.Equals(false)).ToListAsync();
        
        public async Task<object> CreateUpdateDirectorAsync(DirectorDto request)
        {
            var result = await _context.Directors.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var director = _mapper.Map<Director>(request);
                 
                //director.IsUsed = true;
                director.Hidden = false;
                
                await _context.Directors.AddAsync(director);
            }
            else
            {
                _mapper.Map(request, result);
                _context.Directors.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveDirectorAsync(int directorId)
        {
            var result = await _context.Directors.FirstOrDefaultAsync(x => x.ID.Equals(directorId));

            if (result is null) { return 1; }

            result.Hidden = !result.Hidden;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        // == ไม่ได้ใช้
        public async Task<object> IsUsedDirectorAsync(int directorId)
        {
            var result = await _context.Directors.FirstOrDefaultAsync(x => x.ID.Equals(directorId));

            if (result is null) { return 1; }

            //result.IsUsed = !result.IsUsed;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UploadImageAsync(IFormFile file)
        {
            (string errorMessge, string imageName) = await UploadImageAsync(file, "director");

            return imageName;
        }

        //-------------------------------------directorPosition-------------------------------------//

        public async Task<List<DirectorPosition>> GetDirectorPositionAsync()
           => await _context.DirectorPositions.ToListAsync(); 

        public async Task<object> CreateUpdateDirectorPositionAsync(DirectorPosition request)
        {
            var result = await _context.DirectorPositions.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            if (result is null)
            {
                var DP = new DirectorPosition()
                {
                    PositionName = request.PositionName,
                };

                await _context.DirectorPositions.AddAsync(DP);
            }
            else
            {
                result.PositionName = request.PositionName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
         
        public async Task<object> RemoveDirectorPositionAsync(int directorPositionId)
        {
            var result = await _context.DirectorPositions.FirstOrDefaultAsync(x => x.ID.Equals(directorPositionId));

            if (result is null) { return 1; }

            _context.DirectorPositions.Remove(result); 

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------another-------------------------------------//

        private async Task<string> ProcessFileUpload(IFormFile file, string pathName)
        {
            string fileName = null;

            if (file != null && file.Length > 0)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                var uploadsPath = Path.Combine(wwwRootPath, pathName);

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
