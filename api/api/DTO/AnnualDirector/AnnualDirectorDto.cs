namespace api.DTO.AnnualDirector
{
    public class AnnualDirectorDto
    {
        public int ID { get; set; }
        public DateTime Year { get; set; } 
        public string? PDF { get; set; }

        public bool IsUsed { get; set; }

        public int DirectorTypeId { get; set; } 

        public int DirectorId { get; set; } 
    }
}
