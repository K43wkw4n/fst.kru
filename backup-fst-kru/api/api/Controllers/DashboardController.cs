using api.Service.DashboardS;
using Autofac.Core;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class DashboardController : BaseController
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }
         
        [HttpGet("[action]")] 
        public async Task<IActionResult> GetUserById(int branchId)
            => Ok(await _service.GetUserByIdAsync(branchId));
        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserByPositionById(int branchId)
            => Ok(await _service.GetUserByPositionByIdAsync(branchId));

        [HttpGet("[action]")]  
        public async Task<IActionResult> GetUserByLvEduById(int branchId)
            => Ok(await _service.GetUserByLvEduByIdAsync(branchId));
    }
}
