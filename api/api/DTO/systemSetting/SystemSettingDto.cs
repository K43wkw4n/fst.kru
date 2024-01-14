namespace api.DTO.systemSetting
{
    public class SystemSettingDto
    {
        public int? ID { get; set; }
        public string WebName { get; set; }
        public IFormFile? Logo { get; set; }
        public string PageFacebook { get; set; }
        public int BranchId { get; set; }
    }
}
