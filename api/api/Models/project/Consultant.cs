using api.Models.Person;
using System.Text.Json.Serialization;

namespace api.Models.project
{
    public class Consultant
    {
        public int ID { get; set; }
        public int ProjectId { get; set; }
        [JsonIgnore]
        public Project Project { get; set; }

        public int PersonnelId { get; set; }
        public Personnel Personnel { get; set; }
    }
}
