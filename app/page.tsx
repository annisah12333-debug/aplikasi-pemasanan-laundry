export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full border-b border-slate-800/60">
        <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-rose-400 via-amber-400 to-purple-500 bg-clip-text text-transparent">
          The Micaa Chapter
        </h1>
        <nav className="space-x-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-rose-400 transition">Beranda</a>
          <a href="#about" className="hover:text-rose-400 transition">Tentang Kami</a>
          <a href="#stories" className="hover:text-rose-400 transition">Momen Manis</a>
          <a href="#contact" className="hover:text-rose-400 transition">Pesan</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto my-auto">
        {/* Teks selamat datang diganti jadi awal mula cerita yang romantis */}
        <span className="px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full assignment-animation">
          ✨ Where Our Story Begins
        </span>
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Setiap Halaman Memiliki <br />
          <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-purple-500 bg-clip-text text-transparent">
            Cerita Manis Kita
          </span>
        </h2>
        
        {/* Deskripsi diubah menjadi ruang kenangan Hilmi & Icaa */}
        <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Sebuah sudut digital kecil tempat menyimpan setiap tawa, perjalanan, dan memori indah dari kencan pertama kita hingga hari-hari yang akan datang.
        </p>
        
        {/* Tombol aksi dibuat lebih interaktif */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button className="px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 text-slate-950 hover:opacity-90 transition shadow-lg shadow-rose-400/20">
            Mulai Penjelajahan 🌸
          </button>
          <button className="px-8 py-3.5 rounded-xl font-semibold bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 transition">
            Lihat Galeri Foto
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-500 border-t border-slate-900">
        &copy; 2026 The Micaa Chapter. Dibuat dengan 💖 oleh icaa untuk Hilmi.
      </footer>
    </div>
  );
}
