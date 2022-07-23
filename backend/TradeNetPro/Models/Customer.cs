using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class Customer
    {
        [Key]
        public int Oid { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<Payment>? Payments { get; set; }
        public List<Bot>? Bots { get; set; }
        public List<ApiKey>? ApiKeys { get; set; }
    }
}
