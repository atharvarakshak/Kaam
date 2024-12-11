import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFile } from '../utils/fileValidation';
import axios from 'axios';
import { Upload } from 'lucide-react';


const API_BASE_URL = "https://a04a-103-225-13-3.ngrok-free.app";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/api/upload', formData);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const UploadSection = ({ onUploadSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validation = validateFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadImage(file);
      onUploadSuccess(result);
    } catch (uploadError) {
      setError(uploadError.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center p-8 border-2 ${
        isDragActive ? 'border-blue-500' : 'border-gray-400'
      } border-dashed rounded-xl text-center cursor-pointer transition-all bg-white`}
    >
      <input {...getInputProps()} />
      <Upload 
        className={`h-20 w-20 mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-500'} transition-colors`}
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {isDragActive ? 'Drop your image here' : 'Drag and drop an image or click to select'}
      </h2>
      <p className="text-sm text-gray-500 mt-2">Supports JPEG, PNG, and GIF (Max 5MB)</p>

      {loading && (
        <div className="mt-4">
          <div className="animate-spin h-6 w-6 border-t-2 border-blue-500 rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadSection;
