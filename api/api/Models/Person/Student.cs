using api.Models.fst;
using api.Models.jobHistory;
using System.Text.Json.Serialization;

namespace api.Models.Person
{
    public class Student
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string? Image { get; set; }
        public int IsUsed { get; set; }
        public DateTime? YearEdu { get; set; }
        public string? Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }

        public bool Hidden { get; set; }

        [JsonIgnore]
        public ICollection<JobHistory> JobHistories { get; set; } = new List<JobHistory>();
    }
}
