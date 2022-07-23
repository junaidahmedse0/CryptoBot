using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TradeNetPro.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TradeNetPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly TradingDbContext _context;

        public AccountController(IConfiguration config, TradingDbContext context)
        {
            _configuration = config;
            _context = context;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(Customer _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.Password != null)
            {
                var user = _context.Customers.FirstOrDefault(u => u.Email == _userData.Email);

                if (user == null)
                {

                    _context.Customers.Add(_userData);
                    _context.SaveChanges();
                    return Ok(new { status = "ok", message = "Successfully Registered" });
                }
                else
                {
                    
                    return BadRequest(new { status = "exist", message = "User Already Exist" });
                }
            }
            else
            {
                return BadRequest(new { status = "error", message = "Something wrong" });
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(Customer _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.Password != null)
            {
                var user = await GetUser(_userData.Email, _userData.Password);

                if (user != null)
                {
                   

                    return Ok(new { status = "ok", message = "Successfully Logged In", accessToken = GetToken(user), name = user.Name,email=user.Email,userId=user.Oid });
                }
                else
                {
                    return BadRequest(new { status="invalid", message = "Invalid Credentials" });
                }
            }
            else
            {
                return BadRequest();
            }
        }
        private async Task<Customer> GetUser(string email, string password)
        {
            return await _context.Customers.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
        private string GetToken(Customer user)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("CustomerId", user.Oid.ToString()),
                        new Claim("Name", user.Name),
                        new Claim("Email", user.Email)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
