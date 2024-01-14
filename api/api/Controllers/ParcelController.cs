using api.Data;
using api.DTO.ParcelMapper; 
using api.Service.ParcelS; 
using Microsoft.AspNetCore.Mvc; 

namespace api.Controllers
{ 
    public class ParcelController : BaseController
    {
        private readonly Context _context;
        private readonly IParcelService _parcelService;

        public ParcelController(Context context, IParcelService parcelService)
        {
            _context = context;
            _parcelService = parcelService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetParcel() => Ok(await _parcelService.GetParcelAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetParcelOfBranch(int branchId)
        {
            var result = await _parcelService.GetParcelOfBranch(branchId);
            if (result is int i && i == 1) return Ok(NotFound());
            else if (result is int j && j == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            else return Ok(result);
        }
         
        //[HttpGet("[action]")]
        //public async Task<ActionResult> GetSuppliesInStock() => Ok(await _parcelService.GetSuppliesInStockAsync());
         
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateUpdateParcel(ParcelRequest request)
        {
            var result = await _parcelService.CreateUpdateParcelAsync(request); 
            if(result == null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound());
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveParcel(int id)
        {
            var result = await _parcelService.RemoveParcelAsync(id);

            if (result == null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int i && i == 1) return Ok(NotFound()); 
            return Ok(StatusCode(StatusCodes.Status400BadRequest));
        }

    }
}
