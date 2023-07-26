using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RutokenTotpFido2Demo.Migrations
{
    /// <inheritdoc />
    public partial class TotpParams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HashMode",
                table: "TotpKeys",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Secret",
                table: "TotpKeys",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TimeStep",
                table: "TotpKeys",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HashMode",
                table: "TotpKeys");

            migrationBuilder.DropColumn(
                name: "Secret",
                table: "TotpKeys");

            migrationBuilder.DropColumn(
                name: "TimeStep",
                table: "TotpKeys");
        }
    }
}
