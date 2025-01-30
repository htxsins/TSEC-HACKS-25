"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "./SushmitNav"

export default function Prelogin() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-grow overflow-hidden mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-[calc(100vh-8rem)]">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4C45F] to-white rounded-[30px]" />

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Text Container */}
          <div className="relative">
            <h1 className="text-[10vw] font-bold text-white font-alatsi px-[5.5px] pt-4 text-center leading-none whitespace-nowrap overflow-hidden">
              REUNITE . HOPE . FIND
            </h1>
            <p className="text-gray-600 font-montserrat text-left mt-2 px-1 ml-0 pl-10 text-[01.5vw]  w-2/5">
              Bringing hope to families by reuniting them with their missing loved ones, offering support, compassion,
              and a beacon of light in their search.
            </p>
          </div>

          {/* Hero Image Container with negative margin for overlap */}
          <div className="flex-1 relative mt-[-180px] flex justify-center">
            <div className="relative w-[600px] h-[800px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DkUi5gIWEvlgo5DakVAFQKoMSzt53G.png"
                alt="Hero Image"
                fill
                style={{ objectFit: "contain", objectPosition: "top" }}
                priority
              />
            </div>
          </div>

          {/* Buttons with highest hierarchy */}
          <div className="absolute bottom-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 md:px-16 pb-8">
            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-700 text-xl px-8 py-6 my-10"
             size="lg"
            >
              Log In / Sign Up
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-700 text-xl px-8 py-4"
              size="lg"
            >
              Find Person
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

