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
    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-5xl"> {/* Changed from max-w-2xl to max-w-4xl */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Section - Changed to w-2/5 (40%) */}
        <div className="w-full sm:w-2/5 h-48 sm:h-auto relative">
          <Image
            src={url || "/placeholder.svg?height=300&width=400"}
            alt="Missing Person"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section - Changed to w-3/5 (60%) */}
        <div className="flex flex-col flex-1 sm:w-3/5">
          <CardContent className="flex-1 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-7">
                {[
                  { label: "Age", value: age },
                  { label: "Gender", value: gender },
                  { label: "Race", value: race },
                  { label: "Eye Color", value: eyeColor },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <span className="text-sm font-medium text-gray-500">{item.label}</span>
                    <p className="text-base font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Identified By</h3>
                <p className="text-base font-medium text-gray-900">{identifiedBy.name}</p>
                <p className="text-sm text-gray-600">Aadhar: {identifiedBy.aadharCardNo}</p>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="bg-[#F4C45F] p-4">
            <Button className="w-full bg-white text-[#F4C45F] hover:bg-gray-100 transition-colors duration-300 font-semibold">
              More Info
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}