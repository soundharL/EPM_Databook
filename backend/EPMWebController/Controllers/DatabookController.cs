//using Microsoft.AspNetCore.Mvc;
//using EPMWebController.Services;
//using EPMWebController.Models;

//namespace EPMWebController.Controllers
//{
//    [ApiController]
//    [Route("api/databook")]
//    public class DatabookController : ControllerBase
//    {
//        private readonly DatabookExtractService _service;

//        public DatabookController(DatabookExtractService service)
//        {
//            _service = service;
//        }

//        [HttpPost("process")]
//        [Consumes("multipart/form-data")]
//        public IActionResult ProcessDatabook([FromBody] IFormFile zipFile)
//        {
//            if (zipFile == null || zipFile.Length == 0)
//            {
//                return BadRequest("Zip file missing");
//            }

//            var tempRoot = Path.Combine(Path.GetTempPath(), "Databook");
//            Directory.CreateDirectory(tempRoot);

//            //Debug.WriteLine("ProcessDatabook API HIT");

//            var zipPath = Path.Combine(tempRoot, zipFile.FileName);

//            using (var fs = new FileStream(zipPath, FileMode.Create))
//            {
//                zipFile.CopyTo(fs);
//            }

//            var outputPath = Path.Combine(tempRoot, Path.GetFileNameWithoutExtension(zipFile.FileName));

//            Directory.CreateDirectory(outputPath);

//            var result = _service.ProcessDatabook(zipPath, outputPath);

//            //return Ok(result);

//            return Ok(new { success = true, message = "Processed successfully" });

//        }
//    }
//}



using Microsoft.AspNetCore.Mvc;
using EPMWebController.Services;

namespace EPMWebController.Controllers
{
    [ApiController]
    [Route("api/databook")]
    public class DatabookController : ControllerBase
    {
        private readonly DatabookExtractService _service;

        public DatabookController(DatabookExtractService service)
        {
            _service = service;
        }

        [HttpPost("process")]
        [Consumes("multipart/form-data")]
        public IActionResult ProcessDatabook([FromForm] IFormFile zipFile)
        {
            if (zipFile == null || zipFile.Length == 0)
            {
                return BadRequest("Zip file missing");
            }

            var tempRoot = Path.Combine(Path.GetTempPath(), "Databook");
            Directory.CreateDirectory(tempRoot);

            var zipPath = Path.Combine(tempRoot, zipFile.FileName);

            using (var fs = new FileStream(zipPath, FileMode.Create))
            {
                zipFile.CopyTo(fs);
            }

            var outputPath = Path.Combine(
                tempRoot,
                Path.GetFileNameWithoutExtension(zipFile.FileName)
            );

            Directory.CreateDirectory(outputPath);

            var result = _service.ProcessDatabook(zipPath, outputPath);

            return Ok(new
            {
                success = true,
                fileName = zipFile.FileName,
                message = "Processed successfully",
                result = result
            });
        }
    }
}
