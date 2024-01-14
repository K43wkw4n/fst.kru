namespace api.DTO.Account
{
    public class PersonnelDto
    {
        public int? ID { get; set; }
        public string FullName { get; set; }
        public IFormFile? Image { get; set; }
        public string UserName { get; set; }
        public string? Password { get; set; }
        public string Expert { get; set; } = ""; //ความชำนาน
        public string LvEdu { get; set; } = "";//วุฒิการศึกษา
        public string Description { get; set; } = "";

        public int GeneralPositionId { get; set; } //ตำแหน่งทั่วไป
        public int RoleId { get; set; }
        public int PrefixId { get; set; }

        public int BranchId { get; set; }
         
        public int PositionId { get; set; }

    }
}
