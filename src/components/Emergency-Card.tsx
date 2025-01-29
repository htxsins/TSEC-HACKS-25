import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmergencyCardProps {
  emergency: {
    id: string;
    aadharCardNo: string;
    location: {
      latitude: string;
      longitude: string;
    };
    phoneNo: string;
    resolved: boolean;
    time: string;
    setResolved: (resolved: boolean) => void;
  };
}

export function EmergencyCard({ emergency }: EmergencyCardProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!emergency.resolved) {
      const interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [emergency.resolved]);

  return (
    <motion.div
      animate={{ backgroundColor: !emergency.resolved && blink ? "#ffdddd" : "#ffffff" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-md overflow-hidden border-2 border-[#F4C45F]"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Emergency #{emergency.id.slice(0, 6)}
          </h2>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              emergency.resolved ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {emergency.resolved ? "Resolved" : "Unresolved"}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Aadhar Card:</strong> {emergency.aadharCardNo}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong> {emergency.phoneNo}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Location:</strong> {emergency.location.latitude}, {emergency.location.longitude}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Time:</strong> {new Date(emergency.time).toLocaleString()}
        </p>
      </div>
      <div className="bg-gray-50 px-4 py-3">
        {emergency.resolved ? (
            <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                Resolved
            </button>
        ) : (
            <button
                onClick={() => emergency.setResolved(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                Stop
            </button>
        )}
        </div>
    </motion.div>
  );
}