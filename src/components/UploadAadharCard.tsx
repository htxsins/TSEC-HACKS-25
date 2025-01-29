"use client";

import { useState } from "react";
import { db, storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

const aadharData = [
  {
    AadharCardNo: "325695392002",
    Name: "Chinmay Milind Tullu",
    DOB: "17/07/2004",
    Address: "Santacruz",
    Photo: "tullu.jpg",
    Gender: "Male",
  },
  {
    AadharCardNo: "963561797853",
    Name: "Tanmay Sarode",
    DOB: "24/04/2005",
    Address: "Powai",
    Photo: "tanmay.jpg",
    Gender: "Male",
  },
  {
    AadharCardNo: "398985404647",
    Name: "Sushmit",
    DOB: "23/03/2004",
    Address: "Mars",
    Photo: "sushtmit.jpg",
    Gender: "Male",
  },
];

export default function UploadAadhar() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to fetch image and convert to Base64
  const getBase64 = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]); // Extract Base64 string
        };
      });
    } catch (error) {
      console.error("Error converting to Base64:", error);
      return null;
    }
  };

  const uploadData = async () => {
    setLoading(true);
    setMessage("");

    for (let person of aadharData) {
      try {
        const filePath = `${person.Photo}`;

        // Convert image to Base64 binary string
        const binaryString = await getBase64(filePath);
        if (!binaryString) throw new Error("Failed to encode image");

        // Fetch the image as a blob
        const response = await fetch(filePath);
        const blob = await response.blob();

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `AadharCard/${person.Photo}`);
        await uploadBytes(storageRef, blob);

        // Get Image URL
        const downloadURL = await getDownloadURL(storageRef);

        // Store data in Firestore
        await setDoc(doc(collection(db, "AadharCard"), person.AadharCardNo), {
          Name: person.Name,
          DOB: person.DOB,
          Address: person.Address,
          Photo: downloadURL,
          BinaryEncodedString: binaryString, // Store Base64 encoded string
          Gender: person.Gender,
        });

        console.log(`Uploaded ${person.Name} successfully!`);
      } catch (error) {
        console.error(`Error uploading ${person.Name}:`, error);
        setMessage(`Error uploading ${person.Name}`);
      }
    }

    setMessage("All data uploaded successfully!");
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button
        onClick={uploadData}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: loading ? "#aaa" : "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload Aadhar Data"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
