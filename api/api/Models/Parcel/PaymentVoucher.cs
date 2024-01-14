using api.Models.Person;

namespace api.Models.Parcel
{
    public class PaymentVoucher
    { 
        public int ID { get; set; } 
        public string PaymentVoucherImportantId { get; set; } //ใบสำคัญเลขที่ (จ.001) 
        public string Description { get; set; } //เพื่อใช้สำหรับ (หรือคำอธิบาย)
        public int PaymentVoucherStatus { get; set; } //สถานะ (ได้รับการยืนยันการเบิกหรือไม่)
        public DateTime CreatedAt { get; set; }
        public string PersonApproving { get; set; } //ชื่อคนอนุมัติ

        //public int PersonnelId { get; set; }
        public Personnel Personnels { get; set; }

        public ICollection<PaymentVoucherItem> PaymentVoucherItems { get; set; } = new List<PaymentVoucherItem>();

    }
}
