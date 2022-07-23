using System.ComponentModel.DataAnnotations;

namespace TradeNetPro.Models
{
    public class Payment
    {
        [Key]
        public int Oid { get; set; }
        public string PaymentDate { get; set; }
        public decimal Amount { get; set; }

        public Customer Customer { get; set; }
    }
}
