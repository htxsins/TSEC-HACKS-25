import { useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "@/config/firebase";

// Function to show Chrome notification
const showNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/emergency-icon.png" });
  }
};

// Main component
const EmergencyAlert = () => {
  useEffect(() => {
    // Request Notification Permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((perm) => {
        if (perm !== "granted") console.log("Notification permission denied");
      });
    }

    // Firestore listener
    const unsubscribe = onSnapshot(collection(db, "Emergency"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.resolved === false) {
          showNotification("🚨 Emergency Alert!", "Check the website for updates.");
        }
      });
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return <div></div>;
};

export default EmergencyAlert;
