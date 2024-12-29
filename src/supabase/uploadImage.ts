import supabase from "./supabaseClient";

export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from("social-media-image-storage")
    .upload(`images/${fileName}`, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("social-media-image-storage")
    .getPublicUrl(`images/${fileName}`);

  if (!publicUrl) {
    console.error("Error getting public URL:");
    return null;
  }

  return publicUrl;
};
