using api.Models.Person;

namespace api.Models.fst
{
    public class PersonnelinBranch
    {
        public int ID { get; set; }
        public int PersonnelId { get; set; }
        public Personnel Personnel { get; set; }

        public int BranchId { get; set; }
        public Branch Branch { get; set; }

        public int PositionId { get; set; }
        public Position Position { get; set; }

        public int IsUsed { get; set; }
    }
}
