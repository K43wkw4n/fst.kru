using api.DTO;
using api.DTO.fst;
using api.DTO.OrderSlipMapper; 
using api.Models.Parcel;

namespace api.Service.OrderSlipS
{
    public interface IOrderSlipService
    {
        //------------------------------OrderSlip------------------------------//
        Task<Object> GetOrderSlipAsync();
        Task<Object> GetOrderSlipByBranchAsync(int branchId);
        Task<Object> GetItemByIdAsync(int OrderId);
        Task<Object> CreateOrderSlipItemAsync(OrderSlipItemRequest request);
        Task<Object> RemoveOrderSlipItemAsync(int OrderSlipItemId);
        Task<Object> CreateOrderSlipAsync(OrderSlipRequest request);

        Task<Object> ConfirmOrderSlipAsync(ConfirmOrderSlipDto request);
        Task<Object> RemoveOrderSlipAsync(int orderSlipId);
        //public Task<Object> DisableOrderSlipAsync();
        Task<Object> ChangeQuantityAsync(ChangeQuantityDto request);

        //------------------------------Budget------------------------------//
        Task<List<Budget>> GetBudgetsAsync();
        Task<Object> CreateUpdateBudgetAsync(BudgetDto budget);
        Task<Object> RemoveBudgetAsync(int budgetId);

        //------------------------------StorageLocation------------------------------//
        //Task<List<StorageLocation>> GetStorLocationAsync();
        //Task<Object> CreateUpdateStorLocationAsync(StorageLocationDto dto);
        //Task<Object> RemoveStorLocationAsync(int StorLocationId); 
        
    }
}
