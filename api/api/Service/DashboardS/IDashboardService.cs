namespace api.Service.DashboardS
{
    public interface IDashboardService
    {
        Task<Object> GetUserByIdAsync(int branchId);
        Task<Object> GetUserByPositionByIdAsync(int branchId);
        Task<Object> GetUserByLvEduByIdAsync(int branchId);
    }
}
