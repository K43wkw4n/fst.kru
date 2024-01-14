using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb38 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "File",
                table: "Curriculums",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "File",
                table: "Curriculums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 11, 21, 28, 45, 389, DateTimeKind.Local).AddTicks(3367));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 11, 21, 28, 45, 389, DateTimeKind.Local).AddTicks(3379));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$skViXN63cNM5agGoKOX03OlZqpVG5xtF0Bb/.EkEtn429eQqPGjvq");
        }
    }
}
