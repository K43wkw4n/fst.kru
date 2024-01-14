using api.Data;
using api.DTO.Account;
using api.Service.AccountS;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class AccountController : BaseController
    {
        private readonly Context _context;
        private readonly IAccountService _accountService;

        public AccountController(Context context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAllUser() => Ok(await _accountService.GetAllUserAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPrefixAndPosition() => Ok(await _accountService.GetPrefixAndPositionAsync());

        [HttpGet("[action]")]
        public async Task<ActionResult> GetUserById(int userId)
        {
            var result = await _accountService.GetUserByIdAsync(userId);
            if(result == null) return NotFound();
            return Ok(result);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult> GetCurrentUser()
        { 
            return Ok(await _accountService.GetCurrentUserAsync());
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Register([FromForm] RegisterDto request)
        {
            var result = await _accountService.RegisterAsync(request);
            if (result == null) return Ok(StatusCode(StatusCodes.Status200OK));
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Login(LoginDto request)
        {
            var result = await _accountService.LoginAsync(request);
            if (result == null) return Ok(NotFound());
            else if (result is int && (int)result == 0) return Ok(StatusCode(StatusCodes.Status400BadRequest)); 
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UpdatePersonnel([FromForm] PersonnelDto request)
        {
            var result = await _accountService.UpdatePersonnelAsync(request);

            return Ok(result == null ?
            StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetPersonnelById(int branchId)
            => Ok(await _accountService.GetPersonnelByIdAsync(branchId));
         
        [HttpPost("[action]")]
        public async Task<ActionResult> IsUsedUser(int userId)
        {
            var result = await _accountService.IsUsedUserAsync(userId);
            return Ok(result == null ?
                StatusCode(StatusCodes.Status200OK) :
                result is int i && i == 1 ? NotFound() :
                StatusCode(StatusCodes.Status400BadRequest));
        } 

        [HttpGet("[action]")]
        public ActionResult GetDecodeToken(string token)
        {
            var exp = _accountService.GetDecodeTokenAsync(token);
            if(exp == null) return Ok(StatusCode(StatusCodes.Status400BadRequest));
            return Ok(exp);
        }

    }
}
