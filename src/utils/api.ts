// utils/api.ts
import { AnalyzeResult } from "@/constants/types/personTypes";

export async function uploadImage(image: File): Promise<AnalyzeResult> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return response.json();
}
