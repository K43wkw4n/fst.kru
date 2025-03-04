namespace api.Models.Parcel
{
    public class Budget
    { 
        public int ID { get; set; }
        public string BudgetName { get; set; } //ชื่อหรือตัวย่อ

        public ICollection<OrderSlip> OrderSlips { get; set; } = new List<OrderSlip>();
    } 
} 
