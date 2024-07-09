function generateSlug(title) {
  if (!title || typeof title !== "string") {
    throw new TypeError("Title must be a non-empty string");
  }
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-word
    .replace(/\-\-+/g, "-") // Ganti multiple - dengan single -
    .replace(/^-+/, "") // Hapus - di awal
    .replace(/-+$/, ""); // Hapus - di akhir
}

module.exports = generateSlug;
