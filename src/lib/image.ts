// import { writeFile } from 'fs/promises';
// import path from 'path';
import { supabase } from '@/lib/supabase';

export async function saveImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from('next-app-bucket')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data } = supabase.storage
    .from('next-app-bucket')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
