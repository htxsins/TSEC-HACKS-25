import { useState, useEffect } from "react"
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "@/config/firebase"

interface Emergency {
  id: string
  aadharCardNo: string
  location: {
    latitude: string
    longitude: string
  }
  phoneNo: string
  resolved: boolean
  time: string
}

export function useEmergencies() {

  const [emergencies, setEmergencies] = useState<Emergency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "Emergency"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const emergenciesData: Emergency[] = []
      querySnapshot.forEach((doc) => {
        emergenciesData.push({ id: doc.id, ...doc.data() } as Emergency)
      })
      setEmergencies(emergenciesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { emergencies, loading }
}

