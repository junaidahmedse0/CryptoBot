using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradeNetPro.Dto;
using TradeNetPro.Models;


namespace TradeNetPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BotsController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly TradingDbContext _context;
        public BotsController(IConfiguration config, TradingDbContext context)
        {
            _configuration = config;
            _context = context;
        }
        // GET: api/<BotsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<BotsController>/5
        [HttpGet]
        [Route("getbot")]
        public async Task<IActionResult> GetBot(int id)
        {
            if (id == null || _context.Bots == null)
            {
                return NotFound();
            }

            var bot = await _context.Bots
                .FirstOrDefaultAsync(m => m.CustomerOid == id);
            if (bot == null)
            {
                return NotFound();
            }

            return Ok(bot);
        }

        // POST api/<BotsController>
        [HttpPost]
        [Route("postbot")]
        public async Task<IActionResult> PostBot([FromBody] Bot bot)
        {
            if (bot != null)
            {
               var bt =_context.Bots.FirstOrDefault(x=>x.CustomerOid==bot.CustomerOid);
                if (bt != null)
                {
                    bt.Strategy = bot.Strategy;
                    bt.CryptoPair = bot.CryptoPair;
                    bt.IsPredefined = bot.IsPredefined;
                    _context.Bots.Update(bt);
                }
                else
                {
                    _context.Add(bot);
                }
                
                await _context.SaveChangesAsync();
            }
           
           return Ok();

        }

      
    }
}
