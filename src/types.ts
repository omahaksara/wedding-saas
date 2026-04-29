export interface WeddingData {
  slug: string;
  pria_nama: string;
  pria_foto: string;
  pria_ortu: string;
  wanita_nama: string;
  wanita_foto: string;
  wanita_ortu: string;
  waktu_display: string;
  foto_sampul: string;
  akad_tgl: string;
  akad_lokasi: string;
  map_akad: string;
  resepsi_tgl: string;
  resepsi_lokasi: string;
  map_resepsi: string;
  bank_data: string;
  rekening_qr: string;
  gallery_urls: string;
  musik_url: string;
}

export interface ApiResponse {
  data: WeddingData[];
}
