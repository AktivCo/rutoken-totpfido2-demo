using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RutokenTotpFido2Demo.Migrations
{
    /// <inheritdoc />
    public partial class AddFido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<byte[]>(
                name: "CredentialId",
                table: "FidoKeys",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogin",
                table: "FidoKeys",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<byte[]>(
                name: "PublicKey",
                table: "FidoKeys",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<DateTime>(
                name: "RegDate",
                table: "FidoKeys",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "SignatureCounter",
                table: "FidoKeys",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AaGuid",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "CredType",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "CredentialId",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "LastLogin",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "PublicKey",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "RegDate",
                table: "FidoKeys");

            migrationBuilder.DropColumn(
                name: "SignatureCounter",
                table: "FidoKeys");
        }
    }
}
