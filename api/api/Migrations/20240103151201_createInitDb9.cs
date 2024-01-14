using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Personnels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
                columns: new[] { "Description", "PasswordHash" },
                values: new object[] { "จบมาจาก...", "$2a$11$YMFflBxYzaVqPyYKREqIp.Tqvp8RCg8d20kKuJjonDTDvXupWWCFi" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Personnels");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2023, 12, 22, 13, 46, 12, 776, DateTimeKind.Local).AddTicks(1009));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2023, 12, 22, 13, 46, 12, 776, DateTimeKind.Local).AddTicks(1018));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$/HMG1d90m/GlUsRCjzGuZe99i/XJRGlFDrd1KWNCObbsR9d04T6Jq");
        }
    }
}
