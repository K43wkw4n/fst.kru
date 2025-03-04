namespace api.DTO.PaymentVoucherMapper
{
    public class PaymentVoucherRequest
    {
        public int ID { get; set; }
        public string PaymentVoucherImportantId { get; set; } //ใบสำคัญเลขที่ (จ.001) 
        public string Description { get; set; } //เพื่อใช้สำหรับ (หรือคำอธิบาย)  
        //public List<PaymentVoucherItemRequest> PaymentVoucherItems { get; set; } = new List<PaymentVoucherItemRequest>();
    }

    public class PaymentVoucherItemRequest
    {
        public List<ItemRequest> PaymentVoucherItems { get; set; } = new List<ItemRequest>();
    }

    public class ItemRequest
    { 
        public int Quantity { get; set; } //จำนวน
        public string Note { get; set; } //หมายเหตุ 
        public int ParcelOfBranchId { get; set; } //รหัสพัสดุ
        public int PaymentVoucherId { get; set; } //รหัสใบจ่าย
    }
}
