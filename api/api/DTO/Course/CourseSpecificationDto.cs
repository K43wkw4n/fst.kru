namespace api.DTO.Course
{
    public class CourseSpecificationDto
    {
        public int ID { get; set; }
        public string Semester { get; set; }
        public string? PDF { get; set; }

        public string? SectionFile { get; set; }

        public DateTime YearEdu { get; set; } // ปีการศึกษา
        public int Credit { get; set; } // หน่วยกิต
        public string StudyGroup { get; set; } // หมู่เรียน
        public int StudentsAmount { get; set; } // จำนวนนักศึกษา

        public int PersonnelId { get; set; } 

        public int CategoryCourseSpecificationId { get; set; } 

        public int SubjectsId { get; set; } 
    }
}
