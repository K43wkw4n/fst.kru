using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVouchers_Personnels_PersonnelID",
                table: "PaymentVouchers");

            migrationBuilder.RenameColumn(
                name: "PersonnelID",
                table: "PaymentVouchers",
                newName: "PersonnelsID");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVouchers_PersonnelID",
                table: "PaymentVouchers",
                newName: "IX_PaymentVouchers_PersonnelsID");

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$3Rc7jgNFB63CU8Iso3HIruIFUSw0Sp7jq73FmM5I.kslQpKIXfqq.");

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2023, 11, 30, 21, 34, 41, 980, DateTimeKind.Local).AddTicks(888));

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2023, 11, 30, 21, 34, 41, 980, DateTimeKind.Local).AddTicks(904));

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVouchers_Personnels_PersonnelsID",
                table: "PaymentVouchers",
                column: "PersonnelsID",
                principalTable: "Personnels",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVouchers_Personnels_PersonnelsID",
                table: "PaymentVouchers");

            migrationBuilder.RenameColumn(
                name: "PersonnelsID",
                table: "PaymentVouchers",
                newName: "PersonnelID");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentVouchers_PersonnelsID",
                table: "PaymentVouchers",
                newName: "IX_PaymentVouchers_PersonnelID");

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$PtmVR0oznUbVfKadx97KEOxi4a8Km/Cd7OS00z0B0SNznOXWhWwS6");

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2023, 11, 30, 13, 50, 6, 535, DateTimeKind.Local).AddTicks(4514));

            migrationBuilder.UpdateData(
                table: "Supplies",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2023, 11, 30, 13, 50, 6, 535, DateTimeKind.Local).AddTicks(4579));

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVouchers_Personnels_PersonnelID",
                table: "PaymentVouchers",
                column: "PersonnelID",
                principalTable: "Personnels",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
