using System.Text.Json.Serialization;

namespace api.Models.director
{
    public class AnnualDirector
    {
        public int ID { get; set; }
        public DateTime Year { get; set; }
        public bool IsUsed { get; set; }
        public string? PDF { get; set; }
        public bool Hidden { get; set; } 

        public int DirectorTypeId { get; set; }
        [JsonIgnore]
        public DirectorType DirectorType { get; set; }

        public int DirectorId { get; set; }
        public Director Director { get; set; }
    }
}
