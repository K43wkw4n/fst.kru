using api.DTO;
using api.DTO.fst;
using api.DTO.PaymentVoucherMapper;
using api.Service.PaymentVoucherS; 
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class PaymentVoucherController : BaseController
    {
        private readonly IPaymentVoucherService _paymentVoucher;

        public PaymentVoucherController(IPaymentVoucherService paymentVoucher)
        {
            _paymentVoucher = paymentVoucher;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPaymentVoucher()
        {
            return Ok(await _paymentVoucher.GetPaymentVoucherAsync());
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPaymentVoucherByBranch(int branchId)
        {
            return Ok(await _paymentVoucher.GetPaymentVoucherByBranchAsync(branchId));
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreatePaymentVoucher(PaymentVoucherRequest request)
        {
            var result = await _paymentVoucher.CreatePaymentVoucherAsync(request);
            if (result is null) return Ok(NotFound());
            else if (result is int j && j == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            else return Ok(new { paymentVId = result });
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreatePaymentVoucherItem(PaymentVoucherItemRequest request)
        {
            var result = await _paymentVoucher.CreatePaymentVoucherItemAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> ConfirmPaymentVoucher(int paymentVoucherId)
        {
            var result = await _paymentVoucher.ConfirmPaymentVoucherAsync(paymentVoucherId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> NoteInPaymentVoucherItem(NoteDto request) 
        {
            var result = await _paymentVoucher.NoteInPaymentVoucherItemAsync(request);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemovePayment(int paymentVId)
        {
            var result = await _paymentVoucher.RemovePaymentAsync(paymentVId);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemovePaymentItem(int paymentVItemId)
        {
            var result = await _paymentVoucher.RemovePaymentItemAsync(paymentVItemId);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> ChangeQuantity(ChangeQuantityDto request)
        {
            var result = await _paymentVoucher.ChangeQuantityAsync(request);
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetItemById(int paymentId)
        {
            return Ok(await _paymentVoucher.GetItemByIdAsync(paymentId));
        }
    }
}
