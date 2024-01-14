using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb39 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                column: "PasswordHash",
                value: "$2a$11$7uU77Eu61yC33g35OVLLmeYcU7QzkWHhDEMDv7uDVYGluB8/td1ly");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 13, 1, 51, 15, 42, DateTimeKind.Local).AddTicks(1597));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 13, 1, 51, 15, 42, DateTimeKind.Local).AddTicks(1611));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$bwRljCG1fGoaWc/KLcaTSOWPro8YF7oGCyCBflVwNMcVlpw0My9ge");
        }
    }
}
