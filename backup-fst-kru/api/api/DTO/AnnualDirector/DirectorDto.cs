namespace api.DTO.AnnualDirector
{
    public class DirectorDto
    {
        public int ID { get; set; }
        public string fullName { get; set; }
        public string? ImageName { get; set; } 
        public string Description { get; set; } 

        public int PositionId { get; set; }
    }
}
 