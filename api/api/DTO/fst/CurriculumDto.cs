namespace api.DTO.fst
{
    public class CurriculumDto
    {
        public int? ID { get; set; }
        public string CurriculumTH { get; set; }
        public string CurriculumEN { get; set; }
        public DateTime Year { get; set; }
        public string? File { get; set; }
        public int BranchId { get; set; }

        public List<GeneralTopicsDto> GeneralTopics { get; set; } = new List<GeneralTopicsDto>();
        public List<SubjectGroupDto> SubjectGroups { get; set; } = new List<SubjectGroupDto>();
    }
      
    public class GeneralTopicsDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public int IsUsed { get; set; }
        public int CurriculumId { get; set; }

        public List<SubGeneralTopicsDto> SubGeneralTopics { get; set; } = new List<SubGeneralTopicsDto>();
    }

    public class SubGeneralTopicsDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public int GeneralTopicsId { get; set; }
    }

    public class SubjectGroupDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public int CurriculumId { get; set; }

        public List<SubSubjectGroupDto> SubSubjectGroups { get; set; } = new List<SubSubjectGroupDto>();
    }

    public class SubSubjectGroupDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public int Credit { get; set; }
        public int SubjectGroupId { get; set; }
    }

}
