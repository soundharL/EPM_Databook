import React, { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import "./UploadDatabookButton.css";

const UploadDatabookButton = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // pending, success, error
  const loadingBarRef = useRef(null);

  let pendingCount = 0; // Track how many times "Pending" is received

  const handleManualUpload = async () => {
    const filePath =
      "C:\\Users\\asm2280\\Downloads\\wetransfer_elat-zip_2025-12-16_0637\\Databook2025-01-20T09-45-44.zip";

    setLoading(true);
    setStatusType("pending");
    setStatusMessage("⏳ Starting extraction...");
    loadingBarRef.current?.continuousStart();

    try {
      const res = await fetch("http://localhost:5081/api/receiveversion/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath }),
      });

      if (!res.ok) throw new Error("API Error");
      checkExtractStatus();
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage("❌ Upload failed! Check API.");
      setLoading(false);
      loadingBarRef.current?.complete();
    }
  };

  const checkExtractStatus = () => {
    const interval = setInterval(async () => {
      const response = await fetch("http://localhost:5081/api/receiveversion/status");
      const data = await response.json();
      console.log("API Status →", data.status);

      if (data.status === "Pending") {
        pendingCount++;

        // Update loading bar progress
        const progressValue = Math.min(pendingCount * 3, 90); // go till 90%
        loadingBarRef.current?.set(progressValue);

        setStatusType("pending");
        setStatusMessage(`⏳ Extracting... Please wait (${progressValue}%)`);
      }

      if (data.status === "Extract Completed!") {
        clearInterval(interval);
        loadingBarRef.current?.complete();
        setStatusType("success");
        setStatusMessage("🎉 Extract Completed Successfully!");
        setLoading(false);
      }

      if (data.status && data.status.includes("Error")) {
        clearInterval(interval);
        loadingBarRef.current?.complete();
        setStatusType("error");
        setStatusMessage("❌ Extract Failed! Check API or Zip file.");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <LoadingBar color="#16a34a" ref={loadingBarRef} height={10} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="app-btn" onClick={handleManualUpload} disabled={loading}>
          {loading ? "⏳ Processing please wait..." : "+ Upload Databook"}
        </button>
      </div>

      {statusMessage && (
        <p className={`status-text ${statusType}`}>
          {statusType === "pending" ? (
            <>
              <span className="rotate-icon">⏳</span> {statusMessage}
            </>
          ) : (
            statusMessage
          )}
        </p>
      )}
    </div>
  );
};

export default UploadDatabookButton;
