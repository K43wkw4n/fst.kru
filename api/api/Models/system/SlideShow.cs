using api.Models.fst;

namespace api.Models.system
{
    public class SlideShow
    {
        public int ID { get; set; }
        public string SlideShowName { get; set; }
        public string? ImageName { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
    }
}
