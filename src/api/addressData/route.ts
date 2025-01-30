import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "./public/data/", "addressData.json")
    console.log("File Path",filePath)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading address data:", error)
    return NextResponse.json({ error: "Failed to load address data" }, { status: 500 })
  }
}

