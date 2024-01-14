namespace api.DTO.systemSetting
{
    public class NewsDto
    {
        public int? ID { get; set; }
        public string Title { get; set; }
        public IFormFile? ImageName { get; set; } 
        public string Body { get; set; } 
        public int BranchId { get; set; }
        public IFormFileCollection? FormFiles { get; set; }
    }
}
