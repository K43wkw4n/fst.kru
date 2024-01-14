namespace api.DTO.fst
{
    public class WeLearnDto
    {
        public int? ID { get; set; }
        public string Title { get; set; }
        public IFormFile? ImageName { get; set; }
        public required string Description { get; set; }
        public string Content { get; set; }
        public int BranchId { get; set; }
    }
}
