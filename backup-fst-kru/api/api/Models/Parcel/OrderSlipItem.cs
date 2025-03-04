namespace api.Models.Parcel
{
    public class OrderSlipItem
    { 
        public int ID { get; set; }
        public int Quantity { get; set; } //จำนวนพัสดุ    

        public int ParcelOfBranchId { get; set; } //รหัสพัสดุ
        public ParcelOfBranch ParcelOfBranchs { get; set; }

        public int OrderSlipId { get; set; } //รหัสใบรายการ
        public OrderSlip OrderSlips { get; set; } 
    }
}
