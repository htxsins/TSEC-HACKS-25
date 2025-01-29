"use client"

import { useEmergencies } from "../hooks/useEmergencies";
import { EmergencyCard } from "./Emergency-Card";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EmergenciesDashboard() {
  const { emergencies, loading } = useEmergencies();

  const handleResolve = async (id: string) => {
    try {
      console.log(id)
      const emergencyRef = doc(db, "Emergency", id);
      await updateDoc(emergencyRef, { resolved: true });
      console.log(`Emergency ${id} marked as resolved.`);
    } catch (error) {
      console.error("Error updating emergency:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#F4C45F]">Emergency Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencies.map((emergency) => (
          <EmergencyCard
            key={emergency.id}
            emergency={{
              ...emergency,
              setResolved: () => handleResolve(emergency.id), // Pass updated function
            }}
          />
        ))}
      </div>
    </div>
  );
}
