namespace api.DTO.systemSetting
{
    public class SlideShowDto
    {
        public int? ID { get; set; }
        public string SlideShowName { get; set; }
        public IFormFile? ImageName { get; set; }
        public int BranchId { get; set; }
    }
}
 