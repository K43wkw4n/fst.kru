using api.Data;
using api.DTO.ParcelMapper;
using api.Models.Parcel;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Service.ParcelS
{
    public class ParcelService : IParcelService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public ParcelService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Parcel>> GetParcelAsync()
        {
            return await _context.Parcels.ToListAsync();
        }

        public async Task<object> GetParcelOfBranch(int branchId)
        {
            var result = await _context.ParcelOfBranchs.Include(x=>x.Parcels).Where(x => x.BranchId == branchId && x.Status == 1).ToListAsync();

            if (result is null) return 1;

            return result.Select(x=> new
            {
                x.Parcels.ID,
                x.Parcels.ParcelName,
                x.Parcels.Classifier,
                x.Parcels.Price, 
                x.Year,
                x.Quantity,
                ParcelOfBranchId = x.ID,
            }).ToList();
        }

        //public async Task<object> GetSuppliesInStockAsync()
        //{
        //    var result = await _context.OrderSlipItems
        //        .Where(x => x.OrderSlips.OrderSlipStatus == 1)
        //        .Include(x => x.Supplies).ToListAsync();

        //    var groupedResult = result
        //        .GroupBy(x => x.Supplies.ID)
        //        .Select(g => new
        //        {
        //            SuppliesId = g.Key,
        //            TotalQuantity = g.Sum(x => x.Quantity),
        //            //Status = g.Any(x => x.Quantity - x.QuantityAlreadyWithdrawn == 0) ? 1 : 0,
        //        });

        //    var list = groupedResult.Select(item => new
        //    {
        //        Supplies = result.First(x => x.Supplies.ID == item.SuppliesId).Supplies,
        //        TotalQuantity = item.TotalQuantity,
        //        orderSlipId = result.FirstOrDefault(x=>x.SuppliesId == result.First(x => x.Supplies.ID == item.SuppliesId).ID).ID,
        //    }).ToList();

        //    return list;
        //}

        public async Task<object> CreateUpdateParcelAsync(ParcelRequest request)
        {
            var result = await _context.Parcels.FirstOrDefaultAsync(x => x.ID == request.ID);

            var Parcel = _mapper.Map<Parcel>(request);
            
            if (result == null)
            { 
                await _context.Parcels.AddAsync(Parcel);
            }
            else
            {
                _mapper.Map(request, result);
                _context.Parcels.Update(result);
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveParcelAsync(int SuppliesId)
        {
            var result = await _context.Parcels.FirstOrDefaultAsync(x => x.ID == SuppliesId);

            if (result == null) { return 1; }

            _context.Parcels.Remove(result);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }


    }
}
