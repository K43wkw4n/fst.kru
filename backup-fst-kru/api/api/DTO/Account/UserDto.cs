using api.Models.project;

namespace api.DTO.Account
{
    public class UserDto
    {
        public string FullName { get; set; } 
        public string UserName { get; set; }
        public string? Image { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public int RoleId { get; set; }
        public List<Project> Projects { get; set; }
        public DateTime YearEdu { get; set; }   
        public string Address { get; set; }

        public string? Expert { get; set; } //ความชำนาน
        public string? LvEdu { get; set; } //วุฒิการศึกษา 
        public string? Description { get; set; }

        public int PrefixId { get; set; }
        public string? PrefixName { get; set; }
         
        public int? PositionId { get; set; }
        public string? PositionName { get; set; }
        public int? GeneralPositionId { get; set; }
        public string? GeneralPositionName { get; set; }
    } 
}
