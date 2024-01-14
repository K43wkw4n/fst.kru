namespace api.DTO.ParcelMapper
{
    public class ParcelRequest
    {
        public int ID { get; set; } 
        public string ParcelName { get; set; } //ชื่อพัสดุ
        public string Classifier { get; set; } //ชื่อหน่อยของพัสดุ
        public double Price { get; set; } //ราคา
        public DateTime Year { get; set; } //ปี
        public int Quantity { get; set; } = 0; //จำนวนพัสดุ  
    }
}
