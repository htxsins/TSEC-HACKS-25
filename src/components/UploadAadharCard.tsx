import { useState } from "react";
import bcrypt from "bcryptjs";
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

  // Function to hash Aadhaar data
  const hashData = (data) => {
    return bcrypt.hashSync(data, 10); // 10 is the salt rounds
  };

  const uploadData = async () => {
    setLoading(true);
    setMessage("");

    for (let person of aadharData) {
      try {
        const filePath = `${person.Photo}`;

        // Hash sensitive data (e.g., Aadhaar number, Name, etc.)
        const hashedAadharNo = hashData(person.AadharCardNo);
        const hashedName = hashData(person.Name);
        const hashedDOB = hashData(person.DOB);
        const hashedAddress = hashData(person.Address);
        const hashedGender = hashData(person.Gender);

        // Fetch the image as a blob
        const response = await fetch(filePath);
        const blob = await response.blob();

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `AadharCard/${person.Photo}`);
        await uploadBytes(storageRef, blob);

        // Get Image URL
        const downloadURL = await getDownloadURL(storageRef);

        // Store hashed data in Firestore
        await setDoc(doc(collection(db, "AadhaarCard"), person.AadharCardNo), {
          AadharCardNo: hashedAadharNo,
          Name: hashedName,
          DOB: hashedDOB,
          Address: hashedAddress,
          Photo: downloadURL,
          Gender: hashedGender,
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
