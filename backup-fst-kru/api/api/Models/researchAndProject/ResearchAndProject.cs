using api.Models.Parcel;
using api.Models.Person;

namespace api.Models.researchAndProject
{
    public class ResearchAndProject
    {
        public int ID { get; set; }
        public string Name { get; set; } //ชื่อโครงการ //\
        public string? Description { get; set; } //(คำอธิบาย เพิ่มเติม หรือ พื้นที่บริการ)
        public string? Image { get; set; } //\
        public string? PDF { get; set; } //\
        public bool IsUsed { get; set; } // สถานะการใช้งาน
        public DateTime CreatedAt { get; set; } //\
        public DateTime Year { get; set; } // ปีของงานวิจัย //\  
        public double BudgetAmount { get; set; } //\
        public string Expertise { get; set; } // ความเชี่ยวชาญ //\

        public string Participant { get; set; }  // ผู้มีส่วนร่วม ***อาจารย์ท่านอื่น ๆ
        public bool Hidden { get; set; }

        public int PersonnelId { get; set; }
        public Personnel Personnel { get; set; } //

        public int BudgetId { get; set; }
        public Budget Budget { get; set; } //\

        public int CategoryId { get; set; }
        public Category Category { get; set; } //\
    }
}
