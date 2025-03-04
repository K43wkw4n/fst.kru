namespace api.DTO.Account
{
    public class RegisterDto : LoginDto
    {
        public string FullName { get; set; }
        public IFormFile? Image { get; set; } = null;
        public string? Expert { get; set; } 
        public string? LvEdu { get; set; } 
        public string? Description { get; set; }

        public int GeneralPositionID { get; set; }  
        public int RoleID { get; set; } 
        public int PrefixID { get; set; }  

        public int BranchId { get; set; } 
        public int? PositionId { get; set; }
    }
}
