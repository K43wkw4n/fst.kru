using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BranchNameEN",
                table: "Branchs");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 4, 12, 33, 38, 782, DateTimeKind.Local).AddTicks(6226));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 4, 12, 33, 38, 782, DateTimeKind.Local).AddTicks(6236));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$chpawHun6hLm9S9taFMyAORymMcaGDEeuz3Ez7cheKmmQDNiy/KmS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BranchNameEN",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 1,
                column: "BranchNameEN",
                value: "ScienceAndTechnology");

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 2,
                column: "BranchNameEN",
                value: "ComputerScience");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 3, 22, 12, 1, 202, DateTimeKind.Local).AddTicks(5503));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 3, 22, 12, 1, 202, DateTimeKind.Local).AddTicks(5512));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$YMFflBxYzaVqPyYKREqIp.Tqvp8RCg8d20kKuJjonDTDvXupWWCFi");
        }
    }
}
