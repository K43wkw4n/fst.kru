namespace api.Models.fst
{
    public class WeLearn
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string ImageName { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int IsUsed { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
    }
}
