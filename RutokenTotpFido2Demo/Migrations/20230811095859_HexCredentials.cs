using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RutokenTotpFido2Demo.Migrations
{
    /// <inheritdoc />
    public partial class HexCredentials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AaGuid",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "CredType",
                table: "FidoKeys");

            migrationBuilder.AlterColumn<string>(
                name: "PublicKey",
                table: "FidoKeys",
                type: "text",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "bytea");

            migrationBuilder.AlterColumn<string>(
                name: "CredentialId",
                table: "FidoKeys",
                type: "text",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "bytea");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "PublicKey",
                table: "FidoKeys",
                type: "bytea",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<byte[]>(
                name: "CredentialId",
                table: "FidoKeys",
                type: "bytea",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "AaGuid",
                table: "FidoKeys",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CredType",
                table: "FidoKeys",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
