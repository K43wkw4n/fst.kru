namespace api.DTO.Account
{
    public class CreateStudentDto
    { 
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string? Password { get; set; }
        public IFormFile? Image { get; set; } 
        public DateTime? YearEdu { get; set; }
        public string? Address { get; set; } 
        public int BranchId { get; set; }
    }

    public class EditStudentDto : CreateStudentDto
    {
        public int ID { get; set; } 
    }
}
