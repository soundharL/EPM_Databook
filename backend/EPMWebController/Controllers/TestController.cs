using Microsoft.AspNetCore.Mvc;

namespace EPMWebController.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("ASP.NET Core Web API is working!");
        }
    }
}
