using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Xml.Linq;
using EPMWebController.Models;

namespace EPMWebController.Services
{
    public class DatabookExtractService
    {
        private readonly ZipLoadService _zipLoadService;
        private readonly LogAnnotationService _logAnnotationService;

        public DatabookExtractService(
            ZipLoadService zipLoadService,
            LogAnnotationService logAnnotationService)
        {
            _zipLoadService = zipLoadService;
            _logAnnotationService = logAnnotationService;
        }

        public LoadResultModel ProcessDatabook(string zipFilePath, string outputPath)
        {
            try
            {
                Debug.WriteLine("Zipfile path : " + zipFilePath + "  outuputPath : " + outputPath);
                if (!File.Exists(zipFilePath))
                    return Fail("Databook zip not found");
                var extractResult = _zipLoadService.ExtractZip(zipFilePath, Path.Combine(outputPath, "Temp"));
                if (!extractResult.Success)
                    return Fail(extractResult.Message);

                var tempDir = new DirectoryInfo(Path.Combine(outputPath, "Temp"));

                // 2️⃣ Detect structure
                if (tempDir.GetDirectories().Length == 1)
                {
                    ProcessFolderBasedDatabook(tempDir.GetDirectories()[0], outputPath);
                }
                else
                {
                    ProcessZipBasedDatabook(tempDir, outputPath);
                }

                Debug.WriteLine("Output path " + outputPath);
                Cleanup(tempDir.FullName);

                var databookDuration = GetDatabookStartEndTime(outputPath);

                var logAnnotation = _logAnnotationService.ReadAllFromToolInfo(Path.Combine(outputPath, "Tool Info"));

                var uiInfo = ReadUiVersion(outputPath);

                Debug.WriteLine(" UiInfo " + uiInfo.ToolType + uiInfo.SoftwareVersion);


                return LoadResultModel.Ok(logAnnotation, databookDuration, uiInfo);
            }
            catch (Exception ex)
            {
                return Fail(ex.Message);
            }
        }

        private DatabookDurationModel GetDatabookStartEndTime(string outputPath)
        {
            Debug.WriteLine("Output path :  " + outputPath);
            string dataLogPath = Path.Combine(outputPath, "DataLog");  //I changed to "DataLog" to "Logs","DataLog"
            Debug.WriteLine("Data logpath :  " + dataLogPath);

            if (!Directory.Exists(dataLogPath))
            {
                return new DatabookDurationModel
                {
                    StartTime = "NA",
                    EndTime = "NA"
                };
            }

            var times = new List<DateTime>();

            foreach (var file in Directory.GetFiles(dataLogPath, "*.txt"))
            {
                string name = Path.GetFileNameWithoutExtension(file);
                Debug.WriteLine("File name :" + name);

                if (DateTime.TryParseExact(name, "yyyy-MM-ddTHH-mm-ss",
                    System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None,
                    out DateTime parsed))
                {
                    times.Add(parsed);
                }
            }

            Debug.WriteLine("Times :" + times);
            Debug.WriteLine("StartTimes : " + times.Min().ToString("yyyy-MM-dd HH:mm:ss"));
            Debug.WriteLine("End times : " + times.Max().ToString("yyyy-MM-dd HH:mm:ss"));
            if (!times.Any())
            {
                return new DatabookDurationModel
                {
                    StartTime = "NA",
                    EndTime = "NA"
                };
            }

            return new DatabookDurationModel
            {
                StartTime = times.Min().ToString("yyyy-MM-dd HH:mm:ss"),
                EndTime = times.Max().ToString("yyyy-MM-dd HH:mm:ss")
            };
        }

