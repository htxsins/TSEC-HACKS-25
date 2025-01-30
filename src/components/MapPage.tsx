"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MapComponent from "./MapComponent"
import data from "../constants/data.json"

export default function MissingPersonsHeatmap() {
  const [cities, setCities] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [addresses, setAddresses] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [heatmapData, setHeatmapData] = useState<[number, number, number][]>([])

  useEffect(() => {
    setCities(Object.keys(data))
  }, [])

  useEffect(() => {
    if (selectedCity) {
      const cityData = data[selectedCity]
      setDistricts(cityData.map((item) => Object.keys(item.district)[0]))
    }
  }, [selectedCity])

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      const cityData = data[selectedCity]
      const districtData = cityData.find((item) => Object.keys(item.district)[0] === selectedDistrict)
      if (districtData) {
        setAddresses(districtData.district[selectedDistrict].address)
      }
    }
  }, [selectedCity, selectedDistrict])

  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedAddress) {
      // In a real-world scenario, you would geocode the address here
      // For this example, we'll use random coordinates
      const randomLat = 28.6139 + (Math.random() - 0.5) * 0.1
      const randomLng = 77.209 + (Math.random() - 0.5) * 0.1
      const noOfMissing =
        data[selectedCity].find((item) => Object.keys(item.district)[0] === selectedDistrict)?.district[
          selectedDistrict
        ].noofMissing || 0
      setHeatmapData([[randomLng, randomLat, noOfMissing]])
    } else if (selectedCity && selectedDistrict) {
      const districtData = data[selectedCity].find((item) => Object.keys(item.district)[0] === selectedDistrict)
      if (districtData) {
        const addresses = districtData.district[selectedDistrict].address
        const noOfMissing = districtData.district[selectedDistrict].noofMissing
        const points = addresses.map(() => {
          const randomLat = 28.6139 + (Math.random() - 0.5) * 0.1
          const randomLng = 77.209 + (Math.random() - 0.5) * 0.1
          return [randomLng, randomLat, noOfMissing / addresses.length]
        })
        setHeatmapData(points)
      }
    } else if (selectedCity) {
      const cityData = data[selectedCity]
      const points = cityData.flatMap((item) => {
        const district = Object.keys(item.district)[0]
        const addresses = item.district[district].address
        const noOfMissing = item.district[district].noofMissing
        return addresses.map(() => {
          const randomLat = 28.6139 + (Math.random() - 0.5) * 0.1
          const randomLng = 77.209 + (Math.random() - 0.5) * 0.1
          return [randomLng, randomLat, noOfMissing / addresses.length]
        })
      })
      setHeatmapData(points)
    }
  }, [selectedCity, selectedDistrict, selectedAddress])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Missing Persons Heatmap</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Select onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedDistrict} disabled={!selectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Select a district" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedAddress} disabled={!selectedDistrict}>
          <SelectTrigger>
            <SelectValue placeholder="Select an address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address, index) => (
              <SelectItem key={index} value={address}>
                {address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <MapComponent heatmapData={heatmapData} />
    </div>
  )
}

