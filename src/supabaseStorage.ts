import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import fs from "fs/promises";

export const upload = multer({ storage: multer.memoryStorage() }); // Cambiado a almacenamiento en memoria

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function uploadToSupabase(buffer: Buffer, filename: string) {
  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .upload(filename, buffer, { contentType: "image/jpeg" });

  if (error) throw error;

  const { data } = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .getPublicUrl(filename);

  return data.publicUrl;
}
