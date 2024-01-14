using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInit6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BranchName",
                table: "Branchs",
                newName: "BranchNameTH");

            migrationBuilder.AddColumn<string>(
                name: "BranchNameEN",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Branchs",
                columns: new[] { "ID", "BranchNameEN", "BranchNameTH" },
                values: new object[,]
                {
                    { 1, "ScienceAndTechnology", "คณะวิทยาศาสตร์และเทคโนโลยี" },
                    { 2, "ComputerScience", "วิทยาการคอมพิวเตอร์" }
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "BranchNameEN",
                table: "Branchs");

            migrationBuilder.RenameColumn(
                name: "BranchNameTH",
                table: "Branchs",
                newName: "BranchName");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 0, new DateTime(2023, 12, 20, 11, 11, 35, 125, DateTimeKind.Local).AddTicks(9575) });

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Quantity", "Year" },
                values: new object[] { 0, new DateTime(2023, 12, 20, 11, 11, 35, 125, DateTimeKind.Local).AddTicks(9585) });

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$V3xPzGLokALyHUccv2WabOWOZ43oeS0u/KbTKN4WEp3owsZDiggeq");
        }
    }
}
