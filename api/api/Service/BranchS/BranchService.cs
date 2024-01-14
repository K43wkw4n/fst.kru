using api.Data;
using api.DTO.fst;
using api.DTO.systemSetting;
using api.Models.fst;
using api.Models.NEWS;
using api.Models.Parcel;
using api.Models.system;
using api.Service.UploadFileS;
using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace api.Service.BranchS
{
    public class BranchService : IBranchService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IUploadFileService _uploadFileService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BranchService(Context context, IMapper mapper, IUploadFileService uploadFileService, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _uploadFileService = uploadFileService;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<Branch>> GetBranchAsync()
        {
            return await _context.Branchs.ToListAsync();
        }

        public async Task<object> GetBranchByIdAsync(int branchId)
        {
            var result = await _context.Branchs.Include(x => x.SlideShows).FirstOrDefaultAsync(x => x.ID.Equals(branchId));

            if (result is null) return 1;

            return new
            {
                Branch = new
                {
                    result.ID,
                    result.BranchName,
                    result.Logo,
                    result.PageFacebook,
                    result.VideoUrl,
                    result.CategoryBranch,
                    result.CategoryMajor,
                    result.Text,
                },
                SlideShow = result.SlideShows.Select(x => new
                {
                    x.ID,
                    x.SlideShowName,
                    x.ImageName,
                }).ToList()
            };
        }

        public async Task<object> CreateUpdateBranchAsync(BranchDto request)
        {
            (string errorMessge, string imageName) =
                await UploadImageAsync(request.Logo, "branch");

            if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

            var result = await _context.Branchs.FirstOrDefaultAsync(x => x.ID == request.ID);

            var branch = _mapper.Map<Branch>(request);

            if (result is null)
            {
                branch.Logo = imageName;

                await _context.Branchs.AddAsync(branch);
            }
            else
            {
                result.BranchName = request.BranchName;
                result.PageFacebook = request.PageFacebook;
                result.VideoUrl = request.VideoUrl;

                result.CategoryBranch = request.CategoryBranch == null ? "" : request.CategoryBranch;
                result.CategoryMajor = request.CategoryMajor == null ? "" : request.CategoryMajor;
                result.Text = request.Text;

                if (request.Logo != null)
                {
                    await _uploadFileService.DeleteFileImage(result.Logo, "branch");
                    result.Logo = imageName;
                }

                _context.Branchs.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveBranchAsync(int branchId)
        {
            var result = await _context.Branchs.FirstOrDefaultAsync(x => x.ID == branchId);

            if (result is null) return 1;

            if (result.Logo != null)
            {
                await _uploadFileService.DeleteFileImage(result.Logo, "branch");
            }

            _context.Branchs.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------systemSetting-------------------------------------//

        public async Task<object> GetSystemSettingsByBranchAsync(int branchId)
        {
            var result = await _context.SystemSettings.FirstOrDefaultAsync(x => x.BranchId.Equals(branchId));

            if (result is null) return 1;

            return result;
        }

        public async Task<object> CreateUpdateSystemSettingsAsync(SystemSettingDto request)
        {
            (string errorMessge, string imageName) =
                await UploadImageAsync(request.Logo, "systemSetting");

            if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

            var result = await _context.SystemSettings.FirstOrDefaultAsync(x => x.ID == request.ID);

            var ss = _mapper.Map<SystemSetting>(request);

            if (result is null)
            {
                ss.Logo = imageName;

                await _context.SystemSettings.AddAsync(ss);
            }
            else
            {
                //_mapper.Map(request, result);
                result.WebName = request.WebName;
                result.PageFacebook = request.PageFacebook;
                result.BranchId = request.BranchId;

                if (request.Logo != null)
                {
                    await _uploadFileService.DeleteFileImage(result.Logo, "systemSetting");
                    result.Logo = imageName;
                }

                _context.SystemSettings.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------slideShow-------------------------------------//

        public async Task<object> GetSlideShowByIdAsync(int branchId)
        {
            return await _context.SlideShows.Where(x => x.BranchId.Equals(branchId)).ToListAsync(); ;
        }

        public async Task<object> CreateUpdateSlideShowAsync(SlideShowDto request)
        {
            (string errorMessge, string imageName) =
                await UploadImageAsync(request.ImageName, "slideShow");

            if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

            var result = await _context.SlideShows.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            var slide = _mapper.Map<SlideShow>(request);

            if (result is null)
            {
                slide.ImageName = imageName;

                await _context.SlideShows.AddAsync(slide);
            }
            else
            {
                result.SlideShowName = request.SlideShowName;
                result.BranchId = request.BranchId;

                if (request.ImageName != null)
                {
                    await _uploadFileService.DeleteFileImage(result.ImageName, "slideShow");
                    result.ImageName = imageName;
                }

                _context.SlideShows.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveSlideShowAsync(int slideShowId)
        {
            var result = await _context.SlideShows.FirstOrDefaultAsync(x => x.ID.Equals(slideShowId));

            if (result is null) return 1;

            if (result.ImageName != null)
            {
                await _uploadFileService.DeleteFileImage(result.ImageName, "slideShow");
            }

            _context.SlideShows.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------news-------------------------------------//

        public async Task<object> GetNewsByIdAync(int branchId)
        {
            var result = await _context.News.Include(x => x.NewsPhotos).Where(x => x.BranchId.Equals(branchId)).ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.Title,
                x.ImageName,
                x.Body,
                x.IsUsed,
                x.CreatedAt,
                NewsPhotos = x.NewsPhotos.Select(x => new
                {
                    x.ID,
                    x.Url,
                }).ToList()
            }).ToList();
        }

        public async Task<object> CreateUpdateNewsAync(NewsDto request)
        {
            (string errorMessges, List<string> imageNames) =
               await UploadImageAsync(request.FormFiles, "newsPhotos");

            (string errorMessge, string imageName) =
                await UploadImageAsync(request.ImageName, "news");

            if (!string.IsNullOrEmpty(errorMessge) || !string.IsNullOrEmpty(errorMessge)) return errorMessge;

            var result = await _context.News.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            var news = _mapper.Map<News>(request);

            if (result is null)
            {
                news.CreatedAt = DateTime.Now;
                news.ImageName = imageName;

                await _context.News.AddAsync(news);
                await _context.SaveChangesAsync();

                if (imageNames.Count() > 0)
                {
                    var images = new List<NewsPhoto>();
                    imageNames.ForEach(imageName =>
                    {
                        images.Add(new NewsPhoto
                        {
                            NewsId = news.ID,
                            Url = imageName
                        });
                    });

                    await _context.NewsPhotos.AddRangeAsync(images);
                }
            }
            else
            {
                result.Title = request.Title;
                result.Body = request.Body;

                if (request.ImageName != null)
                {
                    await _uploadFileService.DeleteFileImage(result.ImageName, "news");
                    result.ImageName = imageName;
                }

                //_mapper.Map(request, result);
                _context.News.Update(result);
                await _context.SaveChangesAsync();

                if (imageNames.Count() > 0)
                {
                    //Delete Old File
                    //var newsImage = await _context.NewsPhotos
                    //    .Where(x => x.NewsId.Equals(news.ID)).ToListAsync();

                    //if (newsImage is not null)
                    //{
                    //    //Delete Db
                    //    _context.NewsPhotos.RemoveRange(newsImage);
                    //    _context.SaveChangesAsync().Wait();

                    //    //Delete file
                    //    var file = newsImage.Select(x => x.Url).ToList();
                    //    await _uploadFileService.DeleteFileImages(file, "newsPhoto");
                    //}

                    var images = new List<NewsPhoto>();
                    imageNames.ForEach(imageName =>
                        images.Add(new NewsPhoto
                        {
                            NewsId = news.ID,
                            Url = imageName,
                        }));

                    await _context.NewsPhotos.AddRangeAsync(images);
                }
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveNewsAsync(int newsId)
        {
            var result = await _context.News.Include(x => x.NewsPhotos).FirstOrDefaultAsync(x => x.ID.Equals(newsId));

            if (result is null) return 1;

            if (result.ImageName != null)
            {
                await _uploadFileService.DeleteFileImage(result.ImageName, "news");
            }

            var file = result.NewsPhotos.ToList();
            await _uploadFileService.DeleteFileImages(file.Select(x => x.Url).ToList(), "newsPhotos");
            _context.NewsPhotos.RemoveRange(file);

            //foreach (var item in result.NewsPhotos)
            //{ 
            //    if (item.Url != null)
            //    {
            //        await _uploadFileService.DeleteFileImage(item.Url, "news");
            //    }

            //    _context.NewsPhotos.Remove(item);
            //}

            _context.News.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveNewsPhotoAsync(int newsPhotoId)
        {
            var result = await _context.NewsPhotos.FirstOrDefaultAsync(x => x.ID.Equals(newsPhotoId));

            if (result.Url != null)
            {
                await _uploadFileService.DeleteFileImage(result.Url, "newsPhotos");
            }

            _context.NewsPhotos.RemoveRange(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedNewsAync(int newsId)
        {
            var result = await _context.News.FirstOrDefaultAsync(x => x.ID.Equals(newsId));

            if (result is null) { return 1; }

            result.IsUsed = (result.IsUsed == 0) ? 1 : 0;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------what do we learn-------------------------------------//

        public async Task<object> GetWeLearnAsync(int branchId)
            => await _context.WeLearns.Where(x => x.BranchId.Equals(branchId)).ToListAsync();

        public async Task<object> CreateUpdateWeLearnAsync(WeLearnDto request)
        {
            (string errorMessge, string imageName) =
                await UploadImageAsync(request.ImageName, "weLearn");

            if (!string.IsNullOrEmpty(errorMessge)) return errorMessge;

            var result = await _context.WeLearns.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));

            var welearn = _mapper.Map<WeLearn>(request);

            if (result is null)
            {
                welearn.ImageName = imageName;

                await _context.WeLearns.AddAsync(welearn);
            }
            else
            {
                result.Title = request.Title;
                result.Description = request.Description;
                result.Content = request.Content;

                if (request.ImageName != null)
                {
                    await _uploadFileService.DeleteFileImage(result.ImageName, "weLearn");
                    result.ImageName = imageName;
                }

                //_mapper.Map(request, result);


                _context.WeLearns.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveWeLearnAsync(int weLearnId)
        {
            var result = await _context.WeLearns.FirstOrDefaultAsync(x => x.ID.Equals(weLearnId));

            if (result is null) return 1;

            if (result.ImageName is not null)
            {
                await _uploadFileService.DeleteFileImage(result.ImageName, "weLearn");
            }

            _context.WeLearns.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> IsUsedWeLearnAsync(int weLearnId)
        {
            var result = await _context.WeLearns.FirstOrDefaultAsync(x => x.ID.Equals(weLearnId));

            if (result is null) { return 1; }

            result.IsUsed = (result.IsUsed == 0) ? 1 : 0;

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------curriculum-------------------------------------//

        public async Task<object> GetCurriculumByIdAsync(int branchId)
        {
            var result = await _context.Curriculums
                .Include(x=>x.SubjectGroups).ThenInclude(x=>x.SubSubjectGroups)
                .Include(x=>x.GeneralTopics).ThenInclude(x=>x.SubGeneralTopics)
                .Where(x => x.BranchId.Equals(branchId)).ToListAsync();

            return result == null ? 1 : result.Select(x=> new {
                x.ID,
                x.CurriculumTH,
                x.CurriculumEN,
                x.Year,
                x.File,
                x.BranchId,
                GeneralTopics = x.GeneralTopics.Select(x=> new
                {
                    x.ID,
                    x.Name,
                    x.IsUsed,
                    x.CurriculumId,
                    SubGeneralTopics = x.SubGeneralTopics.Select(x=> new
                    {
                        x.ID,
                        x.Name,
                        x.GeneralTopicId,
                    })
                }).ToList(),
                SubjectGroups = x.SubjectGroups.Select(x=> new
                {
                    x.ID,
                    x.Name,
                    x.CurriculumId,
                    SubSubjectGroups = x.SubSubjectGroups.Select(x=> new
                    {
                        x.ID,
                        x.Name,
                        x.Credit,
                        x.SubjectGroupId,
                    }).ToList(),
                }).ToList(),
            });
        }

        public async Task<object> CreateUpdateCurriculumAsync(CurriculumDto request)
        {
            var result = await _context.Curriculums.FirstOrDefaultAsync(x => x.ID.Equals(request.ID));
             
            if (result is null)
            {
                var curriculum = _mapper.Map<Curriculum>(request); 
                await _context.Curriculums.AddAsync(curriculum);
            }
            else
            {  
                _mapper.Map(request, result);
                _context.Curriculums.Update(result);
            }
            
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> UploadFileAsync(IFormFile file) =>  await ProcessFileUpload(file); 

        public async Task<object> RemoveCurriculumAsync(int curriculumId)
        {
            var result = await _context.Curriculums.FirstOrDefaultAsync(x => x.ID.Equals(curriculumId));

            if (result is null) return 1;

            if (result.File is not null)
            {
                await _uploadFileService.DeleteFileImage(result.File, "upload-File");
            }

            _context.Curriculums.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveSubjectGroupAsync(int id)
        {
            var result = await _context.SubjectGroups.FirstOrDefaultAsync(x => x.ID.Equals(id));

            if (result is null) return 1;

            _context.SubjectGroups.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveSubSubjectGroupAsync(int id)
        {
            var result = await _context.SubSubjectGroups.FirstOrDefaultAsync(x=>x.ID.Equals(id));

            if (result is null) return 1;

            _context.SubSubjectGroups.Remove(result); 
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveGeneralTopicAsync(int id)
        {
            var result = await _context.GeneralTopics.FirstOrDefaultAsync(x => x.ID.Equals(id));

            if (result is null) return 1;

            _context.GeneralTopics.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveSubGeneralTopicAsync(int id)
        {
            var result = await _context.SubGeneralTopics.FirstOrDefaultAsync(x => x.ID.Equals(id));

            if (result is null) return 1;

            _context.SubGeneralTopics.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //-------------------------------------Another-------------------------------------//

        private async Task<string> ProcessFileUpload(IFormFile file)
        {
            string fileName = null;

            if (file != null && file.Length > 0)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                var uploadsPath = Path.Combine(wwwRootPath, "upload-File");

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

        //รูปเดียว
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

        //หลายรูป
        public async Task<(string errorMessge, List<string> imageNames)> UploadImageAsync(IFormFileCollection formfiles, string pathName)
        {
            var errorMessge = string.Empty;
            var imageNames = new List<string>();

            if (_uploadFileService.IsUpload(formfiles))
            {
                errorMessge = _uploadFileService.Validation(formfiles);
                if (errorMessge is null)
                {
                    imageNames = await _uploadFileService.UploadImages(formfiles, pathName);
                }
            }

            return (errorMessge, imageNames);
        }
    }
}
