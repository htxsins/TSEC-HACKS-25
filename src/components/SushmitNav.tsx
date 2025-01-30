import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="h-16 bg-white">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Left Side - Website Name */}
        <div className="flex items-center">
          <span className="text-xl font-bold font-montserrat">ANVESHAYA</span>
        </div>

        {/* Right Side - Navigation Links */}
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
