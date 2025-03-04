namespace api.Models.fst
{
    public class Section
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsUsed { get; set; } = true;
        public bool Hidden { get; set; } = false;

        public ICollection<Subsection> Subsections { get; set; } = new List<Subsection>();
    }
}
 