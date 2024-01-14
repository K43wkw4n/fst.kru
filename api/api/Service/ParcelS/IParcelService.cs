using api.DTO.ParcelMapper;
using api.Models.Parcel; 

namespace api.Service.ParcelS
{
    public interface IParcelService
    {
        Task<List<Parcel>> GetParcelAsync();
        Task<Object> GetParcelOfBranch(int BranchId);
        //Task<Object> GetSuppliesInStockAsync();
        Task<Object> CreateUpdateParcelAsync(ParcelRequest Parcel);
        Task<Object> RemoveParcelAsync(int ParcelId);
    }
}
