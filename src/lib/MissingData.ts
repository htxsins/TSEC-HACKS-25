import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

import { db } from "@/config/firebase"

const defaultData = {
  photoURL: "",
  url: "",
  age: "25",
  gender: "Male",
  race: "Asian",
  eyeColor: "Brown",
  identifiedBy: {
    name: "John Doe",
    aadharCardNo: "1234-5678-9012",
  },
}

export async function getMissingPersons() {
  const missingPersonsCol = collection(db, "Missing")
  const missingPersonsSnapshot = await getDocs(missingPersonsCol)
  const missingPersonsList = missingPersonsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...defaultData,
    ...doc.data(),
  }))
  return missingPersonsList
}

