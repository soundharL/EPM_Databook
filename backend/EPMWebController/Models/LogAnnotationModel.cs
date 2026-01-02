namespace EPMWebController.Models
{
    public class LogAnnotationModel
    {
        public string Description { get; set; }
        public string UserName { get; set; }

        public string MachineName { get; set; }

        public string EquipmentNumber { get; set; }
        public string PlcVersion { get; set; }
        public string PlcSafetyVersion { get; set; }

        public LogAnnotationModel()
        {
            Description = string.Empty;
            UserName = string.Empty;
            MachineName = string.Empty;
            EquipmentNumber = string.Empty;
            PlcVersion = string.Empty;
            PlcSafetyVersion = string.Empty;
        }
    }
}
