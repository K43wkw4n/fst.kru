namespace api.DTO.fst
{
    public class BranchDto
    {
        public int? ID { get; set; }
        public string BranchName { get; set; }
        public IFormFile? Logo { get; set; }
        public string PageFacebook { get; set; }
        public string? VideoUrl { get; set; }

        public string? CategoryBranch { get; set; }
        public string? CategoryMajor { get; set; }
        public string Text { get; set; }

    }
}
