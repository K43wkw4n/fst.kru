using api.DTO;
using api.DTO.fst;
using api.DTO.PaymentVoucherMapper;
using api.Models.Parcel;

namespace api.Service.PaymentVoucherS
{
    public interface IPaymentVoucherService
    {
        Task<Object> GetPaymentVoucherAsync();
        Task<Object> GetPaymentVoucherByBranchAsync(int branchId);
        Task<Object> CreatePaymentVoucherAsync(PaymentVoucherRequest request);
        Task<Object> CreatePaymentVoucherItemAsync(PaymentVoucherItemRequest request);
        Task<Object> ConfirmPaymentVoucherAsync(int paymentVoucherId);
        Task<Object> NoteInPaymentVoucherItemAsync(NoteDto request);
        Task<Object> ChangeQuantityAsync(ChangeQuantityDto request);
        Task<Object> GetItemByIdAsync(int paymentId);

        Task<Object> RemovePaymentAsync(int paymentVId);
        Task<Object> RemovePaymentItemAsync(int paymentVItemId);
    }
}
