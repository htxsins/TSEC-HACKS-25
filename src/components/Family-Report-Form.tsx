"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, MapPin, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ReportForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    race: "",
    eyeColor: "",
    identifiedBy: "",
    clothesWorn: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    lastSeenTime: "",
    contactPhone: "",
    destination: "",
    photo: null as File | null,
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader className="text-center border-b border-gray-100 bg-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-red-600">Missing Person Report</CardTitle>
        <p className="text-gray-600">Please provide as much detail as possible</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= num ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-400",
                  )}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div className={cn("w-20 h-1 transition-colors", step > num ? "bg-yellow-500" : "bg-gray-100")} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name of missing person"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <div className="mt-2 space-x-4">
                    {["Male", "Female", "Other"].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={option.toLowerCase()}
                          checked={formData.gender === option.toLowerCase()}
                          onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                          className="form-radio h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="race">Race</Label>
                  <Input
                    id="race"
                    placeholder="Race or ethnicity"
                    value={formData.race}
                    onChange={(e) => setFormData((prev) => ({ ...prev, race: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eyeColor">Eye Color</Label>
                  <Input
                    id="eyeColor"
                    placeholder="Eye color"
                    value={formData.eyeColor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, eyeColor: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="identifiedBy">Identified By</Label>
                  <Input
                    id="identifiedBy"
                    placeholder="How can the person be identified?"
                    value={formData.identifiedBy}
                    onChange={(e) => setFormData((prev) => ({ ...prev, identifiedBy: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="clothes">Clothes Last Worn</Label>
                <Textarea
                  id="clothes"
                  placeholder="Describe the clothing the person was last seen wearing"
                  value={formData.clothesWorn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clothesWorn: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastSeenDate">Last Seen Date</Label>
                  <Input
                    id="lastSeenDate"
                    type="date"
                    value={formData.lastSeenDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastSeenDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastSeenTime">Last Seen Time</Label>
                  <Input
                    id="lastSeenTime"
                    type="time"
                    value={formData.lastSeenTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastSeenTime: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Last Seen Location</Label>
                <div className="space-y-2">
                  <Input
                    id="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className="mt-1"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    />
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    />
                    <Input
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      className="md:col-span-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="destination">Known Destination</Label>
                <Input
                  id="destination"
                  placeholder="Where was the person going?"
                  value={formData.destination}
                  onChange={(e) => setFormData((prev) => ({ ...prev, destination: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Contact Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter contact phone number"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="photo"
                        className="relative cursor-pointer rounded-md font-medium text-yellow-600 hover:text-yellow-500"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setStep(2)} variant="outline" className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  Submit Report
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

