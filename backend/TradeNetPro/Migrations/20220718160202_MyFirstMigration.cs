using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradeNetPro.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Oid);
                });

            migrationBuilder.CreateTable(
                name: "Exchanges",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exchanges", x => x.Oid);
                });

            migrationBuilder.CreateTable(
                name: "Bots",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Strategy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CryptoPair = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPredefined = table.Column<bool>(type: "bit", nullable: false),
                    CustomerOid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bots", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_Bots_Customers_CustomerOid",
                        column: x => x.CustomerOid,
                        principalTable: "Customers",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CustomerOid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_Payments_Customers_CustomerOid",
                        column: x => x.CustomerOid,
                        principalTable: "Customers",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApiKeys",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PublicKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecretKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Market = table.Column<int>(type: "int", nullable: false),
                    CustomerOid = table.Column<int>(type: "int", nullable: false),
                    ExchangeOid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiKeys", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_ApiKeys_Customers_CustomerOid",
                        column: x => x.CustomerOid,
                        principalTable: "Customers",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApiKeys_Exchanges_ExchangeOid",
                        column: x => x.ExchangeOid,
                        principalTable: "Exchanges",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BotTransactions",
                columns: table => new
                {
                    Oid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TradeSize = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OrderSide = table.Column<int>(type: "int", nullable: false),
                    TradeSignal = table.Column<int>(type: "int", nullable: false),
                    KeyPairOid = table.Column<int>(type: "int", nullable: false),
                    BotOid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BotTransactions", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_BotTransactions_ApiKeys_KeyPairOid",
                        column: x => x.KeyPairOid,
                        principalTable: "ApiKeys",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BotTransactions_Bots_BotOid",
                        column: x => x.BotOid,
                        principalTable: "Bots",
                        principalColumn: "Oid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApiKeys_CustomerOid",
                table: "ApiKeys",
                column: "CustomerOid");

            migrationBuilder.CreateIndex(
                name: "IX_ApiKeys_ExchangeOid",
                table: "ApiKeys",
                column: "ExchangeOid");

            migrationBuilder.CreateIndex(
                name: "IX_Bots_CustomerOid",
                table: "Bots",
                column: "CustomerOid");

            migrationBuilder.CreateIndex(
                name: "IX_BotTransactions_BotOid",
                table: "BotTransactions",
                column: "BotOid");

            migrationBuilder.CreateIndex(
                name: "IX_BotTransactions_KeyPairOid",
                table: "BotTransactions",
                column: "KeyPairOid");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_CustomerOid",
                table: "Payments",
                column: "CustomerOid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BotTransactions");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "ApiKeys");

            migrationBuilder.DropTable(
                name: "Bots");

            migrationBuilder.DropTable(
                name: "Exchanges");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
