"use client";
import { useState } from "react";
import { Button } from "@/components/Form";

export default function ImageUpload({ strainId, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("alt", file.name);
    formData.append("isPrimary", "false");

    try {
      const response = await fetch(`/api/strains/${strainId}/images`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const image = await response.json();
        onUpload?.(image);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragOver
          ? "border-green-500 bg-green-900/20"
          : "border-green-700 hover:border-green-600"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <div className="space-y-4">
        <div className="text-4xl">📸</div>
        <div>
          <p className="text-green-300 font-medium">Upload strain image</p>
          <p className="text-sm text-green-400">Drag & drop or click to select</p>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label htmlFor="image-upload">
            <Button
              type="button"
              disabled={uploading}
              className="cursor-pointer"
            >
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </label>
        </div>
        <p className="text-xs text-green-500">
          JPG, PNG, WebP up to 5MB
        </p>
      </div>
    </div>
  );
}
