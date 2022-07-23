using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradeNetPro.Migrations
{
    public partial class updatefields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bots_Customers_CustomerOid",
                table: "Bots");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerOid",
                table: "Bots",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Bots_Customers_CustomerOid",
                table: "Bots",
                column: "CustomerOid",
                principalTable: "Customers",
                principalColumn: "Oid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bots_Customers_CustomerOid",
                table: "Bots");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerOid",
                table: "Bots",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bots_Customers_CustomerOid",
                table: "Bots",
                column: "CustomerOid",
                principalTable: "Customers",
                principalColumn: "Oid",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
