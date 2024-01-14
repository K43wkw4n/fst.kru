using api.DTO;
using api.DTO.fst;
using api.DTO.OrderSlipMapper;
using api.Models.Parcel;
using api.Service.OrderSlipS;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class OrderSlipController : BaseController
    {
        private readonly IOrderSlipService _orderSlipService;

        public OrderSlipController(IOrderSlipService orderSlipService)
        {
            _orderSlipService = orderSlipService;
        }
          
        //------------------------------OrderSlip------------------------------//
        [HttpGet("[action]")]
        public async Task<ActionResult> GetOrderSlips() => Ok(await _orderSlipService.GetOrderSlipAsync());

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetOrderSlipByBranch(int branchId)
        {
            return Ok(await _orderSlipService.GetOrderSlipByBranchAsync(branchId));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetItemById(int OrderId)
        {
            return Ok(await _orderSlipService.GetItemByIdAsync(OrderId));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateOrderSlipItem(OrderSlipItemRequest request)
        {
            var result = await _orderSlipService.CreateOrderSlipItemAsync(request);
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveOrderSlipItem(int OrderSlipItemId)
        {
            var result = await _orderSlipService.RemoveOrderSlipItemAsync(OrderSlipItemId);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateOrderSlip(OrderSlipRequest request) 
        { 
            var result = await _orderSlipService.CreateOrderSlipAsync(request);
            if(result is null) return Ok(NotFound());
            else if (result is int j && j == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest) );
            else return Ok(new { orderSlipId = result });
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> ConfirmOrderSlip(ConfirmOrderSlipDto request)
        {
            var result = await _orderSlipService.ConfirmOrderSlipAsync(request);
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveOrderSlip(int orderSlipId)
        {
            var result = await _orderSlipService.RemoveOrderSlipAsync(orderSlipId);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> ChangeQuantity(ChangeQuantityDto request)
        {
            var result = await _orderSlipService.ChangeQuantityAsync(request);
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }
        

        //------------------------------Budget------------------------------//
        [HttpGet("[action]")]
        public async Task<ActionResult> GetBudgets() => Ok(await _orderSlipService.GetBudgetsAsync());

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateBudget(BudgetDto request)
        {
            var result = await _orderSlipService.CreateUpdateBudgetAsync(request);
            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveBudget(int budgetId)
        {
            var result = await _orderSlipService.RemoveBudgetAsync(budgetId);

            if (result is null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if(result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        ////------------------------------StorageLocation------------------------------//
        //[HttpGet("[action]")]
        //public async Task<ActionResult> GetStorageLocations() => Ok(await _orderSlipService.GetStorLocationAsync());

        //[HttpPost("[action]")]
        //public async Task<ActionResult> CreateUpdateStorageLocation(StorageLocationDto dto)
        //{
        //    var result = await _orderSlipService.CreateUpdateStorLocationAsync(dto);
        //    if (result == null) return Ok(StatusCode(StatusCodes.Status201Created));
        //    return Ok(StatusCode(StatusCodes.Status400BadRequest));
        //}
         
        //[HttpDelete("[action]")]
        //public async Task<ActionResult> RemoveStorLocationAsync(int StorLocationId)
        //{
        //    var result = await _orderSlipService.RemoveStorLocationAsync(StorLocationId);

        //    if (result == null) return Ok(StatusCode(StatusCodes.Status201Created));
        //    else if (result is int i && i == 1) return Ok(NotFound());
        //    return Ok(StatusCode(StatusCodes.Status400BadRequest));
        //}

    }
}
