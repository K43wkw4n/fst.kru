using api.Models.Parcel;

namespace api.Models.Person
{
    public class Personnel
    { 
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string? Image { get; set; }
        public string Expert { get; set; } //ความชำนาน
        public string LvEdu { get; set; } //วุฒิการศึกษา

        public string Description { get; set; } //รายละเอียดเพิ่มเติม
        //public StatusPersonnel StatusPersonnel { get; set; } = StatusPersonnel.GeneralpPersonnel; //แยกบุคลากรกับอาจารย์
        
        public int GeneralPositionID { get; set; } //ตำแหน่งทั่วไป
        public GeneralPosition GeneralPositions { get; set; }

        public int RoleID { get; set; } //บทบาท
        public Role Roles { get; set; }

        public int PrefixID { get; set; } //คำนำหน้าชื่อ
        public Prefix Prefixes { get; set; }

        public ICollection<OrderSlip> OrderSlips { get; set; } = new List<OrderSlip>();
        public ICollection<PaymentVoucher> PaymentVouchers { get; set; } = new List<PaymentVoucher>();
    }
}
