import { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = () => {
    // Programmatically trigger file selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Set the accepted file types if needed
    input.onchange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
    input.click();
  };

  const handleFileUpload = () => {
    // Handle file upload logic here (e.g., send the file to a server)
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // You can perform additional actions like sending the file to a server using fetch or another API
    }
  };

  return (
    <div>
      <button onClick={handleFileSelect}>Select File</button>
      <br />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
