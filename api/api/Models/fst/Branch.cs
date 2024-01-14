using api.Models.Parcel;
using api.Models.system;
using System.Text.Json.Serialization;

namespace api.Models.fst
{
    public class Branch
    {
        public int ID { get; set; }
        public string BranchName { get; set; }
        public string? Logo { get; set; }
        public string PageFacebook { get; set; }
        public string? VideoUrl { get; set; }

        public string? CategoryBranch { get; set; }
        public string? CategoryMajor { get; set; }
        public string Text { get; set; }

        public ICollection<ParcelOfBranch> ParcelOfBranchs { get; set; } = new List<ParcelOfBranch>();  
        public ICollection<SlideShow> SlideShows { get; set; } = new List<SlideShow>();
         
        public ICollection<Curriculum> Curriculums { get; set; } = new List<Curriculum>();

    }
} 
