namespace api.DTO.OrderSlipMapper
{
    public class OrderSlipRequest
    {
        public int ID { get; set; } 
        public string OrderSlipImportantId { get; set; } //ใบสำคัญเลขที่ (ร.001)
        public string OrderSlipNumber { get; set; } //เลขที่ใบเบิก
        public string PetitionNumber { get; set; } //เลขที่ฎีกา
        public int OrderSlipStatus { get; set; } //สถานะ (ได้รับการยืนยันการเบิกหรือไม่)
        public string Year { get; set; } //ปีเฉย ๆ (ต้องกรอกเอง) 
        public string StorageLocation { get; set; } //สถานที่จัดเก็บ

        public int BudgetId { get; set; } //รหัสงบประมาณ
        //public List<OrderSlipItemRequest> OrderSlipItems { get; set; } = new List<OrderSlipItemRequest>();
    }
    
    public class OrderSlipItemRequest
    {
        public List<ItemsRequest> OrderSlipItems { get; set; } = new List<ItemsRequest>();
    }

    public class ItemsRequest
    {
        public int Quantity { get; set; } //จำนวนพัสดุ  
        public int ParcelId { get; set; }
        public int OrderSlipId { get; set; }
        public int BranchId { get; set; }
    }
}
