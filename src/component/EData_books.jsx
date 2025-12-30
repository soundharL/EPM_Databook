import React, { useState } from "react";

const UploadDatabookButton = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const filePath = "C:\\Users\\asm2280\\Downloads\\wetransfer_elat-zip_2025-12-16_0637\\Databook2025-10-09T05-22-55.zip";

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5081/api/zippath", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: filePath }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const result = await response.json();
      console.log("API Response:", result);

      alert("📦 Databook Uploaded Successfully!");
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("❌ Upload failed! Please check your API or file path.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
      <button
        className="app-btn"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "+ Upload Databook"}
      </button>
    </div>
  );
};

export default UploadDatabookButton;
