import { useEffect, useState, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Music, Play, MapPin, Copy, ExternalLink, Calendar, Heart, Clock, Sparkles, Send, Quote } from 'lucide-react';
import { WeddingData, ApiResponse } from './types';

const API = 'https://script.google.com/macros/s/AKfycbwTA7vv_k7FrtMjSO5vR4tJ-C8S-oYqmT24eQq0jER-SoynrlksPRNjT8yrwCes8ppURA/exec';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.21, 0.45, 0.32, 0.9] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function App() {
  const [data, setData] = useState<WeddingData | null>(null);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scaleEffect = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('u') || 'zeya-putra';
    const guest = params.get('nama') || 'Tamu Undangan';
    setGuestName(decodeURIComponent(guest).replace(/\+/g, ' '));

    fetch(`${API}?slug=${slug}`)
      .then((res) => res.json())
      .then((res: ApiResponse) => {
        const wedding = res.data.find((x) => x.slug === slug);
        if (wedding) {
          setData(wedding);
          document.title = `${wedding.pria_nama} & ${wedding.wanita_nama} | Wedding Invitation`;
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
        setIsPlaying(true);
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center z-[100]">
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 3, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Heart className="w-16 h-16 text-gold fill-gold/10" strokeWidth={1} />
        </motion.div>
        <div className="mt-8 overflow-hidden h-1 w-32 bg-white/5 rounded-full relative">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-gold w-1/2"
          />
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-center p-20 font-serif text-gold">Undangan tidak valid.</div>;

  return (
    <div className="relative selection:bg-gold/30 selection:text-white min-h-screen">
      <div className="fixed inset-0 bg-grain z-[55] pointer-events-none opacity-[0.03]" />
      <audio ref={audioRef} src={data.musik_url} loop />

      {/* Elegant Cover Overlay */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.section
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "anticipate" } }}
            className="fixed inset-0 z-[70] flex items-center justify-center text-center overflow-hidden bg-dark"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-cover bg-center brightness-[0.25]"
              style={{ backgroundImage: `url(${data.foto_sampul})` }}
            />
            
            <div className="ornament-corner top-8 left-8" />
            <div className="ornament-corner top-8 right-8 -rotate-90" />
            <div className="ornament-corner bottom-8 left-8 rotate-90" />
            <div className="ornament-corner bottom-8 right-8 rotate-180" />

            <div className="relative z-10 w-full max-w-2xl px-6">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.p variants={fadeUp} className="text-xs tracking-[0.6em] uppercase text-gold/60">
                  Undangan Pernikahan
                </motion.p>
                
                <motion.div variants={fadeUp}>
                  <h1 className="font-serif text-6xl md:text-9xl text-gold-light tracking-tighter leading-none italic mb-4">
                    {data.pria_nama.split(' ')[0]} <span className="font-sans text-xl md:text-2xl block md:inline not-italic opacity-30 my-4">&</span> {data.wanita_nama.split(' ')[0]}
                  </h1>
                </motion.div>
                
                <motion.div variants={fadeUp} className="space-y-6">
                  <div className="inline-block px-10 py-12 glass-card border-gold/10 relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dark px-4 text-gold/40 text-[10px] tracking-[0.3em] uppercase">MENGUNDANG</div>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-3 text-white">KPD YTH. BPK/IBU/SDR/I</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide mb-8">{guestName}</h2>
                    <button onClick={handleOpenInvitation} className="btn-gold">
                      BUKA UNDANGAN
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <main className={`${!isOpen ? 'h-screen overflow-hidden' : ''} bg-dark`}>
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />

        {/* Parallax Hero */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center brightness-[0.3] h-[120%]"
            style={{ backgroundImage: `url(${data.foto_sampul})`, scale: scaleEffect, opacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="relative z-10 px-6"
          >
            <motion.div variants={fadeUp} className="mb-6 opacity-30"><Sparkles className="w-8 h-8 mx-auto text-gold" /></motion.div>
            <motion.h2 variants={fadeUp} className="title-font text-6xl md:text-9xl mb-8 leading-tight drop-shadow-2xl">
              {data.pria_nama.split(' ')[0]} <span className="italic serif">&</span> {data.wanita_nama.split(' ')[0]}
            </motion.h2>
            <motion.div variants={fadeUp} className="h-px w-20 bg-gold/50 mx-auto mb-8" />
            <motion.p variants={fadeUp} className="subtitle-font mb-4 opacity-70 tracking-[0.2em] uppercase text-sm">
              {formatDate(data.waktu_display)}
            </motion.p>
          </motion.div>
        </section>

        {/* Verse with Quote */}
        <section className="py-40 px-6 text-center max-w-4xl mx-auto relative overflow-hidden">
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="relative z-10 space-y-12"
           >
             <motion.div variants={fadeUp} className="opacity-20 flex justify-center"><Quote className="w-12 h-12 text-gold rotate-180" /></motion.div>
             <motion.p variants={fadeUp} className="font-serif italic text-2xl md:text-4xl text-white/80 leading-relaxed max-w-2xl mx-auto">
               "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, bimbinglah kami untuk senantiasa berjalan di jalan-Mu dalam mahligai rumah tangga."
             </motion.p>
             <motion.div variants={fadeUp} className="h-px w-12 bg-gold/30 mx-auto" />
             <motion.p variants={fadeUp} className="text-xs tracking-[0.5em] uppercase text-gold/40">Our Sacred Journey Begins</motion.p>
           </motion.div>
        </section>

        {/* The Couple Section */}
        <section className="py-40 bg-[#0c0c0c]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-32 space-y-4">
              <span className="text-gold uppercase tracking-[0.5em] text-[10px]">Mengenal Lebih Dekat</span>
              <h2 className="title-font italic lowercase text-gradient-gold">Pasangan Mempelai</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-20">
              <CoupleCard 
                name={data.pria_nama}
                img={data.pria_foto}
                ortu={data.pria_ortu}
                type="Mempelai Pria"
                side="left"
              />
              <CoupleCard 
                name={data.wanita_nama}
                img={data.wanita_foto}
                ortu={data.wanita_ortu}
                type="Mempelai Wanita"
                side="right"
              />
            </div>
          </div>
        </section>

        {/* Countdown Grid */}
        <section className="py-40 bg-dark relative border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="subtitle-font mb-16 tracking-[0.3em]">MENGHITUNG WAKTU</h2>
            <Countdown targetDate={data.waktu_display} />
          </div>
        </section>

        {/* Event Timeline */}
        <section className="py-40 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="text-center mb-24 space-y-4">
               <span className="text-gold/40 uppercase tracking-[0.6em] text-[10px]">The Celebration</span>
               <h2 className="title-font">Agenda Acara</h2>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <EventCard 
                  title="Akad Nikah"
                  time={data.akad_tgl}
                  location={data.akad_lokasi}
                  mapUrl={data.map_akad}
                  icon={<Sparkles className="w-6 h-6" />}
                />
                <EventCard 
                  title="Resepsi"
                  time={data.resepsi_tgl}
                  location={data.resepsi_lokasi}
                  mapUrl={data.map_resepsi}
                  icon={<Heart className="w-6 h-6" />}
                />
             </div>
          </div>
        </section>

        {/* Gallery Masonry */}
        <section className="py-40 bg-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-24 space-y-6">
               <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold/30" />
               <h2 className="title-font italic lowercase text-gradient-gold">Galeri Kebahagiaan</h2>
            </div>
            <GalleryGrid urls={data.gallery_urls} />
          </div>
        </section>

        {/* Gift Section */}
        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/5 bg-white/5">
                <h3 className="font-serif text-4xl text-gold mb-6 italic">Wedding Gift</h3>
                <p className="opacity-60 text-sm leading-relaxed mb-8">Tanpa mengurangi rasa hormat, bagi Anda yang ingin berbagi kasih sayang dapat melalui dompet digital atau transfer bank.</p>
                
                <div className="space-y-6">
                   <div className="p-6 rounded-2xl bg-black/40 border border-gold/10">
                      <p className="text-[10px] uppercase tracking-widest text-gold/50 mb-2">Electronic Bank</p>
                      <div className="text-xl font-medium mb-4 text-white/90">{data.bank_data}</div>
                      <button onClick={() => copyToClipboard(data.bank_data)} className="w-full btn-outline py-3 text-[10px]">
                        SALIN NOMOR REKENING
                      </button>
                   </div>
                </div>
              </div>
              
              <div className="p-12 md:p-16 flex flex-col items-center justify-center text-center bg-gold/5">
                <p className="text-xs uppercase tracking-widest opacity-40 mb-8 italic font-serif">Atau Scan QR Code</p>
                {data.rekening_qr ? (
                  <div className="p-6 bg-white rounded-3xl shadow-2xl relative">
                    <img src={data.rekening_qr} alt="QR" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
                  </div>
                ) : (
                  <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-dashed border-gold/20 rounded-3xl flex items-center justify-center italic text-sm opacity-30 font-serif text-gold">QR Not Available</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Final RSVP / Wishes Placeholder */}
        <section className="py-40 bg-[#0c0c0c]">
           <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
              <h2 className="title-font italic lowercase text-gradient-gold">Ucapan & Doa</h2>
              <div className="glass-card p-8 md:p-12 text-left space-y-6">
                 <div className="space-y-4">
                    <input type="text" placeholder="Nama Anda" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-white/20 text-white" />
                    <textarea placeholder="Selamat & Doa Restu..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-white/20 resize-none text-white" />
                 </div>
                 <button className="w-full btn-gold !rounded-xl !py-4 flex items-center justify-center gap-3">
                   <Send className="w-4 h-4" />
                   Kirim Ucapan
                 </button>
              </div>
           </div>
        </section>

        {/* Refined Footer */}
        <footer className="py-40 text-center px-6 relative border-t border-white/5 bg-dark">
           <div className="ornament-corner top-10 left-10 opacity-10" />
           <div className="ornament-corner top-10 right-10 rotate-90 opacity-10" />
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-10">
              <p className="font-serif italic text-2xl text-gold-light/40 tracking-widest">Atas Kehadiran & Doa Restunya</p>
              <h2 className="title-font text-7xl md:text-[10rem] tracking-tighter italic">Terima Kasih</h2>
              <div className="h-px w-20 bg-gold/20 mx-auto" />
              <p className="text-gold font-serif text-3xl italic">{data.pria_nama.split(' ')[0]} & {data.wanita_nama.split(' ')[0]}</p>
           </motion.div>
        </footer>
      </main>
    </div>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
}

function formatTime(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return "";
  }
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
      } else {
        setTimeLeft({
          hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
          jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {Object.entries(timeLeft).map(([label, value], i) => (
        <motion.div 
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-8 md:p-12 group transition-all hover:border-gold/20"
        >
          <div className="text-5xl md:text-8xl font-serif text-gold-light tracking-tighter mb-2 group-hover:scale-110 transition-transform">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/30 font-sans">{label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function CoupleCard({ name, img, ortu, type, side }: { name: string; img: string; ortu: string; type: string; side: 'left' | 'right' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center ${side === 'right' ? 'md:mt-48' : ''}`}
    >
      <div className="relative group w-full max-w-[400px] mb-12">
        <div className="absolute -inset-6 border border-gold/10 rounded-[4rem] group-hover:scale-105 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gold/5 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-1000 shadow-2xl" />
        
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[3rem] border-4 border-dark shadow-2xl">
          <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
        </div>
      </div>
      
      <div className="text-center px-4 max-w-sm">
        <p className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4">{type}</p>
        <h3 className="font-serif text-5xl md:text-6xl text-white mb-8 tracking-tighter italic">{name}</h3>
        <div className="h-px w-10 bg-gold/40 mx-auto mb-8" />
        <p className="text-sm opacity-50 leading-relaxed italic font-serif px-8">{ortu}</p>
      </div>
    </motion.div>
  );
}

function EventCard({ title, time, location, mapUrl, icon }: { title: string; time: string; location: string; mapUrl: string; icon: ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="glass-card p-12 md:p-20 text-center relative group flex flex-col items-center"
    >
      <div className="absolute top-8 right-8 opacity-5"><Sparkles className="w-16 h-16 text-gold" /></div>
      <div className="bg-gold/5 w-24 h-24 rounded-full flex items-center justify-center mb-10 text-gold border border-gold/10 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-1000 shadow-xl">
        {icon}
      </div>
      
      <h3 className="font-serif text-5xl md:text-6xl mb-8 italic text-white/90">{title}</h3>
      
      <div className="space-y-6 mb-12">
        <div className="flex flex-col items-center">
          <p className="font-serif italic text-2xl md:text-3xl text-gold-light mb-2">{formatDate(time)}</p>
          <div className="h-px w-16 bg-gold/10 my-4" />
          <p className="text-white/60 tracking-[0.3em] font-sans text-xs md:text-sm uppercase font-semibold italic">Pukul {formatTime(time)} WIB / Selesai</p>
        </div>
      </div>

      <div className="flex-grow mb-16 flex flex-col items-center">
        <MapPin className="w-8 h-8 text-gold/30 mb-4 animate-bounce" />
        <p className="text-sm md:text-lg opacity-50 max-w-sm font-serif italic leading-relaxed px-8">{location}</p>
      </div>

      <a 
        href={mapUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-outline w-full group/btn"
      >
        LOKASI GOOGLE MAPS
      </a>
    </motion.div>
  );
}

function GalleryGrid({ urls }: { urls: string }) {
  const images = urls.split(',').map(s => s.trim()).filter(s => s);
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {images.map((url, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: (i % 3) * 0.2, duration: 1 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-[2.5rem] border border-white/5 cursor-pointer shadow-2xl"
        >
          <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 flex items-center justify-center backdrop-blur-[2px]">
             <Sparkles className="text-white w-8 h-8 scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>
          <img 
            src={url} 
            alt={`Gallery ${i}`} 
            className="w-full h-auto object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
          />
        </motion.div>
      ))}
    </div>
  );
}

function MusicPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <motion.button 
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "backOut" }}
      onClick={onToggle}
      className={`fixed bottom-10 right-10 z-[60] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 backdrop-blur-3xl overflow-hidden group ${isPlaying ? 'bg-gold' : 'bg-white/5 border border-gold/40 text-gold'}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`relative z-10 transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : 'group-hover:scale-110'}`}>
        {isPlaying ? <Music className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 ml-1" />}
      </div>
    </motion.button>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  alert('Nomor rekening disalin ke clipboard.');
}
