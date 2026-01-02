import React, { useRef, useState } from "react";
import "./UploadDatabookButton.css";

const UploadDatabookButton = () => {
  const zipInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  return (
    <div style={{ padding: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
      
      {/* ZIP Upload */}
      <button className="app-btn" onClick={() => zipInputRef.current.click()}>
        📦 Upload Databook ZIP
      </button>

      {/* Folder Upload */}
      <button className="app-btn" onClick={() => folderInputRef.current.click()}>
        📁 Upload Databook Folder
      </button>

      {fileName && <span>{fileName}</span>}

      {/* ZIP input */}
      <input
        type="file"
        ref={zipInputRef}
        accept=".zip"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setFileName(file.name);
        }}
      />

      {/* Folder input */}
      <input
        type="file"
        ref={folderInputRef}
        webkitdirectory="true"
        directory="true"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFileName("Folder selected");
          }
        }}
      />
    </div>
  );
};

export default UploadDatabookButton;
