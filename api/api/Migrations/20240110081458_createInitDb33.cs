using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb33 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BranchNameTH",
                table: "Branchs",
                newName: "Text");

            migrationBuilder.AddColumn<string>(
                name: "BranchName",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CategoryBranch",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryMajor",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageFacebook",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Branchs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "BranchName", "CategoryBranch", "CategoryMajor", "Logo", "PageFacebook", "Text", "VideoUrl" },
                values: new object[] { "คณะวิทยาศาสตร์และเทคโนโลยี", null, null, null, "https://www.facebook.com/FST.KRU", "", null });

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "BranchName", "CategoryBranch", "CategoryMajor", "Logo", "PageFacebook", "Text", "VideoUrl" },
                values: new object[] { "วิทยาการคอมพิวเตอร์", "วทบ.", "คอมพิวเตอร์", null, "https://www.facebook.com/kru.cs", "", null });

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 10, 15, 14, 58, 479, DateTimeKind.Local).AddTicks(3998));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 10, 15, 14, 58, 479, DateTimeKind.Local).AddTicks(4011));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$H/L4M8qPwSO9y9KcF8uyhe95p9pCNCWlDkTxXvXohfCdhITAUa8JC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BranchName",
                table: "Branchs");

            migrationBuilder.DropColumn(
                name: "CategoryBranch",
                table: "Branchs");

            migrationBuilder.DropColumn(
                name: "CategoryMajor",
                table: "Branchs");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Branchs");

            migrationBuilder.DropColumn(
                name: "PageFacebook",
                table: "Branchs");

            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Branchs");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Branchs",
                newName: "BranchNameTH");

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 1,
                column: "BranchNameTH",
                value: "คณะวิทยาศาสตร์และเทคโนโลยี");

            migrationBuilder.UpdateData(
                table: "Branchs",
                keyColumn: "ID",
                keyValue: 2,
                column: "BranchNameTH",
                value: "วิทยาการคอมพิวเตอร์");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 9, 23, 17, 50, 344, DateTimeKind.Local).AddTicks(7689));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 9, 23, 17, 50, 344, DateTimeKind.Local).AddTicks(7701));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$Bxrxl1Tdz0282q9RfZxP5.7zDo1lriiwI2oUp.MAOWh.LlZ3qohWa");
        }
    }
}
