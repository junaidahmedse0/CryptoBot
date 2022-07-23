using Microsoft.EntityFrameworkCore;

namespace TradeNetPro.Models
{
    public partial class TradingDbContext:DbContext
    {
        public TradingDbContext()
        {
        }

        public TradingDbContext(DbContextOptions<TradingDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<ApiKey>? ApiKeys { get; set; }
        public virtual DbSet<Bot>? Bots { get; set; }

        public virtual DbSet<BotTransaction>? BotTransactions { get; set; }

        public virtual DbSet<Customer>? Customers { get; set; }
        public virtual DbSet<Exchange>? Exchanges { get; set; }

        public virtual DbSet<Payment>? Payments { get; set; }

      
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
