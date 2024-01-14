﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20240105161613_createInitDb16")]
    partial class createInitDb16
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.NEWS.News", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("IsUsed")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("BranchId");

                    b.ToTable("News");
                });

            modelBuilder.Entity("api.Models.NEWS.NewsPhoto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("NewsId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("NewsId");

                    b.ToTable("NewsPhotos");
                });

            modelBuilder.Entity("api.Models.Parcel.Budget", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("BudgetName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Budgets");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            BudgetName = "งปม."
                        },
                        new
                        {
                            ID = 2,
                            BudgetName = "บกศ."
                        });
                });

            modelBuilder.Entity("api.Models.Parcel.OrderSlip", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BudgetsID")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderSlipImportantId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrderSlipNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderSlipStatus")
                        .HasColumnType("int");

                    b.Property<int>("PersonnelsID")
                        .HasColumnType("int");

                    b.Property<string>("PetitionNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StorageLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Year")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("BudgetsID");

                    b.HasIndex("PersonnelsID");

                    b.ToTable("OrderSlips");
                });

            modelBuilder.Entity("api.Models.Parcel.OrderSlipItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("OrderSlipId")
                        .HasColumnType("int");

                    b.Property<int>("ParcelOfBranchId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OrderSlipId");

                    b.HasIndex("ParcelOfBranchId");

                    b.ToTable("OrderSlipItems");
                });

            modelBuilder.Entity("api.Models.Parcel.Parcel", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Classifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParcelName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("Year")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("Parcels");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Classifier = "กล่อง",
                            ParcelName = "หมึกพิมพ์ Laser jet HP 85A",
                            Price = 2990.0,
                            Year = new DateTime(2024, 1, 5, 23, 16, 13, 204, DateTimeKind.Local).AddTicks(5675)
                        },
                        new
                        {
                            ID = 2,
                            Classifier = "ด้าม",
                            ParcelName = "ปากกาเจลสีน้ำเงิน",
                            Price = 25.0,
                            Year = new DateTime(2024, 1, 5, 23, 16, 13, 204, DateTimeKind.Local).AddTicks(5741)
                        });
                });

            modelBuilder.Entity("api.Models.Parcel.ParcelOfBranch", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.Property<int>("ParcelId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Year")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("BranchId");

                    b.HasIndex("ParcelId");

                    b.ToTable("ParcelOfBranchs");
                });

            modelBuilder.Entity("api.Models.Parcel.PaymentVoucher", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentVoucherImportantId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PaymentVoucherStatus")
                        .HasColumnType("int");

                    b.Property<string>("PersonApproving")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PersonnelsID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PersonnelsID");

                    b.ToTable("PaymentVouchers");
                });

            modelBuilder.Entity("api.Models.Parcel.PaymentVoucherItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParcelOfBranchId")
                        .HasColumnType("int");

                    b.Property<int>("PaymentVoucherId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ParcelOfBranchId");

                    b.HasIndex("PaymentVoucherId");

                    b.ToTable("PaymentVoucherItems");
                });

            modelBuilder.Entity("api.Models.Person.GeneralPosition", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("GeneralPositionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("GeneralPositions");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            GeneralPositionName = "บริหารงานทั่วไป"
                        },
                        new
                        {
                            ID = 2,
                            GeneralPositionName = "อาจารย์"
                        });
                });

            modelBuilder.Entity("api.Models.Person.Personnel", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Expert")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GeneralPositionID")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LvEdu")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PrefixID")
                        .HasColumnType("int");

                    b.Property<int>("RoleID")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("GeneralPositionID");

                    b.HasIndex("PrefixID");

                    b.HasIndex("RoleID");

                    b.ToTable("Personnels");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Description = "จบมาจาก...",
                            Expert = "Software Development",
                            FullName = "Hikigaya Hachiman",
                            GeneralPositionID = 1,
                            Image = "Hachi@gmail.com",
                            LvEdu = "ป.ตรี",
                            PasswordHash = "$2a$11$QdoYG1Hr3XTgl1eAWgIlKuzgMV8ldo9VYll36NhJp6Xe3qxJuPI0i",
                            PrefixID = 1,
                            RoleID = 1,
                            UserName = "Hachi"
                        });
                });

            modelBuilder.Entity("api.Models.Person.Prefix", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("PrefixName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Prefixes");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            PrefixName = "นาย"
                        },
                        new
                        {
                            ID = 2,
                            PrefixName = "นาง"
                        },
                        new
                        {
                            ID = 3,
                            PrefixName = "นางนางสาว"
                        },
                        new
                        {
                            ID = 4,
                            PrefixName = "ผศ."
                        },
                        new
                        {
                            ID = 5,
                            PrefixName = "รศ."
                        });
                });

            modelBuilder.Entity("api.Models.Person.Role", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            RoleName = "Admin"
                        },
                        new
                        {
                            ID = 2,
                            RoleName = "Lecturer"
                        },
                        new
                        {
                            ID = 3,
                            RoleName = "User"
                        });
                });

            modelBuilder.Entity("api.Models.fst.Branch", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("BranchNameTH")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Branchs");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            BranchNameTH = "คณะวิทยาศาสตร์และเทคโนโลยี"
                        },
                        new
                        {
                            ID = 2,
                            BranchNameTH = "วิทยาการคอมพิวเตอร์"
                        });
                });

            modelBuilder.Entity("api.Models.system.SystemSetting", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PageFacebook")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WebName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("BranchId");

                    b.ToTable("SystemSettings");
                });

            modelBuilder.Entity("api.Models.NEWS.News", b =>
                {
                    b.HasOne("api.Models.fst.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("api.Models.NEWS.NewsPhoto", b =>
                {
                    b.HasOne("api.Models.NEWS.News", "News")
                        .WithMany()
                        .HasForeignKey("NewsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("News");
                });

            modelBuilder.Entity("api.Models.Parcel.OrderSlip", b =>
                {
                    b.HasOne("api.Models.Parcel.Budget", "Budgets")
                        .WithMany("OrderSlips")
                        .HasForeignKey("BudgetsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Person.Personnel", "Personnels")
                        .WithMany("OrderSlips")
                        .HasForeignKey("PersonnelsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Budgets");

                    b.Navigation("Personnels");
                });

            modelBuilder.Entity("api.Models.Parcel.OrderSlipItem", b =>
                {
                    b.HasOne("api.Models.Parcel.OrderSlip", "OrderSlips")
                        .WithMany("OrderSlipItems")
                        .HasForeignKey("OrderSlipId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("api.Models.Parcel.ParcelOfBranch", "ParcelOfBranchs")
                        .WithMany("OrderSlipItems")
                        .HasForeignKey("ParcelOfBranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OrderSlips");

                    b.Navigation("ParcelOfBranchs");
                });

            modelBuilder.Entity("api.Models.Parcel.ParcelOfBranch", b =>
                {
                    b.HasOne("api.Models.fst.Branch", "Branchs")
                        .WithMany("ParcelOfBranchs")
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Parcel.Parcel", "Parcels")
                        .WithMany("ParcelOfBranchs")
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branchs");

                    b.Navigation("Parcels");
                });

            modelBuilder.Entity("api.Models.Parcel.PaymentVoucher", b =>
                {
                    b.HasOne("api.Models.Person.Personnel", "Personnels")
                        .WithMany("PaymentVouchers")
                        .HasForeignKey("PersonnelsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Personnels");
                });

            modelBuilder.Entity("api.Models.Parcel.PaymentVoucherItem", b =>
                {
                    b.HasOne("api.Models.Parcel.ParcelOfBranch", "ParcelOfBranchs")
                        .WithMany("PaymentVoucherItems")
                        .HasForeignKey("ParcelOfBranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Parcel.PaymentVoucher", "PaymentVouchers")
                        .WithMany("PaymentVoucherItems")
                        .HasForeignKey("PaymentVoucherId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ParcelOfBranchs");

                    b.Navigation("PaymentVouchers");
                });

            modelBuilder.Entity("api.Models.Person.Personnel", b =>
                {
                    b.HasOne("api.Models.Person.GeneralPosition", "GeneralPositions")
                        .WithMany()
                        .HasForeignKey("GeneralPositionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Person.Prefix", "Prefixes")
                        .WithMany()
                        .HasForeignKey("PrefixID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Person.Role", "Roles")
                        .WithMany()
                        .HasForeignKey("RoleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GeneralPositions");

                    b.Navigation("Prefixes");

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("api.Models.system.SystemSetting", b =>
                {
                    b.HasOne("api.Models.fst.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("api.Models.Parcel.Budget", b =>
                {
                    b.Navigation("OrderSlips");
                });

            modelBuilder.Entity("api.Models.Parcel.OrderSlip", b =>
                {
                    b.Navigation("OrderSlipItems");
                });

            modelBuilder.Entity("api.Models.Parcel.Parcel", b =>
                {
                    b.Navigation("ParcelOfBranchs");
                });

            modelBuilder.Entity("api.Models.Parcel.ParcelOfBranch", b =>
                {
                    b.Navigation("OrderSlipItems");

                    b.Navigation("PaymentVoucherItems");
                });

            modelBuilder.Entity("api.Models.Parcel.PaymentVoucher", b =>
                {
                    b.Navigation("PaymentVoucherItems");
                });

            modelBuilder.Entity("api.Models.Person.Personnel", b =>
                {
                    b.Navigation("OrderSlips");

                    b.Navigation("PaymentVouchers");
                });

            modelBuilder.Entity("api.Models.fst.Branch", b =>
                {
                    b.Navigation("ParcelOfBranchs");
                });
#pragma warning restore 612, 618
        }
    }
}
