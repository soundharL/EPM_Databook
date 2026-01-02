using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EPMWebController.Models;

namespace EPMWebController.Services
{
    public class ZipLoadService
    {
        public LoadResultModel ExtractZip(string zipFilePath, string targetDirectory)
        {
            Debug.WriteLine(" Extract path : "+ zipFilePath +  targetDirectory);
            if (!File.Exists(zipFilePath))
            {
                return new LoadResultModel
                {
                    Success = false,
                    Message = "Zip file not found"
                };
            }

            try
            {
                if (Directory.Exists(targetDirectory))
                {
                    Directory.Delete(targetDirectory, true);
                }
                Directory.CreateDirectory(targetDirectory);

                Debug.WriteLine("Direct created " + targetDirectory);

                ZipFile.ExtractToDirectory(zipFilePath, targetDirectory);

                return new LoadResultModel
                {
                    Success = true,
                    Message = "ZIP extracted Successfully",
                    ExtractedPath = targetDirectory
                };
            }
            catch (Exception ex) {
                return new LoadResultModel
                {

                    Success = false,
                    Message = ex.Message
                };
            }
        }
    }
}
