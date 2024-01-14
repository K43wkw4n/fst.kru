using api.Data;
using api.DTO;
using api.DTO.fst;
using api.DTO.OrderSlipMapper;
using api.Models.Parcel;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims; 

namespace api.Service.OrderSlipS
{
    public class OrderSlipService : IOrderSlipService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrderSlipService(Context context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        private string GetUserId() => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;

        //------------------------------OrderSlip------------------------------// 
        public async Task<object> GetOrderSlipAsync()
        {
            var result = await _context.OrderSlips
                .Include(x => x.Personnels)
                    .ThenInclude(x=>x.Prefixes)
                .Include(x => x.Budgets)
                .Include(x => x.OrderSlipItems)
                    .ThenInclude(x => x.ParcelOfBranchs)
                    .ThenInclude(x => x.Parcels)
                .ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.OrderSlipImportantId,
                x.OrderSlipNumber,
                x.PetitionNumber,
                x.OrderSlipStatus,
                x.Year,
                x.StorageLocation,
                x.CreatedAt,
                Personnel = new
                {
                    x.Personnels.ID,
                    x.Personnels.FullName,
                    x.Personnels.Image, 
                    x.Personnels.GeneralPositionID,
                    x.Personnels.RoleID,
                    PrefixName = new { x.Personnels.Prefixes.PrefixName },
                },
                Budget = new
                {
                    x.Budgets.ID,
                    x.Budgets.BudgetName,
                },
                OrderSlipItem = x.OrderSlipItems.Select(x => new
                {
                    x.ID,
                    x.Quantity,
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

        public async Task<object> GetOrderSlipByBranchAsync(int branchId)
        {
            var result = await _context.OrderSlips
                .Include(x => x.Personnels)
                    .ThenInclude(x=>x.GeneralPositions)
                .Include(x => x.Personnels)
                    .ThenInclude(x => x.Prefixes)
                .Include(x => x.Budgets)
                .Include(x => x.OrderSlipItems)
                    .ThenInclude(x => x.ParcelOfBranchs)
                        .ThenInclude(x => x.Parcels)
                .Where(x => x.OrderSlipItems.Any(item => item.ParcelOfBranchs.BranchId == branchId))
                .ToListAsync();

            return result.Select(x => new
            {
                x.ID,
                x.OrderSlipImportantId,
                x.OrderSlipNumber,
                x.PetitionNumber,
                x.OrderSlipStatus,
                x.Year,
                x.StorageLocation,
                x.CreatedAt,
                Personnel = new
                {
                    x.Personnels.ID,
                    x.Personnels.FullName,
                    x.Personnels.Image, 
                    position = new
                    {
                        x.Personnels.GeneralPositions.ID,
                        x.Personnels.GeneralPositions.GeneralPositionName
                    },
                    x.Personnels.RoleID,
                    x.Personnels.Prefixes.PrefixName
                },
                Budget = new
                {
                    x.Budgets.ID,
                    x.Budgets.BudgetName,
                },
                OrderSlipItem = x.OrderSlipItems.Select(x => new
                {
                    x.ID,
                    x.Quantity,
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

        public async Task<object> GetItemByIdAsync(int OrderId)
        {
            var oslip = await _context.OrderSlips
                .Include(x => x.OrderSlipItems)
                    .ThenInclude(x => x.ParcelOfBranchs)
                        .ThenInclude(x => x.Parcels).FirstOrDefaultAsync(x => x.ID == OrderId);

            return oslip.OrderSlipItems.Select(x => new
            {
                x.ID,
                x.Quantity,
                Parcel = new
                {
                    x.ParcelOfBranchs.Parcels.ID,
                    x.ParcelOfBranchs.Parcels.ParcelName,
                    x.ParcelOfBranchs.Parcels.Classifier,
                    x.ParcelOfBranchs.Parcels.Price,
                    x.ParcelOfBranchs.Parcels.Year,
                }
            }).ToList();
        }

        public async Task<object> CreateOrderSlipAsync(OrderSlipRequest request)
        {
            var personnel = await _context.Personnels
                .Include(a => a.OrderSlips)
                .FirstOrDefaultAsync(x => x.ID.Equals(Convert.ToInt32(GetUserId())));

            var budget = await _context.Budgets.FirstOrDefaultAsync(x => x.ID == request.BudgetId);

            if (budget is null) return null!;

            var result = await _context.OrderSlips.FirstOrDefaultAsync(x => x.ID == request.ID);

            var newOrderSlip = _mapper.Map<OrderSlip>(request);

            if (result is null)
            {
                newOrderSlip.Budgets = budget;
                newOrderSlip.CreatedAt = DateTime.Now;
                personnel.OrderSlips.Add(newOrderSlip);
            }
            else
            {
                if (result.OrderSlipStatus == 0)
                {
                    result.Budgets = budget;
                    _mapper.Map(request, result);
                    _context.OrderSlips.Update(result);
                }
            }

            var isSuccess = await _context.SaveChangesAsync() > 0;

            if (isSuccess) return newOrderSlip.ID;

            return 0;
        }

        public async Task<object> CreateOrderSlipItemAsync(OrderSlipItemRequest request)
        {
            foreach (var item in request.OrderSlipItems)
            {
                var parcel = await _context.Parcels.FirstOrDefaultAsync(x => x.ID == item.ParcelId);
                var orderSlip = await _context.OrderSlips
                    .Include(x=>x.OrderSlipItems)
                        .ThenInclude(x=>x.ParcelOfBranchs).FirstOrDefaultAsync(x => x.ID == item.OrderSlipId);

                if(orderSlip.OrderSlipItems.Count() > 0)
                { 
                    foreach (var oDs in orderSlip.OrderSlipItems)
                    {
                        var Pob = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID == oDs.ParcelOfBranchId);
                        Pob.Year = orderSlip.Year;
                    }
                }
                  
                var parcelOBranch = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.BranchId == item.BranchId && x.ParcelId == item.ParcelId && x.Year == orderSlip.Year && x.Status == 0);

                var find = await _context.OrderSlipItems.FirstOrDefaultAsync(x => x.ParcelOfBranchs.ParcelId == parcel.ID && x.OrderSlips.ID == orderSlip.ID);
                
                if (parcelOBranch is null)
                {
                    var pOb = new ParcelOfBranch()
                    {
                        Year = orderSlip.Year,
                        Parcels = parcel,
                        BranchId = item.BranchId,
                        Quantity = item.Quantity,
                        Status = 0,
                    };

                    await _context.ParcelOfBranchs.AddAsync(pOb);

                    var newItem = new OrderSlipItem()
                    {
                        Quantity = item.Quantity,
                        OrderSlipId = item.OrderSlipId,
                        ParcelOfBranchs = pOb,
                    };

                    pOb.OrderSlipItems.Add(newItem);
                }
                else
                { 
                    parcelOBranch.Quantity = item.Quantity;
                   
                    if (find is null)
                    {
                        var pOb = new ParcelOfBranch()
                        {
                            Year = orderSlip.Year,
                            Parcels = parcel,
                            BranchId = item.BranchId,
                            //Quantity = item.Quantity,
                            Status = 0,
                        };

                        await _context.ParcelOfBranchs.AddAsync(pOb);

                        var newItem = new OrderSlipItem()
                        {
                            //Quantity = item.Quantity,
                            OrderSlipId = item.OrderSlipId,
                            ParcelOfBranchs = pOb,
                        };

                        pOb.OrderSlipItems.Add(newItem);
                    }
                    else
                    {
                        //find.Quantity = item.Quantity;
                    }

                }

            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }
        
        public async Task<object> ConfirmOrderSlipAsync(ConfirmOrderSlipDto request)
        {
            var result = await _context.OrderSlips.Include(x => x.OrderSlipItems).FirstOrDefaultAsync(x => x.ID == request.OrderSlipId);

            if (result is null) { return 1; }

            result.OrderSlipStatus = 1;

            foreach (var item in result.OrderSlipItems)
            {
                var pOb = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID.Equals(item.ParcelOfBranchId));

                var POB = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ParcelId == pOb.ParcelId && x.BranchId == request.BranchId && x.Year == result.Year && x.Status == 1);

                if (POB is null)
                {
                    pOb.Quantity = item.Quantity;
                    pOb.Status = 1;
                }
                else
                {
                    POB.Quantity += item.Quantity;
                    pOb.Status = 3;
                } 
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveOrderSlipAsync(int orderSlipId)
        {
            var orderSlip = await _context.OrderSlips
                .Include(x => x.OrderSlipItems).ThenInclude(x=>x.ParcelOfBranchs)
                .FirstOrDefaultAsync(x => x.ID.Equals(orderSlipId));

            foreach (var item in orderSlip.OrderSlipItems)
            {
                _context.OrderSlipItems.RemoveRange(item);

                var Pob = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID == item.ParcelOfBranchs.ID);
                _context.ParcelOfBranchs.Remove(Pob);
            }

            _context.OrderSlips.Remove(orderSlip);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveOrderSlipItemAsync(int OrderSlipItemId)
        {
            var result = await _context.OrderSlipItems.FirstOrDefaultAsync(x => x.ID == OrderSlipItemId);

            if (result is null) return 1;

            _context.OrderSlipItems.Remove(result);

            var pOb = await _context.ParcelOfBranchs.FirstOrDefaultAsync(x => x.ID == result.ParcelOfBranchId);

            if (result is null) return 1;

            _context.ParcelOfBranchs.Remove(pOb);

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> ChangeQuantityAsync(ChangeQuantityDto request) 
        { 
            var item = await _context.OrderSlipItems.FirstOrDefaultAsync(x => x.ID == request.ID);

            if (item is not null)
            {
                item.Quantity = request.Quantity;
            }
            
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        #region โค้ด OrderSlip เก่า 
        //public async Task<object> CreateUpdateOrderSlipAsync(OrderSlipDto request)
        //{ 
        //    var result = await _context.Personnels.FirstOrDefaultAsync(x => x.ID == request.PersonnelID);

        //    var orderSlip = _mapper.Map<OrderSlip>(request);

        //    if (result == null)
        //    {
        //        await _context.OrderSlips.AddAsync(orderSlip);
        //    }
        //    else
        //    {
        //        _context.Update(orderSlip);
        //    }

        //    var check = await _context.SaveChangesAsync() > 0;
        //    if (check) { return null!; }

        //    return 0;
        //} 
        #endregion

        //------------------------------Budget------------------------------//
        public async Task<List<Budget>> GetBudgetsAsync() => await _context.Budgets.ToListAsync();

        public async Task<object> CreateUpdateBudgetAsync(BudgetDto request)
        {
            var budget = await _context.Budgets.FirstOrDefaultAsync(x => x.ID == request.ID);

            if (budget == null)
            {
                await _context.Budgets.AddAsync(new Budget() { BudgetName = request.BudgetName });
            }
            else
            {
                budget.BudgetName = request.BudgetName;
            }

            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        public async Task<object> RemoveBudgetAsync(int budgetId)
        {
            var budget = await _context.Budgets.FirstOrDefaultAsync(x => x.ID == budgetId);

            if (budget == null) return 1;

            _context.Budgets.Remove(budget);
            return await _context.SaveChangesAsync() > 0 ? null! : 0;
        }

        //------------------------------StorageLocation------------------------------//
        //public async Task<List<StorageLocation>> GetStorLocationAsync() => await _context.StorageLocations.ToListAsync();

        //public async Task<object> CreateUpdateStorLocationAsync(StorageLocationDto request)
        //{ 
        //    var budget = await _context.StorageLocations.FirstOrDefaultAsync(x => x.ID == request.ID);

        //    if (budget == null) await _context.StorageLocations.AddAsync(new StorageLocation() { StorageLocationName = request.StorageLocationName });
        //    else budget.StorageLocationName = request.StorageLocationName;

        //    var check = await _context.SaveChangesAsync() > 0;
        //    if (check) { return null!; }

        //    return 0;
        //}

        //public async Task<object> RemoveStorLocationAsync(int StorLocationId)
        //{
        //    var result = await _context.StorageLocations.FirstOrDefaultAsync(x => x.ID == StorLocationId);

        //    if (result == null) { return 1; }

        //    _context.StorageLocations.Remove(result);
        //    var check = await _context.SaveChangesAsync() > 0;
        //    if (check) { return null!; }

        //    return 0;
        //}


    }
}
