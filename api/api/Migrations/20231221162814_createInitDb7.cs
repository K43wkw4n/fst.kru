using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Parcels");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2023, 12, 21, 23, 28, 14, 232, DateTimeKind.Local).AddTicks(1574));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2023, 12, 21, 23, 28, 14, 232, DateTimeKind.Local).AddTicks(1589));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$48G79zyINLMry0GC2NtB0.kIyf3phLvOgNh2jgt21srjZkS.TSTi6");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Parcels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 15, new DateTime(2023, 12, 20, 23, 32, 33, 952, DateTimeKind.Local).AddTicks(6287) });

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 10, new DateTime(2023, 12, 20, 23, 32, 33, 952, DateTimeKind.Local).AddTicks(6297) });

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$8WcXxk1G5CJWiE/RbxkXv.VScNnV7.DPicjEjuHLpG1ibyhsCC8N.");
        }
    }
}
