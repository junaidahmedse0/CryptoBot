using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class Exchange
    {
        [Key]
        public int Oid { get; set; }
        public string Name { get; set; }

        public List<ApiKey> ApiKeys { get; set; }
    }
}
