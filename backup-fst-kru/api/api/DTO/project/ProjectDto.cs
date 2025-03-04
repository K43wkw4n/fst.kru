using api.DTO.fst;
using api.Models.Person;

namespace api.DTO.project
{
    public class ProjectDto
    {
        public int? ID { get; set; }
        public string NameTH { get; set; } //
        public string NameEN { get; set; } //
        public string Description { get; set; }
        public string? Image { get; set; } //
        public string? PDF { get; set; } //
        public string? YoutubeUrl { get; set; } //
        public string? WebUrl { get; set; } //
        public string? GithubUrl { get; set; } //
        public string KeyWords { get; set; }
        public bool IsUsed { get; set; }
        public DateTime CreatedAt { get; set; }
        public int StudentId { get; set; }

        public List<ConsultantDto> Consultants { get; set; } = new List<ConsultantDto>();
    } 

    public class ConsultantDto
    {
        public int? ID { get; set; }
        public int? ProjectId { get; set; } 

        public int PersonnelId { get; set; }
    }

}
