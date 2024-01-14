using api.Models.fst;

namespace api.Models.Parcel
{
    public class ParcelOfBranch
    {
        public int ID { get; set; } 
        public int ParcelId { get; set; } //รหัสพัสดุ
        public Parcel Parcels { get; set; }

        public int BranchId { get; set; } // รหัสหน่วยงาน
        public Branch Branchs { get; set; }

        public string Year { get; set; } //ปีงบประมาณ
        
        public int Quantity { get; set; } //จำนวนพัสดุ
        public int Status { get; set; } 

        public ICollection<OrderSlipItem> OrderSlipItems { get; set; } = new List<OrderSlipItem>();
        public ICollection<PaymentVoucherItem> PaymentVoucherItems { get; set; } = new List<PaymentVoucherItem>();
    }
}
