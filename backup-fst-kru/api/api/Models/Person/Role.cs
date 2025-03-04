using api.Models.Parcel;

namespace api.Models.Person
{
    public class Role
    { 
        public int ID { get; set; }
        public string RoleName { get; set; }

        public ICollection<Personnel> Personnels { get; set; } = new List<Personnel>();
    }
}
