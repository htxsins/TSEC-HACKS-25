"use client"

import UploadForm from "@/components/Upload-Missing"
import AllMissing from "@/components/All-Missing"
import TanmayUploadPage from "@/components/TanmayUpload"
// import UploadAadhar from "@/components/UploadAadharCard"
import MissingPersonsHeatmap from "@/components/MapPage"

export default function TextApp(){
  return(
    <div>
      {/* <UploadForm /> */}
      {/* <AllMissing /> */}
      {/* <TanmayUploadPage/> */}
     {/* <UploadAadhar/> */}
     <MissingPersonsHeatmap />
    </div>
  ) 

}