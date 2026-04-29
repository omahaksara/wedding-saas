import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi helper: Memastikan path aset selalu benar relatif terhadap base URL
  const getAssetPath = (assetName: string) => {
    if (!assetName) return '';
    const baseUrl = import.meta.env.BASE_URL || '/invitation/';
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('id') || 'budi-ani';
    
    // Gabungkan: /base/clients/slug/nama-file
    return `${baseUrl}clients/${slug}/${assetName}`.replace(/\/+/g, '/');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('id') || 'budi-ani';

    // Mengambil data.json langsung menggunakan path helper
    // Kita panggil manual di sini agar tidak rekursif dengan getAssetPath
    const baseUrl = import.meta.env.BASE_URL || '/invitation/';
    const jsonPath = `${baseUrl}clients/${slug}/data.json`.replace(/\/+/g, '/');

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) throw new Error('Data klien tidak ditemukan di: ' + jsonPath);
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data:", err);
        setLoading(false);
      });
  }, []);

  // 1. Tampilan Loading
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif animate-pulse text-sm tracking-widest">
      MENYIAPKAN UNDANGAN...
    </div>
  );

  // 2. Tampilan Error jika Data Kosong (Mencegah Blank)
  if (!data || !data.couple || !data.gallery) return (
    <div className="h-screen flex flex-col items-center justify-center bg-stone-50 text-red-400 font-serif p-10 text-center">
      <p className="mb-4">Maaf, data undangan tidak ditemukan atau struktur JSON salah.</p>
      <code className="text-xs bg-red-50 p-2 rounded text-red-600">ID: {new URLSearchParams(window.location.search).get('id') || 'budi-ani'}</code>
    </div>
  );

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden font-serif text-stone-800">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh]">
        <img 
          src={getAssetPath(data.gallery.heroImage)} 
          className="w-full h-full object-cover" 
          alt="Sampul"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 text-center">
          <p className="uppercase tracking-[0.4em] text-[10px] mb-6 opacity-80">The Wedding of</p>
          <h1 className="text-5xl font-light mb-2">
            {data.couple.groom.nickname} <span className="block text-2xl italic my-2">&</span> {data.couple.bride.nickname}
          </h1>
          <div className="w-12 h-[1px] bg-white/50 my-6"></div>
          <p className="tracking-[0.2em] text-sm font-light uppercase">
            {data.events?.[0]?.date ? new Date(data.events[0].date).toLocaleDateString('id-ID', { 
              day: '2-digit', month: 'long', year: 'numeric' 
            }) : ''}
          </p>
        </div>
      </section>

      {/* PROFIL MEMPELAI */}
      <section className="py-20 px-8 text-center bg-white">
        <div className="flex flex-col gap-16">
          {/* Pria */}
          <div>
            <div className="w-40 h-56 mx-auto overflow-hidden rounded-t-full shadow-xl border border-stone-100">
              <img src={getAssetPath(data.couple.groom.image)} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-6 text-2xl tracking-wide">{data.couple.groom.name}</h2>
            <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-[0.2em]">
              Putra dari {data.couple.groom.father} & {data.couple.groom.mother}
            </p>
          </div>

          <div className="text-3xl font-serif italic text-stone-200">and</div>

          {/* Wanita */}
          <div>
            <div className="w-40 h-56 mx-auto overflow-hidden rounded-t-full shadow-xl border border-stone-100">
              <img src={getAssetPath(data.couple.bride.image)} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-6 text-2xl tracking-wide">{data.couple.bride.name}</h2>
            <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-[0.2em]">
              Putri dari {data.couple.bride.father} & {data.couple.bride.mother}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="bg-stone-50 py-12">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-8 font-bold">Our Memories</p>
        <div className="grid grid-cols-3 gap-1 px-1">
          {data.gallery.album?.slice(0, 3).map((img: string, i: number) => (
            <div key={i} className="aspect-square overflow-hidden bg-stone-200">
              <img 
                src={getAssetPath(img)} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>
      </section>
      
      <footer className="py-16 text-center border-t border-stone-100 bg-white">
        <p className="text-stone-400 text-[9px] uppercase tracking-[0.4em]">
          E-Invitation by <span className="font-bold text-stone-600">Omah Aksara</span>
        </p>
      </footer>
    </main>
  );
}

export default App;
