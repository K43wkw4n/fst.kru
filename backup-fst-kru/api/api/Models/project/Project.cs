using api.Models.Person;

namespace api.Models.project
{
    public class Project
    {
        public int ID { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public string? PDF { get; set; }
        public string? YoutubeUrl { get; set; }
        public string? WebUrl { get; set; }
        public string? GithubUrl { get; set; }
        public string KeyWords { get; set; }
        public bool IsUsed { get; set; }
        public DateTime CreatedAt { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        
        public bool Hidden { get; set; }

        public ICollection<Consultant> Consultants { get; set; } = new List<Consultant>(); 

    }
}
