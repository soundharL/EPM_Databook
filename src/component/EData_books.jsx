import React, { useRef, useState } from "react";
import "./UploadDatabookButton.css";

const UploadDatabookButton = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(""); // State to store file name

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update state with file name
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <button className="app-btn" onClick={handleButtonClick}>
        + Upload Databook
      </button>
      {fileName && <span>{fileName}</span>} {/* Display file name next to button */}
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadDatabookButton;
