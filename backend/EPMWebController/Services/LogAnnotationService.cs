using System.Diagnostics;
using System.IO;
using System.Xml.Linq;
using EPMWebController.Models;

namespace EPMWebController.Services
{
    public class LogAnnotationService
    {
        //public LogAnnotationModel ReadFromToolInfo(string toolInfoPath)
        //{
        //    var model = new LogAnnotationModel();
        //    var filePath = Path.Combine(toolInfoPath, "LogAnnotation.txt");

        //    if (!File.Exists(filePath))
        //        return model;

        //    string line = File.ReadAllText(filePath);
        //    if (string.IsNullOrWhiteSpace(line))
        //        return null;
        //    var parts = line.Split(',');

        //    foreach (var part in parts)
        //    {
        //        var keyValue = part.Split(new[] { ':' }, 2);
        //        Debug.WriteLine("Key value :" +  keyValue);
        //        if (keyValue.Length != 2)
        //            continue;

        //        string key = keyValue[0].Trim().ToLower();
        //        Debug.WriteLine("Key " + key);
        //        string value = keyValue[1].Trim();

        //        if (key == "description")
        //            model.Description = value;

        //        else if (key == "name" || key == "username" || key == "user name")
        //            model.UserName = value;
        //    }
        //    return model;
        //}


        //public LogAnnotationModel ReadFromEnvironmentInfo(string toolInfoPath)
        //{
        //    var model = new LogAnnotationModel();

        //    string filePath = Path.Combine(
        //        toolInfoPath,
        //        "EnvironmentInformation.txt"
        //    );

        //    if (!File.Exists(filePath))
        //        return model; // MachineName remains empty

        //    var lines = File.ReadAllLines(filePath);

        //    foreach (var line in lines)
        //    {
        //        // Split only once (important safety improvement)
        //        var parts = line.Split(new[] { ':' }, 2);
        //        if (parts.Length != 2)
        //            continue;

        //        var key = parts[0].Trim();
        //        var value = parts[1].Trim();

        //        if (key.Equals("MachineName", System.StringComparison.OrdinalIgnoreCase))
        //        {
        //            model.MachineName = value;
        //        }
        //    }

        //    return model;
        //}

        public LogAnnotationModel ReadAllFromToolInfo(string toolInfoPath)
        {
            var model = new LogAnnotationModel();

            ReadLogAnnotation(toolInfoPath, model);
            ReadEnvironmentInfo(toolInfoPath, model);
            ReadVersionInfo(toolInfoPath, model);

            return model;
        }

        // ---------------- LOG ANNOTATION ----------------
        private void ReadLogAnnotation(string toolInfoPath, LogAnnotationModel model)
        {
            var filePath = Path.Combine(toolInfoPath, "LogAnnotation.txt");

            if (!File.Exists(filePath))
                return;

            var line = File.ReadAllText(filePath);
            if (string.IsNullOrWhiteSpace(line))
                return;

            var parts = line.Split(',');

            foreach (var part in parts)
            {
                var keyValue = part.Split(new[] { ':' }, 2);
                if (keyValue.Length != 2)
                    continue;

                string key = keyValue[0].Trim().ToLower();
                string value = keyValue[1].Trim();

                if (key == "description")
                    model.Description = value;
                else if (key == "user name" || key == "username" || key == "name")
                    model.UserName = value;
            }
        }

        // ---------------- ENVIRONMENT INFO ----------------
        private void ReadEnvironmentInfo(string toolInfoPath, LogAnnotationModel model)
        {
            var filePath = Path.Combine(toolInfoPath, "EnvironmentInformation.txt");

            if (!File.Exists(filePath))
                return;

            var lines = File.ReadAllLines(filePath);

            foreach (var line in lines)
            {
                var parts = line.Split(new[] { ':' }, 2);
                if (parts.Length != 2)
                    continue;

                if (parts[0].Trim().Equals("MachineName", System.StringComparison.OrdinalIgnoreCase))
                {
                    model.MachineName = parts[1].Trim();
                }
            }
        }

        // ---------------- VERSION FILE ----------------
        private void ReadVersionInfo(string toolInfoPath, LogAnnotationModel model)
        {
            var filePath = Path.Combine(toolInfoPath, "VersionFile.csv");

            if (!File.Exists(filePath))
                return;

            var lines = File.ReadAllLines(filePath);

            foreach (var line in lines)
            {
                var parts = line.Split(',');

                if (parts.Length != 2)
                    continue;

                var key = parts[0].Trim();
                var value = parts[1].Trim();

                switch (key)
                {
                    case "EquipmentNumber":
                        model.EquipmentNumber = value;
                        break;

                    case "PLC Version":
                        model.PlcVersion = value;
                        break;

                    case "PLC Safety Version":
                        model.PlcSafetyVersion = value;
                        break;
                }
            }
        }
    }
}
