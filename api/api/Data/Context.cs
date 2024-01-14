using api.Models.fst;
using api.Models.NEWS;
using api.Models.Parcel;
using api.Models.Person;
using api.Models.system;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace api.Data
{
    public class Context : DbContext
    {
        private readonly IConfiguration _config;

        public Context(IConfiguration config)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnect"));
        }

        public DbSet<Personnel> Personnels { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Prefix> Prefixes { get; set; }
        public DbSet<GeneralPosition> GeneralPositions { get; set; }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<OrderSlip> OrderSlips { get; set; }
        public DbSet<OrderSlipItem> OrderSlipItems { get; set; }
        public DbSet<PaymentVoucher> PaymentVouchers { get; set; }
        public DbSet<PaymentVoucherItem> PaymentVoucherItems { get; set; }
        //public DbSet<StorageLocation> StorageLocations { get; set; }
        public DbSet<Parcel> Parcels { get; set; }
        public DbSet<ParcelOfBranch> ParcelOfBranchs { get; set; }
        public DbSet<Branch> Branchs { get; set; }
        public DbSet<SystemSetting> SystemSettings { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsPhoto> NewsPhotos { get; set; }
        public DbSet<SlideShow> SlideShows { get; set; }
        public DbSet<WeLearn> WeLearns { get; set; }

        public DbSet<Curriculum> Curriculums { get; set; }
        public DbSet<GeneralTopic> GeneralTopics { get; set; }
        public DbSet<SubGeneralTopic> SubGeneralTopics { get; set; }

        public DbSet<SubjectGroup> SubjectGroups { get; set; }
        public DbSet<SubSubjectGroup> SubSubjectGroups { get; set; }

        public DbSet<PersonnelinBranch> PersonnelinBranchs { get; set; }
        public DbSet<Position> Positions { get; set; }
         
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>()
                .HasData(new Role { ID = 1, RoleName = "Admin" },
                         new Role { ID = 2, RoleName = "Lecturer" },
                         new Role { ID = 3, RoleName = "User" });

            builder.Entity<Budget>()
                .HasData(new Budget
                {
                    ID = 1,
                    BudgetName = "งปม."
                },
                new Budget
                {
                    ID = 2,
                    BudgetName = "บกศ."
                });

            builder.Entity<Parcel>()
                .HasData(new Parcel
                {
                    ID = 1,
                    ParcelName = "หมึกพิมพ์ Laser jet HP 85A",
                    Classifier = "กล่อง",
                    Price = 2990,
                    Year = DateTime.Now,
                }, new Parcel
                {
                    ID = 2,
                    ParcelName = "ปากกาเจลสีน้ำเงิน",
                    Classifier = "ด้าม",
                    Price = 25,
                    Year = DateTime.Now,
                });

            builder.Entity<Branch>()
                .HasData(new Branch
                {
                    ID = 1,
                    BranchName = "คณะวิทยาศาสตร์และเทคโนโลยี",
                    PageFacebook = "https://www.facebook.com/FST.KRU",
                    Text = "",
                }, new Branch
                {
                    ID = 2,
                    BranchName = "วิทยาการคอมพิวเตอร์",
                    PageFacebook = "https://www.facebook.com/kru.cs",
                    CategoryBranch = "วทบ.",
                    CategoryMajor = "คอมพิวเตอร์",
                    Text = "",
                });

            builder.Entity<Prefix>()
                .HasData(new Prefix
                {
                    ID = 1,
                    PrefixName = "นาย",
                },
                new Prefix
                {
                    ID = 2,
                    PrefixName = "นาง",
                },
                new Prefix
                {
                    ID = 3,
                    PrefixName = "นางนางสาว",
                },
                new Prefix
                {
                    ID = 4,
                    PrefixName = "ผศ.",
                },
                new Prefix
                {
                    ID = 5,
                    PrefixName = "รศ.",
                });

            builder.Entity<GeneralPosition>()
                .HasData(new GeneralPosition
                {
                    ID = 1,
                    GeneralPositionName = "บริหารงานทั่วไป",
                },
                new GeneralPosition
                {
                    ID = 2,
                    GeneralPositionName = "อาจารย์",
                });

            builder.Entity<Personnel>()
               .HasData(new Personnel
               {
                   ID = 1,
                   FullName = "Hikigaya Hachiman",
                   UserName = "Hachi",
                   PasswordHash = BCrypt.Net.BCrypt.HashPassword("Nn123@"),
                   Image = null,
                   Expert = "Software Development",
                   LvEdu = "ป.ตรี",
                   Description = "จบมาจาก...",
                   GeneralPositionID = 1,
                   RoleID = 1,
                   PrefixID = 1,
               });

            //builder.Entity<Personnel>(x =>
            //{
            //    x.HasOne(x => x.GeneralPositions).WithOne().HasForeignKey<GeneralPosition>(a => a.ID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.Roles).WithOne().HasForeignKey<Role>(a => a.ID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.Prefixes).WithOne().HasForeignKey<Prefix>(a => a.ID).OnDelete(DeleteBehavior.Cascade);
            //});

            //builder.Entity<Personnel>().HasOne(x => x.GeneralPositions).WithMany(x => x.Personnels).OnDelete(DeleteBehavior.Cascade);
            //builder.Entity<Personnel>().HasOne(x => x.Roles).WithMany(x => x.Personnels).OnDelete(DeleteBehavior.Cascade);
            //builder.Entity<Personnel>().HasOne(x => x.Prefixes).WithMany(x => x.Personnels).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Personnel>().HasMany(x => x.OrderSlips).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Personnel>().HasMany(x => x.PaymentVouchers).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);

            builder.Entity<OrderSlip>().HasOne(x => x.Budgets).WithMany(x => x.OrderSlips).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<OrderSlipItem>().HasOne(x => x.OrderSlips).WithMany(x => x.OrderSlipItems).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<PaymentVoucherItem>().HasOne(x => x.PaymentVouchers).WithMany(x => x.PaymentVoucherItems).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Parcel>().HasMany(x => x.ParcelOfBranchs).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Branch>().HasMany(x => x.ParcelOfBranchs).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ParcelOfBranch>().HasMany(x => x.OrderSlipItems).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ParcelOfBranch>().HasMany(x => x.PaymentVoucherItems).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Branch>().HasMany(x => x.Curriculums).GetInfrastructure()!.OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<PaymentVoucher>().HasOne(x => x.Personnels).WithMany(x => x.PaymentVouchers).OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<OrderSlip>(x =>
            //{
            //    x.HasOne(x => x.Personnels).WithOne().HasForeignKey<Personnel>(x => x.PersonnelID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.Budgets).WithOne().HasForeignKey<Budget>(x => x.BudgetID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.StorageLocations).WithOne().HasForeignKey<StorageLocation>(x => x.StorageLocationID).OnDelete(DeleteBehavior.Cascade);
            //});

            //builder.Entity<OrderSlipItem>(x =>
            //{
            //    x.HasOne(x => x.Supplies).WithOne().HasForeignKey<Supplies>(x => x.SuppliesID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.OrderSlips).WithOne().HasForeignKey<OrderSlip>(x => x.OrderSlipID).OnDelete(DeleteBehavior.Cascade);
            //});

            //builder.Entity<PaymentVoucher>(x => x.HasOne(x => x.Personnels).WithOne().HasForeignKey<Personnel>(x => x.PersonnelID).OnDelete(DeleteBehavior.Cascade));

            //builder.Entity<PaymentVoucherItem>(x =>
            //{
            //    x.HasOne(x => x.OrderSlipItems).WithOne().HasForeignKey<OrderSlipItem>(x => x.OrderSlipItemID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.PaymentVouchers).WithOne().HasForeignKey<PaymentVoucher>(x => x.PaymentVoucherID).OnDelete(DeleteBehavior.Cascade);
            //});

            //builder.Entity<Personnel>(x =>
            //{
            //    x.HasOne(x => x.Roles).WithOne().HasForeignKey<Role>(x => x.RoleID).OnDelete(DeleteBehavior.Cascade);
            //    x.HasOne(x => x.Prefixes).WithOne().HasForeignKey<Prefix>(x => x.PrefixID).OnDelete(DeleteBehavior.Cascade);
            //});




        }
    }
}
