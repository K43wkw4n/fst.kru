namespace api.DTO.Account
{
    public class RegisterDto : LoginDto
    {
        public string FullName { get; set; }
        public IFormFile? Image { get; set; } = null;
        public string Expert { get; set; } = ""; //ความชำนาน
        public string LvEdu { get; set; } = "";//วุฒิการศึกษา
        public string Description { get; set; } = "";

        public int GeneralPositionID { get; set; } //ตำแหน่งทั่วไป
        public int RoleID { get; set; } = 3; //บทบาท
        public int PrefixID { get; set; } //คำนำหน้าชื่อ

        public int BranchId { get; set; } 
        public int PositionId { get; set; }
    }
}
