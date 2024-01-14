namespace api.Models.Parcel
{
    public class Parcel
    { 
        public int ID { get; set; } 
        public string ParcelName { get; set; } //ชื่อพัสดุ
        public string Classifier { get; set; } //ชื่อหน่อยของพัสดุ
        public double Price { get; set; } //ราคา
        public DateTime Year { get; set; } //ปี 

        public ICollection<ParcelOfBranch> ParcelOfBranchs { get; set; } = new List<ParcelOfBranch>();

    }
}