        public UiVersionInfoModel ReadUiVersion(string mFilePath)
        {
            string uiName = "PTO.UI.config";
            string path = Path.Combine(
                mFilePath,
                "ProgramData",
                "PTO.UI",
                uiName
            );

            // Handle \\?\ prefix if exists
            if (path.StartsWith(@"\\?\"))
                path = path.Substring(4);

            if (!File.Exists(path))
            {
                return new UiVersionInfoModel
                {
                    ToolType = "NA",
                    SoftwareVersion = "NA"
                };
            }

            XDocument doc = XDocument.Load(path);

            string toolType =
                doc.Descendants("frameSettings")
                   .Descendants("add")
                   .Where(e => (string)e.Attribute("key") == "WindowTitle")
                   .Select(e => (string)e.Attribute("value"))
                   .FirstOrDefault() ?? "NA";

            string swVer =
                doc.Descendants("menuSettings")
                   .Descendants("add")
                   .Where(e => (string)e.Attribute("key") == "AuxiliaryPaneTitle")
                   .Select(e => (string)e.Attribute("value"))
                   .FirstOrDefault() ?? "NA";

            return new UiVersionInfoModel
            {
                ToolType = toolType,
                SoftwareVersion = swVer
            };
        }

        private void ProcessFolderBasedDatabook(DirectoryInfo root, string outputPath)
        {
            Extract(root, "PjHistory.zip", outputPath);
            Extract(root, "ProgramData.zip", outputPath);
            Extract(root, "AlarmHistoryFile.zip", outputPath);
            Extract(root, "JobHistory.zip", outputPath);
            Extract(root, "UILog.zip", outputPath);
            Extract(root, "SecsIDsFile.zip", outputPath);
            Extract(root, "EQPExport.zip", outputPath);
            Extract(root, "Recipes.zip", outputPath);
            Extract(root, "VersionFile.zip", Path.Combine(outputPath, "Tool Info"));

            HandleLogPackages(root, outputPath);
        }

        private void ProcessZipBasedDatabook(DirectoryInfo tempDir, string outputPath)
        {
            Extract(tempDir, "PjHistory.zip", outputPath);
            Extract(tempDir, "ProgramData.zip", outputPath);
            Extract(tempDir, "AlarmHistoryFile.zip", outputPath);
            Extract(tempDir, "JobHistory.zip", outputPath);
            Extract(tempDir, "UILog.zip", outputPath);
            Extract(tempDir, "SecsIDsFile.zip", outputPath);
            Extract(tempDir, "EQPExport.zip", outputPath);
            Extract(tempDir, "Recipes.zip", outputPath);
            Extract(tempDir, "VersionFile.zip", Path.Combine(outputPath,"Tool Info"));

            HandleLogPackages(tempDir, outputPath);
        }

        //private void HandleLogPackages(DirectoryInfo baseDir, string outputPath)
        //{
        //    var documents = Path.Combine(
        //        Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
        //        "Documents", "eLAT", "Temp");

        //    Directory.CreateDirectory(documents);

        //    var logZip = baseDir.GetFiles("LogPackages.zip", SearchOption.AllDirectories).FirstOrDefault();
        //    if (logZip == null)
        //        return;

        //    _zipLoadService.ExtractZip(logZip.FullName, documents);

        //    var logsDir = Directory.EnumerateDirectories(documents, "*Logs", SearchOption.AllDirectories).FirstOrDefault();
        //    if (logsDir != null)
        //        CopyDirectory(logsDir, outputPath);

        //    CopyToolInfoFiles(documents, outputPath);
        //}

        private void HandleLogPackages(DirectoryInfo baseDir, string outputPath)
        {
            var documents = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                "Documents", "eLAT", "Temp");

            Directory.CreateDirectory(documents);

            // Find LogPackages.zip
            var logZip = baseDir.GetFiles("LogPackages.zip", SearchOption.AllDirectories)
                                 .FirstOrDefault();
            if (logZip == null)
                return;

            // Extract LogPackages.zip
            _zipLoadService.ExtractZip(logZip.FullName, documents);

            //  Copy Logs folder
            var logsDir = Directory.EnumerateDirectories(
                documents, "*Logs", SearchOption.AllDirectories)
                .FirstOrDefault();

            if (logsDir != null)
            {
                CopyDirectory(logsDir, outputPath);
            }

            //  Copy DatabookAnalysis folder
            var dbaDir = Directory.EnumerateDirectories(
                documents, "*DatabookAnalysis", SearchOption.AllDirectories)
                .FirstOrDefault();

            if (dbaDir != null)
            {
                CopyDirectory(dbaDir, outputPath);
            }

            //Copy Tool Info files
            CopyToolInfoFiles(documents, outputPath);
        }


        private void CopyToolInfoFiles(string source, string outputPath)
        {
            string toolInfo = Path.Combine(outputPath, "Tool Info");
            Directory.CreateDirectory(toolInfo);

            CopyIfExists(source, "LogAnnotation.txt", toolInfo);
            CopyIfExists(source, "EnvironmentInformation.txt", toolInfo);
        }

        private void Extract(DirectoryInfo dir, string zipName, string outputPath)
        {
            //var zip = dir.GetFiles(zipName, SearchOption.AllDirectories).FirstOrDefault();
            //if (zip != null)
            //    _zipLoadService.ExtractZip(zip.FullName, Path.Combine(outputPath, Path.GetFileNameWithoutExtension(zipName)));
            var zip = dir.GetFiles(zipName, SearchOption.AllDirectories)
                 .FirstOrDefault();

            if (zip == null)
                return;

            // ✅ Special handling for VersionFile.zip
            if (zipName.Equals("VersionFile.zip", StringComparison.OrdinalIgnoreCase))
            {
                // Extract directly into Tool Info
                _zipLoadService.ExtractZip(zip.FullName, outputPath);
            }
            else
            {
                // Default behavior (create folder)
                _zipLoadService.ExtractZip(
                    zip.FullName,
                    Path.Combine(outputPath, Path.GetFileNameWithoutExtension(zipName))
                );
            }
        }

        private void CopyDirectory(string source, string destination)
        {
            foreach (var file in Directory.GetFiles(source, "*", SearchOption.AllDirectories))
            {
                var dest = file.Replace(source, destination);
                Directory.CreateDirectory(Path.GetDirectoryName(dest));
                File.Copy(file, dest, true);
            }
        }

        private void CopyIfExists(string sourceDir, string fileName, string targetDir)
        {
            var file = Path.Combine(sourceDir, fileName);
            if (File.Exists(file))
                File.Copy(file, Path.Combine(targetDir, fileName), true);
        }

        private void Cleanup(string path)
        {
            if (Directory.Exists(path))
                Directory.Delete(path, true);
        }

        private LoadResultModel Fail(string message)
        {
            return new LoadResultModel
            {
                Success = false,
                Message = message
            };
        }
    }
}
