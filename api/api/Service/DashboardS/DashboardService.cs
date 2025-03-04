using api.Data;
using api.Models.Person;
using Microsoft.EntityFrameworkCore;

namespace api.Service.DashboardS
{
    public class DashboardService : IDashboardService
    {
        private readonly Context _context;

        public DashboardService(Context context)
        {
            _context = context;
        }
        
        public async Task<object> GetUserByIdAsync(int branchId)
        {
            var user = await _context.PersonnelinBranchs
                .Include(x => x.Position)
                .Include(x => x.Personnel)
                    .ThenInclude(x => x.GeneralPositions)
                .Where(x => x.BranchId == branchId).ToListAsync();

            var student = await _context.Students
                .Where(x=>x.BranchId == branchId).ToListAsync();
             
            return new { Users = user.GroupBy(x => x.Personnel.GeneralPositions).Select(group => new
                {
                    Position = group.Key,
                    Users = group.Count(),
                }).ToList(),
                Students = student.Count
            };
        }

        public async Task<object> GetUserByPositionByIdAsync(int branchId)
        {
            var user = await _context.PersonnelinBranchs
                .Include(x=>x.Position)
                .Where(x => x.BranchId == branchId).ToListAsync();

            return user.GroupBy(x=>x.Position).Select(group => new
            {
                Position = group.Key,
                Users = group.Count()
            }).ToList();
        }
          
        public async Task<object> GetUserByLvEduByIdAsync(int branchId)
        {
            var users = await _context.PersonnelinBranchs
                .Include(x => x.Position)
                .Include(x=>x.Personnel)
                    .ThenInclude(x=> x.GeneralPositions)
                .Where(x => x.BranchId == branchId).ToListAsync();

            var filteredUsers = users.Where(x => x.Personnel.LvEdu != null);

            return filteredUsers.GroupBy(x => x.Personnel.LvEdu).Select(group => new
            {
                LvEdu = group.Key,
                Users = group.Count()
            }).ToList();
        }

    }
}
