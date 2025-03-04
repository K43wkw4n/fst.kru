using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class createInitDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Branchs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PageFacebook = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryBranch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryMajor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branchs", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Budgets",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BudgetName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CategoryCourseSpecifications",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryCourseSpecifications", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DirectorPositions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositionName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DirectorPositions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DirectorTypes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DirectorTypes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "GeneralPositions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralPositionName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralPositions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Generals",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    StartYear = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generals", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParcelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Classifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sequence = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Prefixes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrefixName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prefixes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Curriculums",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurriculumTH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurriculumEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
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
                name: "News",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.ID);
                    table.ForeignKey(
                        name: "FK_News_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SlideShows",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SlideShowName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsUsed = table.Column<int>(type: "int", nullable: false),
                    YearEdu = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Students_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SystemSettings",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WebName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PageFacebook = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemSettings", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SystemSettings_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeLearns",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsUsed = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeLearns", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WeLearns_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParcelOfBranchs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParcelId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParcelOfBranchs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ParcelOfBranchs_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParcelOfBranchs_Parcels_ParcelId",
                        column: x => x.ParcelId,
                        principalTable: "Parcels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Directors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directors", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Directors_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Personnels",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Expert = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LvEdu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeneralPositionID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    PrefixID = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personnels", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Personnels_GeneralPositions_GeneralPositionID",
                        column: x => x.GeneralPositionID,
                        principalTable: "GeneralPositions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Personnels_Prefixes_PrefixID",
                        column: x => x.PrefixID,
                        principalTable: "Prefixes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Personnels_Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Roles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubSections",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PDF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    SectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubSections", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubSections_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
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
                name: "NewsPhotos",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewsId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsPhotos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NewsPhotos_News_NewsId",
                        column: x => x.NewsId,
                        principalTable: "News",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobHistories",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartJob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobHistories", x => x.ID);
                    table.ForeignKey(
                        name: "FK_JobHistories_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameTH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameEN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PDF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YoutubeUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WebUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GithubUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KeyWords = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Projects_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnnualDirectors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    PDF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hidden = table.Column<bool>(type: "bit", nullable: false),
                    DirectorTypeId = table.Column<int>(type: "int", nullable: false),
                    DirectorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualDirectors", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AnnualDirectors_DirectorTypes_DirectorTypeId",
                        column: x => x.DirectorTypeId,
                        principalTable: "DirectorTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnnualDirectors_Directors_DirectorId",
                        column: x => x.DirectorId,
                        principalTable: "Directors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseSpecifications",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Semester = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PDF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SectionFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearEdu = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Credit = table.Column<int>(type: "int", nullable: false),
                    StudyGroup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudentsAmount = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false),
                    PersonnelId = table.Column<int>(type: "int", nullable: false),
                    CategoryCourseSpecificationId = table.Column<int>(type: "int", nullable: false),
                    SubjectsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSpecifications", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CourseSpecifications_CategoryCourseSpecifications_CategoryCourseSpecificationId",
                        column: x => x.CategoryCourseSpecificationId,
                        principalTable: "CategoryCourseSpecifications",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSpecifications_Personnels_PersonnelId",
                        column: x => x.PersonnelId,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSpecifications_Subjects_SubjectsId",
                        column: x => x.SubjectsId,
                        principalTable: "Subjects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderSlips",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderSlipImportantId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderSlipNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PetitionNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderSlipStatus = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StorageLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonnelsID = table.Column<int>(type: "int", nullable: false),
                    BudgetsID = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSlips", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderSlips_Budgets_BudgetsID",
                        column: x => x.BudgetsID,
                        principalTable: "Budgets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderSlips_Personnels_PersonnelsID",
                        column: x => x.PersonnelsID,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentVouchers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentVoucherImportantId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentVoucherStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonApproving = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonnelsID = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentVouchers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PaymentVouchers_Personnels_PersonnelsID",
                        column: x => x.PersonnelsID,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonnelinBranchs",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonnelId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: true),
                    IsUsed = table.Column<int>(type: "int", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonnelinBranchs", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PersonnelinBranchs_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonnelinBranchs_Personnels_PersonnelId",
                        column: x => x.PersonnelId,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonnelinBranchs_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ResearchAndProjects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PDF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Year = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BudgetAmount = table.Column<double>(type: "float", nullable: false),
                    Expertise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Participant = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Hidden = table.Column<bool>(type: "bit", nullable: false),
                    PersonnelId = table.Column<int>(type: "int", nullable: false),
                    BudgetId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResearchAndProjects", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ResearchAndProjects_Budgets_BudgetId",
                        column: x => x.BudgetId,
                        principalTable: "Budgets",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResearchAndProjects_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResearchAndProjects_Personnels_PersonnelId",
                        column: x => x.PersonnelId,
                        principalTable: "Personnels",
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
                    GeneralTopicId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubGeneralTopics", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubGeneralTopics_GeneralTopics_GeneralTopicId",
                        column: x => x.GeneralTopicId,
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

            migrationBuilder.CreateTable(
                name: "Consultants",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    PersonnelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultants", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Consultants_Personnels_PersonnelId",
                        column: x => x.PersonnelId,
                        principalTable: "Personnels",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Consultants_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderSlipItems",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ParcelOfBranchId = table.Column<int>(type: "int", nullable: false),
                    OrderSlipId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSlipItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderSlipItems_OrderSlips_OrderSlipId",
                        column: x => x.OrderSlipId,
                        principalTable: "OrderSlips",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderSlipItems_ParcelOfBranchs_ParcelOfBranchId",
                        column: x => x.ParcelOfBranchId,
                        principalTable: "ParcelOfBranchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentVoucherItems",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParcelOfBranchId = table.Column<int>(type: "int", nullable: false),
                    PaymentVoucherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentVoucherItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PaymentVoucherItems_ParcelOfBranchs_ParcelOfBranchId",
                        column: x => x.ParcelOfBranchId,
                        principalTable: "ParcelOfBranchs",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentVoucherItems_PaymentVouchers_PaymentVoucherId",
                        column: x => x.PaymentVoucherId,
                        principalTable: "PaymentVouchers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Branchs",
                columns: new[] { "ID", "BranchName", "CategoryBranch", "CategoryMajor", "Hidden", "Logo", "PageFacebook", "Text", "VideoUrl" },
                values: new object[,]
                {
                    { 1, "คณะวิทยาศาสตร์และเทคโนโลยี", null, null, false, null, "https://www.facebook.com/FST.KRU", "", null },
                    { 2, "วิทยาการคอมพิวเตอร์", "วทบ.", "คอมพิวเตอร์", false, null, "https://www.facebook.com/kru.cs", "", null }
                });

            migrationBuilder.InsertData(
                table: "Budgets",
                columns: new[] { "ID", "BudgetName" },
                values: new object[,]
                {
                    { 1, "งปม." },
                    { 2, "บกศ." }
                });

            migrationBuilder.InsertData(
                table: "GeneralPositions",
                columns: new[] { "ID", "GeneralPositionName" },
                values: new object[,]
                {
                    { 1, "บริหารงานทั่วไป" },
                    { 2, "อาจารย์" }
                });

            migrationBuilder.InsertData(
                table: "Parcels",
                columns: new[] { "ID", "Classifier", "Hidden", "ParcelName", "Price", "Year" },
                values: new object[,]
                {
                    { 1, "กล่อง", false, "หมึกพิมพ์ Laser jet HP 85A", 2990.0, new DateTime(2024, 5, 23, 3, 12, 44, 952, DateTimeKind.Local).AddTicks(1275) },
                    { 2, "ด้าม", false, "ปากกาเจลสีน้ำเงิน", 25.0, new DateTime(2024, 5, 23, 3, 12, 44, 952, DateTimeKind.Local).AddTicks(1299) }
                });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "ID", "PositionName", "Sequence" },
                values: new object[,]
                {
                    { 1, "คณบดี", 1 },
                    { 2, "เจ้าหน้าที่บริหารงานทั่วไป", 5 }
                });

            migrationBuilder.InsertData(
                table: "Prefixes",
                columns: new[] { "ID", "PrefixName" },
                values: new object[,]
                {
                    { 1, "นาย" },
                    { 2, "นาง" },
                    { 3, "นางนางสาว" },
                    { 4, "ผศ." },
                    { 5, "รศ." }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "ID", "RoleName" },
                values: new object[,]
                {
                    { 1, "ผู้ดูแล" },
                    { 2, "อาจารย์" },
                    { 3, "บุคลากร" },
                    { 4, "บุคลทั่วไป" }
                });

            migrationBuilder.InsertData(
                table: "Personnels",
                columns: new[] { "ID", "Description", "Expert", "FullName", "GeneralPositionID", "Hidden", "Image", "LvEdu", "PasswordHash", "PrefixID", "RoleID", "UserName" },
                values: new object[,]
                {
                    { 1, "admin", null, "Hikigaya Hachiman", 1, false, null, null, "$2a$11$hHhm.mntLqhLR5hIvlFbWeyFUsNvksHYY44T5R41Oaw3eT6KoGTGS", 1, 1, "Hachi" },
                    { 2, "admin", null, "Administrator", 1, false, null, null, "$2a$11$M3B3FbnnRtLo6eYkrfwj3e1YRnwLimEggmoE6.MhlBE1rwiZ/YRRW", 1, 1, "admin" }
                });

            migrationBuilder.InsertData(
                table: "PersonnelinBranchs",
                columns: new[] { "ID", "BranchId", "Hidden", "IsUsed", "PersonnelId", "PositionId" },
                values: new object[,]
                {
                    { 1, 1, false, 1, 1, 1 },
                    { 2, 1, false, 1, 2, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnnualDirectors_DirectorId",
                table: "AnnualDirectors",
                column: "DirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualDirectors_DirectorTypeId",
                table: "AnnualDirectors",
                column: "DirectorTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultants_PersonnelId",
                table: "Consultants",
                column: "PersonnelId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultants_ProjectId",
                table: "Consultants",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSpecifications_CategoryCourseSpecificationId",
                table: "CourseSpecifications",
                column: "CategoryCourseSpecificationId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSpecifications_PersonnelId",
                table: "CourseSpecifications",
                column: "PersonnelId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSpecifications_SubjectsId",
                table: "CourseSpecifications",
                column: "SubjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_Curriculums_BranchId",
                table: "Curriculums",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Directors_PositionId",
                table: "Directors",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralTopics_CurriculumId",
                table: "GeneralTopics",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_JobHistories_StudentId",
                table: "JobHistories",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_News_BranchId",
                table: "News",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsPhotos_NewsId",
                table: "NewsPhotos",
                column: "NewsId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_OrderSlipId",
                table: "OrderSlipItems",
                column: "OrderSlipId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlipItems_ParcelOfBranchId",
                table: "OrderSlipItems",
                column: "ParcelOfBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlips_BudgetsID",
                table: "OrderSlips",
                column: "BudgetsID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderSlips_PersonnelsID",
                table: "OrderSlips",
                column: "PersonnelsID");

            migrationBuilder.CreateIndex(
                name: "IX_ParcelOfBranchs_BranchId",
                table: "ParcelOfBranchs",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ParcelOfBranchs_ParcelId",
                table: "ParcelOfBranchs",
                column: "ParcelId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVoucherItems_ParcelOfBranchId",
                table: "PaymentVoucherItems",
                column: "ParcelOfBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVoucherItems_PaymentVoucherId",
                table: "PaymentVoucherItems",
                column: "PaymentVoucherId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVouchers_PersonnelsID",
                table: "PaymentVouchers",
                column: "PersonnelsID");

            migrationBuilder.CreateIndex(
                name: "IX_PersonnelinBranchs_BranchId",
                table: "PersonnelinBranchs",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonnelinBranchs_PersonnelId",
                table: "PersonnelinBranchs",
                column: "PersonnelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonnelinBranchs_PositionId",
                table: "PersonnelinBranchs",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_GeneralPositionID",
                table: "Personnels",
                column: "GeneralPositionID");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_PrefixID",
                table: "Personnels",
                column: "PrefixID");

            migrationBuilder.CreateIndex(
                name: "IX_Personnels_RoleID",
                table: "Personnels",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_StudentId",
                table: "Projects",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchAndProjects_BudgetId",
                table: "ResearchAndProjects",
                column: "BudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchAndProjects_CategoryId",
                table: "ResearchAndProjects",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchAndProjects_PersonnelId",
                table: "ResearchAndProjects",
                column: "PersonnelId");

            migrationBuilder.CreateIndex(
                name: "IX_SlideShows_BranchId",
                table: "SlideShows",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_BranchId",
                table: "Students",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_SubGeneralTopics_GeneralTopicId",
                table: "SubGeneralTopics",
                column: "GeneralTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectGroup_CurriculumId",
                table: "SubjectGroup",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_SubSections_SectionId",
                table: "SubSections",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubSubjectGroup_SubjectGroupId",
                table: "SubSubjectGroup",
                column: "SubjectGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_SystemSettings_BranchId",
                table: "SystemSettings",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_WeLearns_BranchId",
                table: "WeLearns",
                column: "BranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnnualDirectors");

            migrationBuilder.DropTable(
                name: "Consultants");

            migrationBuilder.DropTable(
                name: "CourseSpecifications");

            migrationBuilder.DropTable(
                name: "DirectorPositions");

            migrationBuilder.DropTable(
                name: "Generals");

            migrationBuilder.DropTable(
                name: "JobHistories");

            migrationBuilder.DropTable(
                name: "NewsPhotos");

            migrationBuilder.DropTable(
                name: "OrderSlipItems");

            migrationBuilder.DropTable(
                name: "PaymentVoucherItems");

            migrationBuilder.DropTable(
                name: "PersonnelinBranchs");

            migrationBuilder.DropTable(
                name: "ResearchAndProjects");

            migrationBuilder.DropTable(
                name: "SlideShows");

            migrationBuilder.DropTable(
                name: "SubGeneralTopics");

            migrationBuilder.DropTable(
                name: "SubSections");

            migrationBuilder.DropTable(
                name: "SubSubjectGroup");

            migrationBuilder.DropTable(
                name: "SystemSettings");

            migrationBuilder.DropTable(
                name: "WeLearns");

            migrationBuilder.DropTable(
                name: "DirectorTypes");

            migrationBuilder.DropTable(
                name: "Directors");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "CategoryCourseSpecifications");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "OrderSlips");

            migrationBuilder.DropTable(
                name: "ParcelOfBranchs");

            migrationBuilder.DropTable(
                name: "PaymentVouchers");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "GeneralTopics");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "SubjectGroup");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.DropTable(
                name: "Personnels");

            migrationBuilder.DropTable(
                name: "Curriculums");

            migrationBuilder.DropTable(
                name: "GeneralPositions");

            migrationBuilder.DropTable(
                name: "Prefixes");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Branchs");
        }
    }
}
