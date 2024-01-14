namespace api.Models.NEWS
{
    public class NewsPhoto
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public int NewsId { get; set; }
        public News News { get; set; }
    }
}
