using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb17 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SlideShows",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlideShowName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SlideShows", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SlideShows_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 5, 23, 24, 48, 248, DateTimeKind.Local).AddTicks(9119));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 5, 23, 24, 48, 248, DateTimeKind.Local).AddTicks(9132));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$Ao287PIu/0ooYP2C15ctQe6kIrRtPyCi9c7oqqZaFWDRpupZ/EABy");

            migrationBuilder.CreateIndex(
                name: "IX_SlideShows_BranchId",
                table: "SlideShows",
                column: "BranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SlideShows");

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 5, 23, 16, 13, 204, DateTimeKind.Local).AddTicks(5675));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 5, 23, 16, 13, 204, DateTimeKind.Local).AddTicks(5741));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$QdoYG1Hr3XTgl1eAWgIlKuzgMV8ldo9VYll36NhJp6Xe3qxJuPI0i");
        }
    }
}
