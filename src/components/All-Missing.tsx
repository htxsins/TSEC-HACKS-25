"use client"

import { useEffect, useState } from "react"
import MissingPersonCard from "@/components/Missing-People-Card"
import { getMissingPersons } from "@/lib/MissingData"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle } from "lucide-react"

export default function AllMissing() {
  const [missingPersons, setMissingPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchData() {
      const data = await getMissingPersons()
      setMissingPersons(data)
    }
    fetchData()
  }, [])

  const filteredPersons = missingPersons.filter((person) =>
    person.identifiedBy.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="bg-[#F4C45F] text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Missing Persons Database</h1>
          <p className="text-xl mb-8">Help us reunite families and find missing individuals</p>
          <Button className="bg-white text-[#F4C45F] hover:bg-gray-100">Report a Missing Person</Button>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto py-8">
        <div className="flex items-center justify-center mb-8">
          <Input
            type="text"
            placeholder="Search by name..."
            className="max-w-md mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            <Search className="mr-2" />
            Search
          </Button>
        </div>
      </section>

      {/* Missing Persons Cards */}
      <section className="container mx-auto pb-16 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Current Missing Persons</h2>
        {filteredPersons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPersons.map((person) => (
              <MissingPersonCard key={person.id} {...person} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <p className="text-xl">No missing persons found matching your search.</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
          <p className="text-xl mb-8">
            Every share can help bring someone home. Spread the word and help us find these missing individuals.
          </p>
          <Button className="bg-[#F4C45F] text-white hover:bg-[#E3B54E]">Share on Social Media</Button>
        </div>
      </section>
    </main>
  )
}

