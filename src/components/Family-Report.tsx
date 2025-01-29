"use client"

import type { Metadata } from "next"
import ReportForm from "./Family-Report-Form"

export const metadata: Metadata = {
  title: "Missing Persons Report",
  description: "File a missing person report",
}

export default function Family_Report_Page() {
  return (
    <div className="min-h-screen bg-[#FFF6E9]">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Missing Persons Report</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Status Tracking
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Emergency Contact
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ReportForm />
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <p>1234 Law Enforcement Road</p>
              <p>Emergency: 911</p>
              <p>Hotline: +1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    File a Report
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Track Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Emergency Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-300">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-300">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

