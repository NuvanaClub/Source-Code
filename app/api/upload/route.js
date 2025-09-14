import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file) return new Response(JSON.stringify({ error: "No file" }), { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const name = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = path.join(uploadDir, name);
    await writeFile(filePath, buffer);
    return new Response(JSON.stringify({ path: "/uploads/" + name }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}