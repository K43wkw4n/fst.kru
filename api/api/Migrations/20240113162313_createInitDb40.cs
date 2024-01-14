using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb40 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Expert",
                table: "Personnels");

            migrationBuilder.DropColumn(
                name: "LvEdu",
                table: "Personnels");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 13, 23, 23, 12, 809, DateTimeKind.Local).AddTicks(9763));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 13, 23, 23, 12, 809, DateTimeKind.Local).AddTicks(9778));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$UZaibZqhBR7T6HAXlqxpq.pndbqip1WlvR8LB8xRE6h03eF2dEipu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Expert",
                table: "Personnels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LvEdu",
                table: "Personnels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 13, 20, 51, 7, 858, DateTimeKind.Local).AddTicks(1839));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 13, 20, 51, 7, 858, DateTimeKind.Local).AddTicks(1865));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Expert", "LvEdu", "PasswordHash" },
                values: new object[] { "Software Development", "ป.ตรี", "$2a$11$7uU77Eu61yC33g35OVLLmeYcU7QzkWHhDEMDv7uDVYGluB8/td1ly" });
        }
    }
}
