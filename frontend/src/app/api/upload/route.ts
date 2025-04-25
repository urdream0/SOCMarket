"use server"

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
 
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;
 
  if (!file) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }
 
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileExtension = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExtension}`;
  const filePath = path.join(process.cwd(), "public/images/photos", fileName);
 
  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ fileName }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors du téléchargement" }, { status: 500 });
  }
}