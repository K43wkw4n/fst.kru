using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SystemSetting_Branchs_BranchId",
                table: "SystemSetting");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemSetting",
                table: "SystemSetting");

            migrationBuilder.RenameTable(
                name: "SystemSetting",
                newName: "SystemSettings");

            migrationBuilder.RenameIndex(
                name: "IX_SystemSetting_BranchId",
                table: "SystemSettings",
                newName: "IX_SystemSettings_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemSettings",
                table: "SystemSettings",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 4, 22, 45, 18, 303, DateTimeKind.Local).AddTicks(460));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 4, 22, 45, 18, 303, DateTimeKind.Local).AddTicks(471));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$AVWwQcNEg.VH9fKPAdLHl.JFOwz09V3n3aQyPNAKMgAysTb4Qao6e");

            migrationBuilder.AddForeignKey(
                name: "FK_SystemSettings_Branchs_BranchId",
                table: "SystemSettings",
                column: "BranchId",
                principalTable: "Branchs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SystemSettings_Branchs_BranchId",
                table: "SystemSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemSettings",
                table: "SystemSettings");

            migrationBuilder.RenameTable(
                name: "SystemSettings",
                newName: "SystemSetting");

            migrationBuilder.RenameIndex(
                name: "IX_SystemSettings_BranchId",
                table: "SystemSetting",
                newName: "IX_SystemSetting_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemSetting",
                table: "SystemSetting",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 4, 22, 32, 23, 966, DateTimeKind.Local).AddTicks(8407));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 4, 22, 32, 23, 966, DateTimeKind.Local).AddTicks(8416));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$6Bad4H/.JITwbc2lMqEWVeQbGgIqD9BLxyE8q8lNBQv1Uo.KqdAHO");

            migrationBuilder.AddForeignKey(
                name: "FK_SystemSetting_Branchs_BranchId",
                table: "SystemSetting",
                column: "BranchId",
                principalTable: "Branchs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
