import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi helper untuk membangun path yang benar sesuai base URL GitHub Pages
  const getAssetPath = (path: string) => `/invitation/${path}`;

  useEffect(() => {
    // 1. Ambil ID klien dari URL (?id=budi-ani)
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('id') || 'budi-ani';

    // 2. Fetch data menggunakan path absolut repositori
    fetch(getAssetPath(`clients/${slug}/data.json`))
      .then((res) => {
        if (!res.ok) throw new Error('Data tidak ditemukan');
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data klien:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif animate-pulse text-sm tracking-widest">
      MENYIAPKAN UNDANGAN...
    </div>
  );

  if (!data) return (
    <div className="h-screen flex items-center justify-center bg-stone-50 text-red-400 font-serif p-10 text-center">
      Maaf, undangan tidak ditemukan. Pastikan link sudah benar.
    </div>
  );

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden font-serif text-stone-800">
      
      {/* HERO SECTION - FOTO SAMPUL */}
      <section className="relative h-[85vh]">
        <img 
          src={getAssetPath(`clients/${data.slug}/${data.gallery.heroImage}`)} 
          className="w-full h-full object-cover" 
          alt="Sampul Undangan"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 text-center">
          <p className="uppercase tracking-[0.4em] text-[10px] mb-6 opacity-80">The Wedding of</p>
          <h1 className="text-5xl font-light mb-2">
            {data.couple.groom.nickname} <span className="block text-2xl italic my-2">&</span> {data.couple.bride.nickname}
          </h1>
          <div className="w-12 h-[1px] bg-white/50 my-6"></div>
          <p className="tracking-[0.2em] text-sm font-light">
            {new Date(data.events[0].date).toLocaleDateString('id-ID', { 
              day: '2-digit', month: 'long', year: 'numeric' 
            })}
          </p>
        </div>
      </section>

      {/* PROFIL MEMPELAI - FOTO PRIA & WANITA */}
      <section className="py-20 px-8 text-center bg-white">
        <div className="flex flex-col gap-16">
          {/* Pria */}
          <div className="animate-fade-in">
            <div className="w-40 h-56 mx-auto overflow-hidden rounded-t-full shadow-xl border border-stone-100">
              <img 
                src={getAssetPath(`clients/${data.slug}/${data.couple.groom.image}`)} 
                className="w-full h-full object-cover" 
              />
            </div>
            <h2 className="mt-6 text-2xl tracking-wide">{data.couple.groom.name}</h2>
            <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-[0.2em]">
              Putra dari {data.couple.groom.father} & {data.couple.groom.mother}
            </p>
          </div>

          <div className="text-3xl font-serif italic text-stone-200">and</div>

          {/* Wanita */}
          <div className="animate-fade-in">
            <div className="w-40 h-56 mx-auto overflow-hidden rounded-t-full shadow-xl border border-stone-100">
              <img 
                src={getAssetPath(`clients/${data.slug}/${data.couple.bride.image}`)} 
                className="w-full h-full object-cover" 
              />
            </div>
            <h2 className="mt-6 text-2xl tracking-wide">{data.couple.bride.name}</h2>
            <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-[0.2em]">
              Putri dari {data.couple.bride.father} & {data.couple.bride.mother}
            </p>
          </div>
        </div>
      </section>

      {/* 3 FOTO KENANGAN (GRID) */}
      <section className="bg-stone-50 py-12">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-8">Our Memories</p>
        <div className="grid grid-cols-3 gap-1 px-1">
          {data.gallery.album.slice(0, 3).map((img: string, i: number) => (
            <div key={i} className="aspect-square overflow-hidden bg-stone-200 shadow-inner">
              <img 
                src={getAssetPath(`clients/${data.slug}/${img}`)} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-stone-100 bg-white">
        <p className="text-stone-400 text-[9px] uppercase tracking-[0.4em]">
          E-Invitation by <span className="font-bold text-stone-600">Omah Aksara</span>
        </p>
      </footer>
    </main>
  );
}

export default App;
