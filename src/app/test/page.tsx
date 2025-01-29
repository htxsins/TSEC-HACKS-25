import MissingPersonCard from "@/components/Missing-People-Card"
import { getMissingPersons } from "@/lib/MissingData"

export default async function Home() {
  const missingPersons = await getMissingPersons()

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-[#F4C45F] mb-8 text-center">Missing Persons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {missingPersons.map((person) => (
          <MissingPersonCard key={person.id} {...person} />
        ))}
      </div>
    </main>
  )
}

