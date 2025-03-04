namespace api.Models.director
{
    public class DirectorType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public bool IsUsed { get; set; }

        public ICollection<AnnualDirector> AnnualDirectors { get; set; } = new List<AnnualDirector>();
    }
}
