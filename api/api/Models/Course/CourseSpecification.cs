using api.Models.Person;

namespace api.Models.Course
{
    public class CourseSpecification
    {
        public int ID { get; set; }
        public string Semester { get; set; }
        public string? PDF { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? SectionFile { get; set; }  // ผลการประเมินของนักศึกษา

        public DateTime YearEdu { get; set; } // ปีการศึกษา
        public int Credit { get; set; } // หน่วยกิต
        public string StudyGroup { get; set; } // หมู่เรียน
        public int StudentsAmount { get; set; } // จำนวนนักศึกษา

        public bool Hidden { get; set; }

        public int PersonnelId { get; set; }
        public Personnel Personnel { get; set; }
         
        public int CategoryCourseSpecificationId { get; set; }
        public CategoryCourseSpecification CategoryCourseSpecification { get; set; }

        public int SubjectsId { get; set; }
        public Subjects Subjects { get; set; }
    }
}
