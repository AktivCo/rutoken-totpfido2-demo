using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RutokenTotpFido2Demo.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeStepMatched : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TotpTimeStepLogined",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TotpId = table.Column<int>(type: "integer", nullable: false),
                    TotpKeyId = table.Column<int>(type: "integer", nullable: false),
                    TimeStepMatched = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TotpTimeStepLogined", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TotpTimeStepLogined_TotpKeys_TotpKeyId",
                        column: x => x.TotpKeyId,
                        principalTable: "TotpKeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TotpTimeStepLogined_TotpKeyId",
                table: "TotpTimeStepLogined",
                column: "TotpKeyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TotpTimeStepLogined");
        }
    }
}
