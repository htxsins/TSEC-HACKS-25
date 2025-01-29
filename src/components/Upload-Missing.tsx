"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { db, storage } from "@/config/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Upload, User, Calendar, Users, Eye, CreditCard, Camera } from "lucide-react"
import { useDropzone } from "react-dropzone"

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

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState(defaultData)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    updateProgress()
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateProgress()
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateProgress()
  }

  const updateProgress = () => {
    const totalFields = Object.keys(formData).length + 2 // +2 for nested identifiedBy fields
    const filledFields =
      Object.values(formData).filter(Boolean).length +
      Object.values(formData.identifiedBy).filter(Boolean).length +
      (file ? 1 : 0)
    setProgress((filledFields / totalFields) * 100)
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const storageRef = ref(storage, `Missing/${file.name}`)
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)

      const docData = {
        ...formData,
        photoURL: file.name,
        url: downloadURL,
      }

      const docRef = await addDoc(collection(db, "Missing"), docData)

      toast({
        title: "Success",
        description: `Document uploaded with ID: ${docRef.id}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while uploading.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#F4C45F] to-[#F4A259] rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 bg-white">
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-full bg-[#F4C45F]">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">Missing Person Information</h2>
                <p className="text-sm text-gray-600">Help us find them</p>
              </div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-[#F4C45F] rounded-lg p-6 text-center cursor-pointer transition-all hover:bg-white hover:shadow-inner"
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto text-[#F4C45F] mb-4" />
                {isDragActive ? (
                  <p className="text-[#F4C45F]">Drop the photo here ...</p>
                ) : (
                  <p className="text-gray-600">Drag & drop a photo or click to select</p>
                )}
                {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
              </div>
            </div>
            <Card className="md:w-1/2 border-none rounded-none shadow-none bg-transparent">
              <CardContent className="space-y-6 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="bg-white border-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-white flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Gender
                    </Label>
                    <Select name="gender" value={formData.gender} onValueChange={handleSelectChange("gender")}>
                      <SelectTrigger className="bg-white border-none text-gray-800">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="race" className="text-white flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Race
                    </Label>
                    <Input
                      id="race"
                      name="race"
                      value={formData.race}
                      onChange={handleInputChange}
                      className="bg-white border-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor" className="text-white flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Eye Color
                    </Label>
                    <Input
                      id="eyeColor"
                      name="eyeColor"
                      value={formData.eyeColor}
                      onChange={handleInputChange}
                      className="bg-white border-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Identified By (Name)
                  </Label>
                  <Input
                    id="name"
                    name="identifiedBy.name"
                    value={formData.identifiedBy.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, identifiedBy: { ...prev.identifiedBy, name: e.target.value } }))
                    }
                    className="bg-white border-none text-gray-800 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadharCardNo" className="text-white flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Aadhar Card Number
                  </Label>
                  <Input
                    id="aadharCardNo"
                    name="identifiedBy.aadharCardNo"
                    value={formData.identifiedBy.aadharCardNo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        identifiedBy: { ...prev.identifiedBy, aadharCardNo: e.target.value },
                      }))
                    }
                    className="bg-white border-none text-gray-800 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Form Completion</Label>
                  <Progress value={progress} className="w-full h-2 bg-white/20" indicatorClassName="bg-[#F4C45F]" />
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-8">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-white text-[#F4C45F] hover:bg-[#F4C45F] hover:text-white transition-all duration-300 shadow-lg"
                >
                  {uploading ? "Uploading..." : "Submit Information"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mb-32 opacity-10"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mt-16 opacity-10"></div>
        </div>
      </div>
    </div>
  )
}

