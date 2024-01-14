using api.Data;
using api.DTO;
using api.DTO.fst;
using api.DTO.PaymentVoucherMapper;
using api.Models.Parcel;
using AutoMapper; 
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Service.PaymentVoucherS
{
    public class PaymentVoucherService : IPaymentVoucherService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PaymentVoucherService(Context context, IMapper mapper,IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;

        public async Task<object> GetPaymentVoucherAsync()
        {
            var result = await _context.PaymentVouchers
                .Include(x => x.Personnels)
                .Include(x => x.PaymentVoucherItems)
                    .ThenInclude(x=>x.ParcelOfBranchs)
                        .ThenInclude(x => x.Parcels)
                .ToListAsync();

            return result.Select(x=> new
            {
                x.ID,
                x.PaymentVoucherImportantId,
                x.Description,
                x.PaymentVoucherStatus,
                x.CreatedAt,
                x.PersonApproving,
                Personnel = new
                {
                    x.Personnels.ID,
                    x.Personnels.FullName,
                    x.Personnels.Image, 
                    x.Personnels.GeneralPositionID,
                    x.Personnels.RoleID,
                    x.Personnels.PrefixID,
                },
                PaymentVoucherItem = x.PaymentVoucherItems.Select(x=> new
                {
                    x.ID,
                    x.Quantity,
                    x.Note,
                    Parcel = new
                    {
                        x.ParcelOfBranchs.Parcels.ID,
                        x.ParcelOfBranchs.Parcels.ParcelName,
                        x.ParcelOfBranchs.Parcels.Classifier,
                        x.ParcelOfBranchs.Parcels.Price,
                        x.ParcelOfBranchs.Parcels.Year,
                    }
                }).ToList(),
            }).ToList();
        }

        public async Task<object> GetPaymentVoucherByBranchAsync(int branchId)
        {
            var result = await _context.PaymentVouchers
                .Include(x => x.Personnels)
                    .ThenInclude(x=>x.GeneralPositions)
                .Include(x => x.Personnels)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.PaymentVoucherItems)
                    .ThenInclude(x => x.ParcelOfBranchs)
                        .ThenInclude(x => x.Parcels)
                .Where(x => x.PaymentVoucherItems.Any(item => item.ParcelOfBranchs.BranchId == branchId))
                .ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.PaymentVoucherImportantId,
                x.Description,
                x.PaymentVoucherStatus,
                x.CreatedAt,
                x.PersonApproving,
                Personnel = new
                { 
                    x.Personnels.ID,
                    x.Personnels.FullName,
                    x.Personnels.Image, 
                    x.Personnels.GeneralPositionID,
                    x.Personnels.RoleID,
                    x.Personnels.PrefixID,
                    x.Personnels.GeneralPositions.GeneralPositionName,
                    x.Personnels.Prefixes.PrefixName
                },
                PaymentVoucherItem = x.PaymentVoucherItems.Select(x=> new
                {
                    x.ID,
                    x.Quantity,
                    x.Note,
                    ParcelOfBranchId = x.ParcelOfBranchs.ID,
                    TotalQuantity = x.ParcelOfBranchs.Quantity,
                    Parcel = new
                    {
                        x.ParcelOfBranchs.Parcels.ID,
                        x.ParcelOfBranchs.Parcels.ParcelName,
                        x.ParcelOfBranchs.Parcels.Classifier,
                        x.ParcelOfBranchs.Parcels.Price,
                        x.ParcelOfBranchs.Parcels.Year.Year,
                    }
                }).ToList(),
            }).ToList();
        }

        public async Task<object> GetItemByIdAsync(int paymentId)
        {
            var payment = await _context.PaymentVouchers
                .Include(x => x.PaymentVoucherItems)
                    .ThenInclude(x => x.ParcelOfBranchs)
                        .ThenInclude(x => x.Parcels).FirstOrDefaultAsync(x=>x.ID == paymentId);

            return payment.PaymentVoucherItems.Select(x => new
            {
                x.ID,
                x.Quantity,
                x.Note,
                ParcelOfBranchId = x.ParcelOfBranchs.ID,
                TotalQuantity = x.ParcelOfBranchs.Quantity,
                Parcel = new
                {
                    x.ParcelOfBranchs.Parcels.ID,
                    x.ParcelOfBranchs.Parcels.ParcelName,
                    x.ParcelOfBranchs.Parcels.Classifier,
                    x.ParcelOfBranchs.Parcels.Price,
                    x.ParcelOfBranchs.Parcels.Year.Year,
                }
            }).ToList();
        }
         
        public async Task<object> CreatePaymentVoucherAsync(PaymentVoucherRequest request)
        {
            var personnel = await _context.Personnels
                .Include(a => a.PaymentVouchers)
                .FirstOrDefaultAsync(x => x.ID.Equals(Convert.ToInt32(GetUserId())));

            var result = await _context.PaymentVouchers.FirstOrDefaultAsync(x => x.ID == request.ID);

            var newpaymentVoucher = _mapper.Map<PaymentVoucher>(request);

            if(result is null)
            {
                newpaymentVoucher.CreatedAt = DateTime.Now;
                newpaymentVoucher.PersonApproving = "";
                personnel.PaymentVouchers.Add(newpaymentVoucher);
            }else
            {
                _mapper.Map(request, result);
                _context.PaymentVouchers.Update(result);
            }
            
            return await _context.SaveChangesAsync() > 0 ? newpaymentVoucher.ID : 0;
        }

        public async Task<object> CreatePaymentVoucherItemAsync(PaymentVoucherItemRequest request)
        {
            foreach (var item in request.PaymentVoucherItems)
            {
                var pOb = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID == item.ParcelOfBranchId);

                var payment = await _context.PaymentVouchers.FirstOrDefaultAsync(x=>x.ID == item.PaymentVoucherId);

                var paymentItem = await _context.PaymentVoucherItems.Include(x=>x.ParcelOfBranchs)
                    .Include(x=>x.PaymentVouchers)
                    .FirstOrDefaultAsync(x => x.ParcelOfBranchId == pOb.ID && x.PaymentVoucherId == payment.ID);

                if (pOb is null || payment is null) return 1;

                if(paymentItem is null)
                {
                    var newItem = new PaymentVoucherItem()
                    {
                        Quantity = item.Quantity,
                        ParcelOfBranchs = pOb,
                        Note = item.Note,
                    };

                    payment.PaymentVoucherItems.Add(newItem);
                    pOb.PaymentVoucherItems.Add(newItem);
                }
                else
                {
                    //paymentItem.Quantity = item.Quantity;
                }
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0; 
        }

        public async Task<object> ConfirmPaymentVoucherAsync(int paymentVoucherId)
        {
            var personnel = await _context.Personnels
                .Include(a => a.OrderSlips)
                .Include(x=>x.Prefixes)
                .FirstOrDefaultAsync(x => x.ID == Convert.ToInt32(GetUserId()));
            var result = await _context.PaymentVouchers.Include(x => x.PaymentVoucherItems).FirstOrDefaultAsync(x => x.ID == paymentVoucherId);

            if (result is null) { return 1; }

            result.PaymentVoucherStatus = 1;
            result.PersonApproving = personnel.Prefixes.PrefixName + personnel.FullName;

            foreach (var item in result.PaymentVoucherItems)
            {
                var pOb = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID == item.ParcelOfBranchId);
                pOb.Quantity -= item.Quantity;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;

        }
 
        public async Task<object> NoteInPaymentVoucherItemAsync(NoteDto request) 
        {
            var item = await _context.PaymentVoucherItems.FirstOrDefaultAsync(x => x.ID == request.ID);

            if(item is null) { return 1; }

            item.Note = request.Note;

            return await _context.SaveChangesAsync() > 0 ? null! : 0; 
        }
         
        public async Task<object> RemovePaymentAsync(int paymentVId)
        {
            var paymentV = await _context.PaymentVouchers.Include(x=>x.PaymentVoucherItems).FirstOrDefaultAsync(x=>x.ID.Equals(paymentVId));

            if (paymentV is null) return 1;

            foreach (var item in paymentV.PaymentVoucherItems)
            {
                _context.PaymentVoucherItems.RemoveRange(item);
            }

            _context.PaymentVouchers.Remove(paymentV);

            return await _context.SaveChangesAsync() > 0 ? null! : 0; 
        }

        public async Task<object> RemovePaymentItemAsync(int paymentVItemId)
        {
            var result = await _context.PaymentVoucherItems.FirstOrDefaultAsync(x=>x.ID == paymentVItemId);

            if (result is null) return 1;

            _context.PaymentVoucherItems.Remove(result);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> ChangeQuantityAsync(ChangeQuantityDto request)
        {
            var paymentV = await _context.PaymentVoucherItems.FirstOrDefaultAsync(x=>x.ID == request.ID);

            if (paymentV is not null)
            {
                paymentV.Quantity = request.Quantity;
            } 

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
    }
}
