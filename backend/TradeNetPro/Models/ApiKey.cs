using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class ApiKey
    {
        [Key]
        public int Oid { get; set; }
        public string PublicKey { get; set; }
        public string SecretKey { get; set; }
        public int Market { get; set; }

        public Customer Customer { get; set; }

        public Exchange Exchange { get; set; }

        public List<BotTransaction> BotTransactions { get; set; }
    }
}
