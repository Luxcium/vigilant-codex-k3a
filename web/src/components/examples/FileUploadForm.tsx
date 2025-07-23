'use client';
import { useState } from 'react';

export default function FileUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ filename: string; size: number } | null>(null);

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    setUploadResult(null);
    try {
      const { uploadImage } = await import('@/lib/enhanced-actions');
      const result = await uploadImage(formData);
      setUploadResult(result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>
      <form action={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Choose Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            disabled={isUploading}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {uploadResult && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          <p>
            <strong>Upload successful!</strong>
          </p>
          <p>Filename: {uploadResult.filename}</p>
          <p>Size: {(uploadResult.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}
