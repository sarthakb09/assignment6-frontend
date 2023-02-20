import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [message, setMessage] = useState("");

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setFilesList(response.data);
      setFile(null);
      setMessage("Upload success.");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  const handleFileDownload = (file) => {
    const url = file.url; // Assuming the server returns the URL of the file
    window.open(url, "_blank");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>File Uploader</h1>
          <input type="file" onChange={handleFileInputChange} />
          <button onClick={handleFileUpload}>Upload</button>
          {Array.isArray(filesList) && filesList.length > 0 && (
            <div>
              <h3>Uploaded Files:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Last Modified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filesList.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{file.size}</td>
                      <td>{file.lastModified}</td>
                      <td>
                        <button onClick={() => handleFileDownload(file)}>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button onClick={() => logout()}>Logout</button>
          <div item xs={12}>
        {message && (
          <div>
            <h3>{message}</h3>
          </div>
        )}
      </div>
        </div>
      ) : (
        <div>
          <h1>Please log in to access the file uploader</h1>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
