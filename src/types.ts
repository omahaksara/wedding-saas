export interface WeddingData {
  slug: string;
  // Mempelai Pria
  pria_nama: string;
  pria_panggilan: string;
  pria_foto: string;
  pria_ortu: string;
  
  // Mempelai Wanita
  wanita_nama: string;
  wanita_panggilan: string;
  wanita_foto: string;
  wanita_ortu: string;
  
  // Acara & Waktu
  waktu_display: string; // Contoh: "Minggu, 20 Mei 2026"
  foto_sampul: string;
  
  // Detail Akad
  akad_tgl: string;
  akad_jam: string;
  akad_lokasi: string;
  map_akad: string;
  
  // Detail Resepsi
  resepsi_tgl: string;
  resepsi_jam: string;
  resepsi_lokasi: string;
  map_resepsi: string;
  
  // Fitur Tambahan
  rekening_nama: string;
  rekening_nomor: string;
  rekening_qr: string; // Nama file di folder klien
  gallery_urls: string[]; // Diubah jadi array string agar bisa menampung banyak foto
  musik_url: string;
}

export interface ApiResponse {
  // Karena kita memanggil data per klien (data.json tunggal), 
  // biasanya kembaliannya adalah objek tunggal, bukan array.
  data: WeddingData; 
}
