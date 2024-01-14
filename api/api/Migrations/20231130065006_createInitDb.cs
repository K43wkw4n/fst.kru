using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Budgets",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BudgetName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "GeneralPositions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralPositionName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralPositions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Prefixes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrefixName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prefixes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Supplies",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuppliesCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SuppliesName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Classifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplies", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Personnels",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Expert = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LvEdu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeneralPositionID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    PrefixID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personnels", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Personnels_GeneralPositions_GeneralPositionID",
                        column: x => x.GeneralPositionID,
                        principalTable: "GeneralPositions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Personnels_Prefixes_PrefixID",
                        column: x => x.PrefixID,
                        principalTable: "Prefixes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Personnels_Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Roles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderSlips",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderSlipImportantId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderSlipNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PetitionNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderSlipStatus = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StorageLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonnelsID = table.Column<int>(type: "int", nullable: false),
                    BudgetsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSlips", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderSlips_Budgets_BudgetsID",
                        column: x => x.BudgetsID,
                        principalTable: "Budgets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderSlips_Personnels_PersonnelsID",
                        column: x => x.PersonnelsID,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentVouchers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentVoucherImportantId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentVoucherStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonApproving = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonnelID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentVouchers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PaymentVouchers_Personnels_PersonnelID",
                        column: x => x.PersonnelID,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderSlipItems",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    QuantityAlreadyWithdrawn = table.Column<int>(type: "int", nullable: false),
                    LatestCodeWithdrawn = table.Column<int>(type: "int", nullable: false),
                    SuppliesID = table.Column<int>(type: "int", nullable: false),
                    OrderSlipsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSlipItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderSlipItems_OrderSlips_OrderSlipsID",
                        column: x => x.OrderSlipsID,
                        principalTable: "OrderSlips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderSlipItems_Supplies_SuppliesID",
                        column: x => x.SuppliesID,
                        principalTable: "Supplies",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PaymentVoucherItems",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderSlipItemId = table.Column<int>(type: "int", nullable: false),
                    PaymentVouchersID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentVoucherItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PaymentVoucherItems_OrderSlipItems_OrderSlipItemId",
                        column: x => x.OrderSlipItemId,
                        principalTable: "OrderSlipItems",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVouchersID",
                        column: x => x.PaymentVouchersID,
                        principalTable: "PaymentVouchers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Budgets",
                columns: new[] { "ID", "BudgetName" },
                values: new object[,]
                {
                    { 1, "งปม." },
                    { 2, "บกศ." }
                });

            migrationBuilder.InsertData(
                table: "GeneralPositions",
                columns: new[] { "ID", "GeneralPositionName" },
                values: new object[,]
                {
                    { 1, "บริหารงานทั่วไป" },
                    { 2, "อาจารย์" }
                });

            migrationBuilder.InsertData(
                table: "Prefixes",
                columns: new[] { "ID", "PrefixName" },
                values: new object[,]
                {
                    { 1, "นาย" },
                    { 2, "นาง" },
                    { 3, "นางนางสาว" },
                    { 4, "ผศ." },
                    { 5, "รศ." }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "ID", "RoleName" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Lecturer" },
                    { 3, "User" }
                });

            migrationBuilder.InsertData(
                table: "Supplies",
                columns: new[] { "ID", "Classifier", "Price", "SuppliesCode", "SuppliesName", "Year" },
                values: new object[,]
                {
                    { 1, "กล่อง", 2990.0, "H001", "หมึกพิมพ์ Laser jet HP 85A", new DateTime(2023, 11, 30, 13, 50, 6, 535, DateTimeKind.Local).AddTicks(4514) },
                    { 2, "ด้าม", 25.0, "P001", "ปากกาเจลสีน้ำเงิน", new DateTime(2023, 11, 30, 13, 50, 6, 535, DateTimeKind.Local).AddTicks(4579) }
                });

            migrationBuilder.InsertData(
                table: "Personnels",
                columns: new[] { "ID", "Expert", "FullName", "GeneralPositionID", "Image", "LvEdu", "PasswordHash", "PrefixID", "RoleID", "UserName" },
                values: new object[] { 1, "Software Development", "Hikigaya Hachiman", 1, "Hachi@gmail.com", "ป.ตรี", "$2a$11$PtmVR0oznUbVfKadx97KEOxi4a8Km/Cd7OS00z0B0SNznOXWhWwS6", 1, 1, "Hachi" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_OrderSlipsID",
                table: "OrderSlipItems",
                column: "OrderSlipsID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_SuppliesID",
                table: "OrderSlipItems",
                column: "SuppliesID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlips_BudgetsID",
                table: "OrderSlips",
                column: "BudgetsID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlips_PersonnelsID",
                table: "OrderSlips",
                column: "PersonnelsID");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVoucherItems_OrderSlipItemId",
                table: "PaymentVoucherItems",
                column: "OrderSlipItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVoucherItems_PaymentVouchersID",
                table: "PaymentVoucherItems",
                column: "PaymentVouchersID");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVouchers_PersonnelID",
                table: "PaymentVouchers",
                column: "PersonnelID");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_GeneralPositionID",
                table: "Personnels",
                column: "GeneralPositionID");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_PrefixID",
                table: "Personnels",
                column: "PrefixID");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_RoleID",
                table: "Personnels",
                column: "RoleID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentVoucherItems");

            migrationBuilder.DropTable(
                name: "OrderSlipItems");

            migrationBuilder.DropTable(
                name: "PaymentVouchers");

            migrationBuilder.DropTable(
                name: "OrderSlips");

            migrationBuilder.DropTable(
                name: "Supplies");

            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "Personnels");

            migrationBuilder.DropTable(
                name: "GeneralPositions");

            migrationBuilder.DropTable(
                name: "Prefixes");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
