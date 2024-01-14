using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitDb4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_OrderSlips_OrderSlipsID",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_OrderSlipItems_OrderSlipItemId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVouchersID",
                table: "PaymentVoucherItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderSlipItems_OrderSlipsID",
                table: "OrderSlipItems");

            migrationBuilder.DropColumn(
                name: "LatestCodeWithdrawn",
                table: "OrderSlipItems");

            migrationBuilder.DropColumn(
                name: "OrderSlipsID",
                table: "OrderSlipItems");

            migrationBuilder.DropColumn(
                name: "QuantityAlreadyWithdrawn",
                table: "OrderSlipItems");

            migrationBuilder.RenameColumn(
                name: "PaymentVouchersID",
                table: "PaymentVoucherItems",
                newName: "SuppliesId");

            migrationBuilder.RenameColumn(
                name: "OrderSlipItemId",
                table: "PaymentVoucherItems",
                newName: "PaymentVoucherId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_PaymentVouchersID",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_SuppliesId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_OrderSlipItemId",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_PaymentVoucherId");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "OrderSlipItems",
                newName: "OrderSlipId");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Supplies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$0XCo6T1AAmg7iwfYUKT/tuLaX5CCe7Eka7MOdnnebFYss0cqPYpOy");

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 0, new DateTime(2023, 12, 17, 23, 18, 24, 454, DateTimeKind.Local).AddTicks(1950) });

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 0, new DateTime(2023, 12, 17, 23, 18, 24, 454, DateTimeKind.Local).AddTicks(1962) });

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_OrderSlipId",
                table: "OrderSlipItems",
                column: "OrderSlipId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_OrderSlips_OrderSlipId",
                table: "OrderSlipItems",
                column: "OrderSlipId",
                principalTable: "OrderSlips",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_OrderSlips_OrderSlipId",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVoucherItems_Supplies_SuppliesId",
                table: "PaymentVoucherItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderSlipItems_OrderSlipId",
                table: "OrderSlipItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Supplies");

            migrationBuilder.RenameColumn(
                name: "SuppliesId",
                table: "PaymentVoucherItems",
                newName: "PaymentVouchersID");

            migrationBuilder.RenameColumn(
                name: "PaymentVoucherId",
                table: "PaymentVoucherItems",
                newName: "OrderSlipItemId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_SuppliesId",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_PaymentVouchersID");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVoucherItems_PaymentVoucherId",
                table: "PaymentVoucherItems",
                newName: "IX_PaymentVoucherItems_OrderSlipItemId");

            migrationBuilder.RenameColumn(
                name: "OrderSlipId",
                table: "OrderSlipItems",
                newName: "Status");

            migrationBuilder.AddColumn<int>(
                name: "LatestCodeWithdrawn",
                table: "OrderSlipItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderSlipsID",
                table: "OrderSlipItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityAlreadyWithdrawn",
                table: "OrderSlipItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$MbCOeX7WGjSn/ekeEwdxpuKmh8msUw.jXNtnKcwlS0jmAVzJ39Zdq");

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2023, 12, 4, 14, 6, 53, 396, DateTimeKind.Local).AddTicks(3144));

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2023, 12, 4, 14, 6, 53, 396, DateTimeKind.Local).AddTicks(3160));

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_OrderSlipsID",
                table: "OrderSlipItems",
                column: "OrderSlipsID");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_OrderSlips_OrderSlipsID",
                table: "OrderSlipItems",
                column: "OrderSlipsID",
                principalTable: "OrderSlips",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems",
                column: "SuppliesId",
                principalTable: "Supplies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_OrderSlipItems_OrderSlipItemId",
                table: "PaymentVoucherItems",
                column: "OrderSlipItemId",
                principalTable: "OrderSlipItems",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVouchersID",
                table: "PaymentVoucherItems",
                column: "PaymentVouchersID",
                principalTable: "PaymentVouchers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
