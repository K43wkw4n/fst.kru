namespace api.DTO.Account
{
    public class MyAccountPersonnelDto
    {
        public string FullName { get; set; }
        public string? Expert { get; set; } //ความชำนาน
        public string? LvEdu { get; set; } //วุฒิการศึกษา 
        public string? Description { get; set; }

        public int PrefixId { get; set; }
        public int? PositionId { get; set; }
        public int GeneralPositionId { get; set; }
    }
}
