using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInit3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesID",
                table: "OrderSlipItems");

            migrationBuilder.DropColumn(
                name: "SuppliesCode",
                table: "Supplies");

            migrationBuilder.RenameColumn(
                name: "SuppliesID",
                table: "OrderSlipItems",
                newName: "SuppliesId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderSlipItems_SuppliesID",
                table: "OrderSlipItems",
                newName: "IX_OrderSlipItems_SuppliesId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems",
                column: "SuppliesId",
                principalTable: "Supplies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesId",
                table: "OrderSlipItems");

            migrationBuilder.RenameColumn(
                name: "SuppliesId",
                table: "OrderSlipItems",
                newName: "SuppliesID");

            migrationBuilder.RenameIndex(
                name: "IX_OrderSlipItems_SuppliesId",
                table: "OrderSlipItems",
                newName: "IX_OrderSlipItems_SuppliesID");

            migrationBuilder.AddColumn<string>(
                name: "SuppliesCode",
                table: "Supplies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$3Rc7jgNFB63CU8Iso3HIruIFUSw0Sp7jq73FmM5I.kslQpKIXfqq.");

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "SuppliesCode", "Year" },
                values: new object[] { "H001", new DateTime(2023, 11, 30, 21, 34, 41, 980, DateTimeKind.Local).AddTicks(888) });

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "SuppliesCode", "Year" },
                values: new object[] { "P001", new DateTime(2023, 11, 30, 21, 34, 41, 980, DateTimeKind.Local).AddTicks(904) });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderSlipItems_Supplies_SuppliesID",
                table: "OrderSlipItems",
                column: "SuppliesID",
                principalTable: "Supplies",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
