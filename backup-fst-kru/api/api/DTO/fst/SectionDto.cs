namespace api.DTO.fst
{
    public class SectionDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        //public bool IsUsed { get; set; } = true;
        //public bool Hidden { get; set; } = false;

        public List<SubsectionDto> Subsections { get; set; } = new List<SubsectionDto>();
    }

    public class SubsectionDto
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? PDF { get; set; }
        //public bool IsUsed { get; set; } = true;

        public int SectionId { get; set; }
    }
}
