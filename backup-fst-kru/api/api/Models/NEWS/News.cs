using api.Models.fst; 

namespace api.Models.NEWS
{
    public class News
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string? ImageName { get; set; }
        public string? Body { get; set; }
        public bool IsUsed { get; set; } 
        public DateTime CreatedAt { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }

        public bool Hidden { get; set; } 

        public ICollection<NewsPhoto> NewsPhotos { get; set; } = new List<NewsPhoto>();
    }
} 
