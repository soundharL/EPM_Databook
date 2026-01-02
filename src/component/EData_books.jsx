import React, { useRef, useState } from "react";
import "./UploadDatabookButton.css";
import axios from "axios";

function DatabookUpload() {
  const zipInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const [zipFile, setZipFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // "zip" | "folder"

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------- ZIP --------
  const handleZipSelect = () => {
    folderInputRef.current.value = null;
    setFolderFiles([]);
    setSelectedType("zip");
    zipInputRef.current.click();
  };

  const handleZipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setZipFile(file);
    }
  };

  // -------- FOLDER --------
  const handleFolderSelect = () => {
    zipInputRef.current.value = null;
    setZipFile(null);
    setSelectedType("folder");
    folderInputRef.current.click();
  };

  const handleFolderChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFolderFiles(files);
    }
  };

  // -------- UPLOAD --------
  const uploadDatabook = async () => {
    if (selectedType === "zip" && !zipFile) {
      alert("Please select a zip file");
      return;
    }

    if (selectedType === "folder" && folderFiles.length === 0) {
      alert("Please select a folder");
      return;
    }

    const formData = new FormData();

    if (selectedType === "zip") {
      formData.append("zipFile", zipFile);
    }

    if (selectedType === "folder") {
      folderFiles.forEach((file) => {
        formData.append("folderFiles", file);
      });
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5285/api/databook/process",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "API error");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Databook Processor</h2>

      {/* Upload Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        <button className="app-btn" onClick={handleZipSelect}>
          📦 Upload ZIP
        </button>

        <button className="app-btn" onClick={handleFolderSelect}>
          📁 Upload Folder
        </button>
      </div>

      {/* Hidden Inputs */}
      <input
        type="file"
        accept=".zip"
        ref={zipInputRef}
        style={{ display: "none" }}
        onChange={handleZipChange}
      />

      <input
        type="file"
        ref={folderInputRef}
        style={{ display: "none" }}
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFolderChange}
      />

      {/* Selected Info */}
      <div style={{ marginTop: 15 }}>
        {selectedType === "zip" && zipFile && (
          <p>✅ ZIP Selected: <b>{zipFile.name}</b></p>
        )}

        {selectedType === "folder" && folderFiles.length > 0 && (
          <p>
            ✅ Folder Selected: <b>{folderFiles[0].webkitRelativePath.split("/")[0]}</b>
            <br />
            📄 Files: {folderFiles.length}
          </p>
        )}
      </div>

      {/* Process Button */}
      <button
        onClick={uploadDatabook}
        disabled={loading || !selectedType}
        style={{ marginTop: 10 }}
      >
        {loading ? "Processing..." : "Process Databook"}
      </button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Status: {result.success ? "Success" : "Failed"}</h3>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default DatabookUpload;
