using api.Models.Person;

namespace api.Models.Parcel
{
    public class OrderSlip
    { 
        public int ID { get; set; }
        public string OrderSlipImportantId { get; set; } //ใบสำคัญเลขที่ (ร.001)
        public string OrderSlipNumber { get; set; } //เลขที่ใบเบิก
        public string PetitionNumber { get; set; } //เลขที่ฎีกา
        public int OrderSlipStatus { get; set; } //สถานะ (ได้รับการยืนยันการเบิกหรือไม่)
        public string Year { get; set; } //ปีเฉย ๆ (ต้องกรอกเอง)
        public string StorageLocation { get; set; }
        public DateTime CreatedAt { get; set; }

        //public int PersonnelId { get; set; }
        public Personnel Personnels { get; set; }

        //public int BudgetId { get; set; } //รหัสงบประมาณ
        public Budget Budgets { get; set; }

        //public int StorageLocationId { get; set; } //สถานที่จัดเก็บ
        //public StorageLocation StorageLocations { get; set; }

        public ICollection<OrderSlipItem> OrderSlipItems { get; set; } = new List<OrderSlipItem>();

    }
}
