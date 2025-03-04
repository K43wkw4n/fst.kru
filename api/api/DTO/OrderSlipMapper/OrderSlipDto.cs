namespace api.DTO.OrderSlipMapper
{
    public class OrderSlipDto
    {
        public int ID { get; set; }
        public string OrderSlipImportantId { get; set; } //ใบสำคัญเลขที่ (ร.001)
        public string OrderSlipNumber { get; set; } //เลขที่ใบเบิก
        public string PetitionNumber { get; set; } //เลขที่ฎีกา
        public int OrderSlipStatus { get; set; } //สถานะ (ได้รับการยืนยันการเบิกหรือไม่)
        public string Year { get; set; } //ปีเฉย ๆ (ต้องกรอกเอง) 
        public string StorageLocation { get; set; } //สถานที่จัดเก็บ

        public int BudgetId { get; set; } //รหัสงบประมาณ
        public List<OrderSlipItemsDto> OrderSlipItems { get; set; } = new List<OrderSlipItemsDto>();

    }
    
    public class OrderSlipItemsDto
    {
        public int Quantity { get; set; } //จำนวนพัสดุ  
        public int ParcelOfBranchId { get; set; } 
        public int OrderSlipId { get; set; }
    }
}
