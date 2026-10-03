import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BUCKET = 'uploads'

export async function uploadImage(file) {
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file.buffer, {
      contentType: 'image/png',
      upsert: false,
    })

  if (error) throw new Error(`Image upload failed: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  return { filename, url: data.publicUrl }
}

export async function deleteImage(filename) {
  if (!filename) return
  // image_path is stored as a full URL; extract just the filename at the end
  const key = filename.includes('/') ? filename.split('/').pop() : filename
  await supabase.storage.from(BUCKET).remove([key])
}