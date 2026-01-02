namespace EPMWebController.Models
{
    public class LoadResultModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public string ExtractedPath { get; set; }
        // 🔹 NEW: LogAnnotation data
        public LogAnnotationModel LogAnnotation { get; set; }

        public DatabookDurationModel DatabookDuration { get; set; }  //added

        public UiVersionInfoModel UiVersionInfo { get; set; }

        public static LoadResultModel Ok(LogAnnotationModel annotation, DatabookDurationModel duration, UiVersionInfoModel version)
        {
            return new LoadResultModel
            {
                Success = true,
                LogAnnotation = annotation,
                DatabookDuration = duration,  // added
                UiVersionInfo = version
            };
        }

        public static LoadResultModel Fail(string message)
        {
            return new LoadResultModel
            {
                Success = false,
                Message = message
            };
        }
    }
}
