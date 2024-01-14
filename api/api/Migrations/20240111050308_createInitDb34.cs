using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb34 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Curriculums",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurriculumTH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurriculumEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curriculums", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Curriculums_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GeneralTopics",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsUsed = table.Column<int>(type: "int", nullable: false),
                    CurriculumId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralTopics", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GeneralTopics_Curriculums_CurriculumId",
                        column: x => x.CurriculumId,
                        principalTable: "Curriculums",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubjectGroup",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurriculumId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectGroup", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubjectGroup_Curriculums_CurriculumId",
                        column: x => x.CurriculumId,
                        principalTable: "Curriculums",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubGeneralTopics",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeneralTopicsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubGeneralTopics", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicsId",
                        column: x => x.GeneralTopicsId,
                        principalTable: "GeneralTopics",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubSubjectGroup",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credit = table.Column<int>(type: "int", nullable: false),
                    SubjectGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubSubjectGroup", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubSubjectGroup_SubjectGroup_SubjectGroupId",
                        column: x => x.SubjectGroupId,
                        principalTable: "SubjectGroup",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 1,
                column: "Year",
                value: new DateTime(2024, 1, 11, 12, 3, 8, 286, DateTimeKind.Local).AddTicks(8672));

            migrationBuilder.UpdateData(
                table: "Parcels",
                keyColumn: "ID",
                keyValue: 2,
                column: "Year",
                value: new DateTime(2024, 1, 11, 12, 3, 8, 286, DateTimeKind.Local).AddTicks(8684));

            migrationBuilder.UpdateData(
                table: "Personnels",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$hFddkrNRsXhe/9S0//H3BOt/o75X4q/CCotLAX3jI1K84MD8mx1iS");

            migrationBuilder.CreateIndex(
                name: "IX_Curriculums_BranchId",
                table: "Curriculums",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralTopics_CurriculumId",
                table: "GeneralTopics",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_SubGeneralTopics_GeneralTopicsId",
                table: "SubGeneralTopics",
                column: "GeneralTopicsId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectGroup_CurriculumId",
                table: "SubjectGroup",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_SubSubjectGroup_SubjectGroupId",
                table: "SubSubjectGroup",
                column: "SubjectGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubGeneralTopics");

            migrationBuilder.DropTable(
                name: "SubSubjectGroup");

            migrationBuilder.DropTable(
                name: "GeneralTopics");

            migrationBuilder.DropTable(
                name: "SubjectGroup");

            migrationBuilder.DropTable(
                name: "Curriculums");

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
    }
}
