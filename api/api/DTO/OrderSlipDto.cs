using api.Models.Person;

namespace api.DTO
{
    public class OrderSlipDto
    {
        public int ID { get; set; }
        public string OrderSlipImportantId { get; set; } //ใบสำคัญเลขที่ (ร.001)
        public string OrderSlipNumber { get; set; } //เลขที่ใบเบิก
        public string PetitionNumber { get; set; } //เลขที่ฎีกา
        public int OrderSlipStatus { get; set; } //สถานะ (ได้รับการยืนยันการเบิกหรือไม่)
        public string Year { get; set; } //ปีเฉย ๆ (ต้องกรอกเอง) 
        public string StorageLocation { get; set; }
        public DateTime CreatedAt { get; set; }
        public int PersonnelID { get; set; }
        public int BudgetID { get; set; }

        public ICollection<SuppliesOfOrderItemDto> SuppliesOfOrderItems { get; set; }
    }
}
