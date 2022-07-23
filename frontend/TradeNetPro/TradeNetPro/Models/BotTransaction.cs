using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class BotTransaction
    {
        [Key]
        public int Oid { get; set; }
        public string TransactionDate { get; set; }
        public decimal Price { get; set; }
        public decimal TradeSize { get; set; }
        public decimal Balance { get; set; }
        public int OrderSide { get; set; }
        public int TradeSignal { get; set; }
        public ApiKey KeyPair { get; set; }
    }
}
