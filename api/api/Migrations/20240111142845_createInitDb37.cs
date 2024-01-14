using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb37 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicsId",
                table: "SubGeneralTopics");

            migrationBuilder.RenameColumn(
                name: "GeneralTopicsId",
                table: "SubGeneralTopics",
                newName: "GeneralTopicId");

            migrationBuilder.RenameIndex(
                name: "IX_SubGeneralTopics_GeneralTopicsId",
                table: "SubGeneralTopics",
                newName: "IX_SubGeneralTopics_GeneralTopicId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicId",
                table: "SubGeneralTopics",
                column: "GeneralTopicId",
                principalTable: "GeneralTopics",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicId",
                table: "SubGeneralTopics");

            migrationBuilder.RenameColumn(
                name: "GeneralTopicId",
                table: "SubGeneralTopics",
                newName: "GeneralTopicsId");

            migrationBuilder.RenameIndex(
                name: "IX_SubGeneralTopics_GeneralTopicId",
                table: "SubGeneralTopics",
                newName: "IX_SubGeneralTopics_GeneralTopicsId");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 11, 16, 29, 28, 50, DateTimeKind.Local).AddTicks(3295));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 11, 16, 29, 28, 50, DateTimeKind.Local).AddTicks(3309));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$j8W3zz98I6OVCgPHuPfwoeoKDh2Hk9nTbtsx5Pe9NXRpFO27nS7X2");

            migrationBuilder.AddForeignKey(
                name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicsId",
                table: "SubGeneralTopics",
                column: "GeneralTopicsId",
                principalTable: "GeneralTopics",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
