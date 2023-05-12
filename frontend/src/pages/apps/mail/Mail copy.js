import React, { useState } from 'react';
import axios from 'axios';

function FileUploadDownload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error uploading file: ', error);
    });
  };

  const handleFileDownload = () => {
    axios.get('/file/download', {
      responseType: 'blob'
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.txt');
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      console.error('Error downloading file: ', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={handleFileDownload}>Download</button>
    </div>
  );
}

export default FileUploadDownload;