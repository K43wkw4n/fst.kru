namespace api.DTO
{
    public class ItemOfPaymentVoucherDto
    {
        public int Quantity { get; set; } //จำนวน
        public string Note { get; set; } //หมายเหตุ
        public int OrderSlipItemId { get; set; }
    }
}
