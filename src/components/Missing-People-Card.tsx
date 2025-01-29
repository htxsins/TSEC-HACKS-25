"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MissingPersonCardProps {
  id: string
  photoURL: string
  url: string
  age: string
  gender: string
  race: string
  eyeColor: string
  identifiedBy: {
    name: string
    aadharCardNo: string
  }
}

export default function MissingPersonCard({ url, age, gender, race, eyeColor, identifiedBy }: MissingPersonCardProps) {
  return (
    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <Image
          src={url || "/placeholder.svg?height=300&width=400"}
          alt="Missing Person"
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Age: {age}</span>
            <span className="text-sm font-medium text-gray-500">{gender}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Race: {race}</span>
            <span className="text-sm text-gray-500">Eye Color: {eyeColor}</span>
          </div>
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-gray-700">Identified By:</h3>
            <p className="text-sm text-gray-600">{identifiedBy.name}</p>
            <p className="text-xs text-gray-500">Aadhar: {identifiedBy.aadharCardNo}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#F4C45F] p-2">
        <Button className="w-full bg-white text-[#F4C45F] hover:bg-gray-100 transition-colors duration-300">
          More Info
        </Button>
      </CardFooter>
    </Card>
  )
}

