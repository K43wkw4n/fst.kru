namespace api.DTO.AnnualDirector
{
    public class DirectorTypeDto
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public List<AnnualDirectorDto> AnnualDirectors { get; set; } = new List<AnnualDirectorDto>(); 
    }
}
