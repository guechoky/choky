export const WHATSAPP_NUMBER = "6282225336306"; // international format, no leading zero or plus

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIALS = {
  whatsapp: buildWhatsAppLink(
    "Halo ChokY, saya mau tanya-tanya soal Karimunjawa Tours."
  ),
  instagram: "https://instagram.com/karimunjawa.tours",
  github: "https://github.com/karimunjawa-tours",
};
