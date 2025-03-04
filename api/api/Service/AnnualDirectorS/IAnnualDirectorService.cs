using api.DTO.AnnualDirector;
using api.DTO.Course; 
using api.Models.director;

namespace api.Service.AnnualDirectorS
{
    public interface IAnnualDirectorService 
    {
        Task<Object> GetAnnualDirectorAsync();
        Task<Object> CreateUpdateAnnualDirectorAsync(DirectorTypeDto request);
        Task<Object> RemoveAnnualDirectorAsync(int annDirectorId);
        Task<Object> IsUsedAnnDirectorAsync(int annDirectorId);
        Task<Object> UploadFileAnnDirectorAsync(IFormFile file);
        Task<Object> IsUsedDirectorTypeAsync(int directorTypeId);

        //-------------------------------------directorType-------------------------------------//

        Task<List<DirectorType>> GetDirectorTypeAsync(); 
        Task<Object> GetDirectorTypeByIdAsync(int directorTypeId);
        Task<Object> CreateUpdateDirectorTypeAsync(DirectorType request);
        Task<Object> RemoveDirectorTypeAsync(int directorTypeId);

        //-------------------------------------director-------------------------------------//

        Task<List<Director>> GetDirectorAsync();
        Task<Object> CreateUpdateDirectorAsync(DirectorDto request);
        Task<Object> RemoveDirectorAsync(int directorId);
        Task<Object> IsUsedDirectorAsync(int directorId);
        Task<Object> UploadImageAsync(IFormFile file);

        //-------------------------------------directorPosition-------------------------------------//

        Task<List<DirectorPosition>> GetDirectorPositionAsync();
        Task<Object> CreateUpdateDirectorPositionAsync(DirectorPosition request);
        Task<Object> RemoveDirectorPositionAsync(int directorPositionId);

    }
} 
