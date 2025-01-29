import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="h-16 bg-white">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/confusion-SHsTPrkF6uLuWGJiw6I8HCjpehptRh.png"
            alt="Anveshaya Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold font-montserrat">ANVESHAYA</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium font-montserrat">
            Dashboard
          </Link>
          <Link href="/about" className="text-sm font-medium font-montserrat">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium font-montserrat">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

