using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ParcelOfBranchs",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ParcelOfBranchs");

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
    }
}
