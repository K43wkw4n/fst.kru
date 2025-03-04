namespace api.Models.Parcel
{
    public class PaymentVoucherItem
    { 
        public int ID { get; set; }
        public int Quantity { get; set; } //จำนวน
        public string Note { get; set; } //หมายเหตุ

        public int ParcelOfBranchId { get; set; } //รหัสพัสดุ
        public ParcelOfBranch ParcelOfBranchs { get; set; }

        public int PaymentVoucherId { get; set; } //รหัสใบจ่าย
        public PaymentVoucher PaymentVouchers { get; set; } 

    }
}
