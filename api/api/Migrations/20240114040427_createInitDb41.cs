using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb41 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                value: new DateTime(2024, 1, 14, 11, 4, 27, 186, DateTimeKind.Local).AddTicks(3404));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 14, 11, 4, 27, 186, DateTimeKind.Local).AddTicks(3423));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Expert", "LvEdu", "PasswordHash" },
                values: new object[] { "Software Development", "ป.ตรี", "$2a$11$CTSTplziLaZjozCkHyLNVuGZf6DQNBae5zYM/YXA2wJF/rwu5kimm" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                value: new DateTime(2024, 1, 14, 0, 38, 56, 712, DateTimeKind.Local).AddTicks(835));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 14, 0, 38, 56, 712, DateTimeKind.Local).AddTicks(850));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$c9QJbFuGDRws8vWqtyVudeQ3o1yZHN/0.hzFZNezjGvcMgP5Dizhi");
        }
    }
}
