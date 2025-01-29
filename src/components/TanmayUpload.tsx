// pages/index.tsx
import React, { useState } from "react";
import { AnalyzeResult } from "@/constants/types/personTypes";
import { uploadImage } from "../utils/api";

const TanmayUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null); // Reset any errors
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please upload an image.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await uploadImage(selectedFile);
      console.log(data);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to render coordinates
  const renderCoordinates = (coordinates: Array<{ x: number; y: number; width: number; height: number }>) => {
    return coordinates.map((coord, index) => (
      <div key={index} className="mb-2">
        <p><strong>Eye {index + 1}:</strong></p>
        <p>X: {coord.x}, Y: {coord.y}, Width: {coord.width}, Height: {coord.height}</p>
      </div>
    ));
  };

  const renderCoordinatesofFace = (coordinates: Array<{ x: number; y: number; width: number; height: number }>) => {
    return coordinates.map((coord, index) => (
      <div key={index} className="mb-2">
        <p><strong>Face</strong></p>
        <p>X: {coord.x}, Y: {coord.y}, Width: {coord.width}, Height: {coord.height}</p>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload an Image for Analysis</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? "Analyzing..." : "Analyze Image"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Analysis Result</h2>
          <p><strong>Gender:</strong> {result.gender}</p>
          <p><strong>Race:</strong> {result.race}</p>
          <p><strong>Age:</strong> {result.age}</p>
          <p><strong>Emotion:</strong> {result.emotion}</p>
          <p><strong>Skin Color:</strong> {result.skin_color}</p>
          <p><strong>Eye Color:</strong> {result.eye_color}</p>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Face Coordinates:</h3>
            {result.face_coordinates.length > 0
              ? renderCoordinatesofFace(result.face_coordinates)
              : <p>No face coordinates detected.</p>}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Eye Coordinates:</h3>
            {result.eye_coordinates.length > 0
              ? renderCoordinates(result.eye_coordinates)
              : <p>No eye coordinates detected.</p>}
          </div>

          
        </div>
      )}
    </div>
  );
};

export default TanmayUploadPage;
