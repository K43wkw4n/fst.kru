namespace api.DTO.researchAndProject
{
    public class ResearchAndProjectDto
    {
        public int? ID { get; set; }
        public string Name { get; set; } //ชื่อโครงการ //
        public string? Description { get; set; } //(คำอธิบาย เพิ่มเติม หรือ พื้นที่บริการ) //
        public string? Image { get; set; } //
        public string? PDF { get; set; } //
        public DateTime Year { get; set; } // ปีของงานวิจัย //
        public double BudgetAmount { get; set; } //
        public string Expertise { get; set; } // ความเชี่ยวชาญ //
        public string Participant { get; set; }

        public int PersonnelId { get; set; } 

        public int BudgetId { get; set; } //

        public int CategoryId { get; set; } //
    }
}
