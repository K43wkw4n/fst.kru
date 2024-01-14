using api.Models.fst;

namespace api.Models.system
{
    public class SystemSetting
    {
        public int ID { get; set; }
        public string WebName { get; set; }
        public string? Logo { get; set; }
        public string PageFacebook { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; } 
    }
}
