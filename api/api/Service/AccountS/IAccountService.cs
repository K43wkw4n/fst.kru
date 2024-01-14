using api.DTO.Account;
using api.Models.Person;

namespace api.Service.AccountS
{
    public interface IAccountService
    {
        Task<Object> GetPrefixAndPositionAsync();
        Task<UserDto> GetCurrentUserAsync(); 
        Task<List<Personnel>> GetAllUserAsync();
        Task<Personnel> GetUserByIdAsync(int userId);
        Task<Object> RegisterAsync(RegisterDto registerDto);
        Task<Object> LoginAsync(LoginDto loginDto);
        Task<Object> UpdatePersonnelAsync(PersonnelDto request);
        Task<Object> GetPersonnelByIdAsync(int branchId);
        Task<Object> IsUsedUserAsync(int userId);
        Object GetDecodeTokenAsync(string token);
    }
}
