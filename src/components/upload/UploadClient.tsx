"use client";

import { handleUploadFile } from "@/lib/actions/user.actions";
import React, { useState } from "react";

export default function UploadClient({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    setUploading(true);
    const result = await handleUploadFile(file, userId);

    if (result.success) {
      setUploadedUrl(result.url);
    } else {
      alert("Upload failed: " + result.message);
    }
    setUploading(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Business Media</h2>

      <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-600">File uploaded successfully!</p>
          {uploadedUrl.includes("mp4") ? (
            <video src={uploadedUrl} controls className="w-full mt-2"></video>
          ) : (
            <img src={uploadedUrl} alt="Uploaded" className="w-full mt-2" />
          )}
        </div>
      )}
    </div>
  );
};

