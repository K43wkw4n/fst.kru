using System.Text.Json.Serialization;

namespace api.Models.fst
{
    public class Subsection
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string? PDF { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsUsed { get; set; } = true; 

        public int SectionId { get; set; }
        [JsonIgnore]
        public Section Section { get; set; }
    }
}
