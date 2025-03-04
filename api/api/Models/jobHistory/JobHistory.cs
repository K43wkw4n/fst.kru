using api.Models.Person;

namespace api.Models.jobHistory
{
    public class JobHistory
    {
        public int ID { get; set; }
        public string JobName { get; set; }
        public string Position { get; set; }
        public DateTime StartJob { get; set; }
        public string Company { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsUsed { get; set; } = true;
        public int StudentId { get; set; }
        public Student Student { get; set; } 
    }
}
