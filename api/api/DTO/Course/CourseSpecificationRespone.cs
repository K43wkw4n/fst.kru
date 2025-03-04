using api.Models.Course;
using api.Models.fst;
using api.Models.Parcel;
using api.Models.Person;
using api.Models.project;
using System.Text.Json.Serialization;

namespace api.DTO.Course
{
    public class CourseSpecificationRespone
    {
        public int ID { get; set; }
        public string Semester { get; set; }
        public string? PDF { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Hidden { get; set; }

        public int PersonnelId { get; set; }
        public Personnel Personnel { get; set; }

        public int CategoryCourseSpecificationId { get; set; }
        public CategoryCourseSpecification CategoryCourseSpecification { get; set; }

        public int SubjectsId { get; set; }
        public Subjects Subjects { get; set; }
    }

    public class PersonnelRespone
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string? Image { get; set; }
        public string? Expert { get; set; } //ความชำนาน
        public string? LvEdu { get; set; } //วุฒิการศึกษา 
        public string? Description { get; set; } //รายละเอียดเพิ่มเติม
        //public StatusPersonnel StatusPersonnel { get; set; } = StatusPersonnel.GeneralpPersonnel; //แยกบุคลากรกับอาจารย์

        public int GeneralPositionID { get; set; } //ตำแหน่งทั่วไป
        public GeneralPosition GeneralPositions { get; set; }

        public int RoleID { get; set; } //บทบาท
        [JsonIgnore]
        public Role Roles { get; set; }

        public int PrefixID { get; set; } //คำนำหน้าชื่อ
        public Prefix Prefixes { get; set; }

        public bool Hidden { get; set; }

        public ICollection<OrderSlip> OrderSlips { get; set; } = new List<OrderSlip>();
        public ICollection<PaymentVoucher> PaymentVouchers { get; set; } = new List<PaymentVoucher>();

        public ICollection<PersonnelinBranchRespone> PersonnelinBranchs { get; set; } = new List<PersonnelinBranchRespone>();
    }

    public class PersonnelinBranchRespone
    {
        public int ID { get; set; }
        public int PersonnelId { get; set; } 

        public int BranchId { get; set; }
        public Branch Branch { get; set; }

        public int? PositionId { get; set; }
        public Position Position { get; set; }

        public int IsUsed { get; set; }

        public bool Hidden { get; set; }
    }
}
