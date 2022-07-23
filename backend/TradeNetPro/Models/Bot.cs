using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class Bot
    {
        [Key]
        public int Oid { get; set; }
        public string Strategy { get; set; }
        public string CryptoPair { get; set; }
        public bool IsPredefined { get; set; }
        public int? CustomerOid { get; set; }
        public Customer? Customer { get; set; }

        public List<BotTransaction>? BotTransactions { get; set; }
    }
}
