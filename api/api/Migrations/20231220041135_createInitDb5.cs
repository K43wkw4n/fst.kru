using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_Supplies_SuppliesId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropTable(
                name: "Supplies");

            migrationBuilder.RenameColumn(
                name: "SuppliesId",
                table: "PaymentVoucherItems",
                newName: "ParcelOfBranchId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_SuppliesId",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_ParcelOfBranchId");

            migrationBuilder.RenameColumn(
                name: "SuppliesId",
                table: "OrderSlipItems",
                newName: "ParcelOfBranchId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderSlipItems_SuppliesId",
                table: "OrderSlipItems",
                newName: "IX_OrderSlipItems_ParcelOfBranchId");

            migrationBuilder.CreateTable(
                name: "Branchs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branchs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParcelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Classifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ParcelOfBranchs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParcelId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParcelOfBranchs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ParcelOfBranchs_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParcelOfBranchs_Parcels_ParcelId",
                        column: x => x.ParcelId,
                        principalTable: "Parcels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Parcels",
                columns: new[] { "ID", "Classifier", "ParcelName", "Price", "Quantity", "Year" },
                values: new object[,]
                {
                    { 1, "กล่อง", "หมึกพิมพ์ Laser jet HP 85A", 2990.0, 0, new DateTime(2023, 12, 20, 11, 11, 35, 125, DateTimeKind.Local).AddTicks(9575) },
                    { 2, "ด้าม", "ปากกาเจลสีน้ำเงิน", 25.0, 0, new DateTime(2023, 12, 20, 11, 11, 35, 125, DateTimeKind.Local).AddTicks(9585) }
                });

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$V3xPzGLokALyHUccv2WabOWOZ43oeS0u/KbTKN4WEp3owsZDiggeq");

            migrationBuilder.CreateIndex(
                name: "IX_ParcelOfBranchs_BranchId",
                table: "ParcelOfBranchs",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ParcelOfBranchs_ParcelId",
                table: "ParcelOfBranchs",
                column: "ParcelId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_ParcelOfBranchs_ParcelOfBranchId",
                table: "OrderSlipItems",
                column: "ParcelOfBranchId",
                principalTable: "ParcelOfBranchs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_ParcelOfBranchs_ParcelOfBranchId",
                table: "PaymentVoucherItems",
                column: "ParcelOfBranchId",
                principalTable: "ParcelOfBranchs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                table: "PaymentVoucherItems",
                column: "PaymentVoucherId",
                principalTable: "PaymentVouchers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_ParcelOfBranchs_ParcelOfBranchId",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_ParcelOfBranchs_ParcelOfBranchId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropTable(
                name: "ParcelOfBranchs");

            migrationBuilder.DropTable(
                name: "Branchs");

            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.RenameColumn(
                name: "ParcelOfBranchId",
                table: "PaymentVoucherItems",
                newName: "SuppliesId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_ParcelOfBranchId",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_SuppliesId");

            migrationBuilder.RenameColumn(
                name: "ParcelOfBranchId",
                table: "OrderSlipItems",
                newName: "SuppliesId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderSlipItems_ParcelOfBranchId",
                table: "OrderSlipItems",
                newName: "IX_OrderSlipItems_SuppliesId");

            migrationBuilder.CreateTable(
                name: "Supplies",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Classifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    SuppliesName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplies", x => x.ID);
                });

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$0XCo6T1AAmg7iwfYUKT/tuLaX5CCe7Eka7MOdnnebFYss0cqPYpOy");

            migrationBuilder.InsertData(
                table: "Supplies",
                columns: new[] { "ID", "Classifier", "Price", "Quantity", "SuppliesName", "Year" },
                values: new object[,]
                {
                    { 1, "กล่อง", 2990.0, 0, "หมึกพิมพ์ Laser jet HP 85A", new DateTime(2023, 12, 17, 23, 18, 24, 454, DateTimeKind.Local).AddTicks(1950) },
                    { 2, "ด้าม", 25.0, 0, "ปากกาเจลสีน้ำเงิน", new DateTime(2023, 12, 17, 23, 18, 24, 454, DateTimeKind.Local).AddTicks(1962) }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems",
                column: "SuppliesId",
                principalTable: "Supplies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                table: "PaymentVoucherItems",
                column: "PaymentVoucherId",
                principalTable: "PaymentVouchers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_Supplies_SuppliesId",
                table: "PaymentVoucherItems",
                column: "SuppliesId",
                principalTable: "Supplies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
