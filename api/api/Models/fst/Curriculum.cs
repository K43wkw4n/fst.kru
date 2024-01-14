using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.fst
{
    public class Curriculum
    {
        public int ID { get; set; }
        public string CurriculumTH { get; set; }
        public string CurriculumEN { get; set; }
        public DateTime Year { get; set; }
        public string? File { get; set; }
        public int BranchId { get; set; }
        //public Branch Branch { get; set; }

        public ICollection<GeneralTopic> GeneralTopics { get; set; } = new List<GeneralTopic>();
        public ICollection<SubjectGroup> SubjectGroups { get; set; } = new List<SubjectGroup>();
    }
     
    [Table("GeneralTopics")]
    public class GeneralTopic
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int IsUsed { get; set; }
        public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }

        public ICollection<SubGeneralTopic> SubGeneralTopics { get; set; } = new List<SubGeneralTopic>();
    }

    [Table("SubGeneralTopics")]
    public class SubGeneralTopic
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int GeneralTopicId { get; set; }
        public GeneralTopic GeneralTopic { get; set; }
    }

    [Table("SubjectGroup")]
    public class SubjectGroup
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }
        public ICollection<SubSubjectGroup> SubSubjectGroups { get; set; } = new List<SubSubjectGroup>();
    }

    [Table("SubSubjectGroup")]
    public class SubSubjectGroup
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Credit { get; set; }
        public int SubjectGroupId { get; set; }
        public SubjectGroup SubjectGroup { get; set; }
    }

}
