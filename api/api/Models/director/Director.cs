using api.Models.Person;

namespace api.Models.director
{
    public class Director
    {
        public int ID { get; set; }
        public string fullName { get; set; }
        public string? ImageName { get; set; }

        //ปิด isUsed ด้วย
        //public bool IsUsed { get; set; }
        public string Description { get; set; }
        public bool Hidden { get; set; }
        
        public int PositionId { get; set; }
        public Position Position { get; set; }
    }
}
