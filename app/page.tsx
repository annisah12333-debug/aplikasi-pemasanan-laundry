'use client';

import React, { useState } from 'react';

interface Layanan {
  id_layanan: string;
  nama_layanan: string;
  harga_per_kg: number;
}

interface Pesanan {
  id_pesanan: string;
  id_pelanggan: string;
  nama_pelanggan: string;
  no_telepon: string;
  alamat: string;
  id_layanan: string;
  nama_layanan: string;
  berat_pakaian: number;
  total_biaya: number;
  status: 'Pesanan Diterima' | 'Dicuci' | 'Dikeringkan' | 'Disetrika' | 'Selesai' | 'Sudah Diambil';
  catatan: string;
  tanggal_pesanan: string;
}

const daftarLayanan: Layanan[] = [
  { id_layanan: 'L01', nama_layanan: 'Cuci Kering', harga_per_kg: 7000 },
  { id_layanan: 'L02', nama_layanan: 'Cuci + Setrika', harga_per_kg: 10000 },
  { id_layanan: 'L03', nama_layanan: 'Setrika', harga_per_kg: 5000 },
];

const initialPesanan: Pesanan[] = [
  {
    id_pesanan: 'LDR001',
    id_pelanggan: 'P001',
    nama_pelanggan: 'Annisa',
    no_telepon: '081234567890',
    alamat: 'Jl. Syiah Kuala, Banda Aceh',
    id_layanan: 'L02',
    nama_layanan: 'Cuci + Setrika',
    berat_pakaian: 3,
    total_biaya: 30000,
    status: 'Dicuci',
    catatan: 'Pakaian putih dipisah ya.',
    tanggal_pesanan: '2026-03-30',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'layanan' | 'pesanan' | 'status' | 'admin'>('beranda');
  const [pesananList, setPesananList] = useState<Pesanan[]>(initialPesanan);

  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [selectedLayananId, setSelectedLayananId] = useState(daftarLayanan[0].id_layanan);
  const [catatan, setCatatan] = useState('');
  const [searchId, setSearchId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Pesanan | null>(null);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const layananObj = daftarLayanan.find((l) => l.id_layanan === selectedLayananId);
    if (!layananObj) return;

    const newOrder: Pesanan = {
      id_pesanan: `LDR00${pesananList.length + 1}`,
      id_pelanggan: `P00${pesananList.length + 1}`,
      nama_pelanggan: nama,
      no_telepon: telepon,
      alamat: alamat,
      id_layanan: layananObj.id_layanan,
      nama_layanan: layananObj.nama_layanan,
      berat_pakaian: 0,
      total_biaya: 0,
      status: 'Pesanan Diterima',
      catatan: catatan,
      tanggal_pesanan: new Date().toISOString().split('T')[0],
    };

    setPesananList([newOrder, ...pesananList]);
    alert(`Pesanan berhasil dibuat! Nomor Pesanan Anda: ${newOrder.id_pesanan}`);
    setNama('');
    setTelepon('');
    setAlamat('');
    setCatatan('');
    setActiveTab('status');
    setSearchId(newOrder.id_pesanan);
    setTrackedOrder(newOrder);
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const found = pesananList.find((p) => p.id_pesanan.toLowerCase() === searchId.toLowerCase());
    setTrackedOrder(found || null);
  };

  const handleUpdateAdmin = (id_pesanan: string, beratBaru: number, statusBaru: Pesanan['status']) => {
    setPesananList(
      pesananList.map((p) => {
        if (p.id_pesanan === id_pesanan) {
          const layananObj = daftarLayanan.find((l) => l.id_layanan === p.id_layanan);
          const harga = layananObj ? layananObj.harga_per_kg : 0;
          return {
            ...p,
            berat_pakaian: beratBaru,
            total_biaya: beratBaru * harga,
            status: statusBaru,
          };
        }
        return p;
      })
    );
  };

  const statusList: Pesanan['status'][] = [
    'Pesanan Diterima',
    'Dicuci',
    'Dikeringkan',
    'Disetrika',
    'Selesai',
    'Sudah Diambil',
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-2 md:mb-0">
            <span className="text-2xl font-bold tracking-wide">UIN Laundry Express</span>
          </div>
          <nav className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTab('beranda')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'beranda' ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`}>Beranda</button>
            <button onClick={() => setActiveTab('layanan')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'layanan' ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`}>Layanan</button>
            <button onClick={() => setActiveTab('pesanan')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'pesanan' ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`}>Pesan Laundry</button>
            <button onClick={() => setActiveTab('status')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'status' ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`}>Status Pesanan</button>
            <button onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'admin' ? 'bg-amber-800' : 'bg-amber-600 hover:bg-amber-700'}`}>Panel Admin / Petugas</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'beranda' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl font-bold text-slate-900">Aplikasi Pemesanan Laundry Digital</h1>
              <p className="text-slate-600">
                Memudahkan pelanggan dalam membuat pesanan laundry, menghitung total biaya secara otomatis berdasarkan berat pakaian, serta memantau status pengerjaan secara real-time.
              </p>
              <button onClick={() => setActiveTab('pesanan')} className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-emerald-700 transition">
                Buat Pesanan Baru
              </button>
            </div>
          </div>
        )}

        {activeTab === 'layanan' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Daftar Layanan Laundry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {daftarLayanan.map((l) => (
                <div key={l.id_layanan} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase">{l.id_layanan}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{l.nama_layanan}</h3>
                    <p className="text-2xl font-extrabold text-slate-900 mt-4">Rp {l.harga_per_kg.toLocaleString('id-ID')} <span className="text-sm font-normal text-slate-500">/ kg</span></p>
                  </div>
                  <button onClick={() => setActiveTab('pesanan')} className="mt-6 w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-semibold py-2.5 rounded-xl transition">
                    Pilih Layanan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pesanan' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Formulir Pesanan Pelanggan</h2>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Pelanggan</label>
                <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800" placeholder="Masukkan nama" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor Telepon</label>
                <input type="tel" required value={telepon} onChange={(e) => setTelepon(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800" placeholder="Nomor telepon" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat</label>
                <textarea required rows={2} value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800" placeholder="Alamat lengkap" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jenis Layanan</label>
                <select value={selectedLayananId} onChange={(e) => setSelectedLayananId(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white">
                  {daftarLayanan.map((l) => (
                    <option key={l.id_layanan} value={l.id_layanan}>
                      {l.nama_layanan} (Rp {l.harga_per_kg.toLocaleString('id-ID')}/kg)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Catatan Tambahan</label>
                <input type="text" value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800" placeholder="Catatan opsional" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition shadow">
                Kirim Pesanan
              </button>
            </form>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Cek Status Laundry</h2>
              <form onSubmit={handleSearchStatus} className="flex gap-2">
                <input type="text" required value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Nomor Pesanan (cth: LDR001)" className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800" />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-semibold transition">Cari</button>
              </form>
            </div>

            {trackedOrder && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase">{trackedOrder.id_pesanan}</span>
                    <h3 className="text-lg font-bold text-slate-900">{trackedOrder.nama_pelanggan}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">{trackedOrder.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-slate-500 block">Layanan</span><strong>{trackedOrder.nama_layanan}</strong></div>
                  <div><span className="text-slate-500 block">Berat Pakaian</span><strong>{trackedOrder.berat_pakaian} kg</strong></div>
                  <div><span className="text-slate-500 block">Total Biaya</span><strong className="text-emerald-700">Rp {trackedOrder.total_biaya.toLocaleString('id-ID')}</strong></div>
                  <div><span className="text-slate-500 block">Catatan</span><strong>{trackedOrder.catatan || '-'}</strong></div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Status Pengerjaan:</h4>
                  <div className="flex flex-wrap gap-2">
                    {statusList.map((st, idx) => {
                      const activeIndex = statusList.indexOf(trackedOrder.status);
                      const isCompleted = idx <= activeIndex;
                      return (
                        <div key={st} className={`text-xs px-3 py-1.5 rounded-lg font-medium border ${isCompleted ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          {st}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Panel Petugas / Admin</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b text-xs font-bold text-slate-600 uppercase">
                    <th className="p-4">No. Pesanan</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Layanan</th>
                    <th className="p-4">Berat (Kg)</th>
                    <th className="p-4">Total Biaya</th>
                    <th className="p-4">Status Laundry</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {pesananList.map((p) => (
                    <tr key={p.id_pesanan} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-emerald-600">{p.id_pesanan}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{p.nama_pelanggan}</div>
                        <div className="text-xs text-slate-500">{p.no_telepon}</div>
                      </td>
                      <td className="p-4 text-slate-800">{p.nama_layanan}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={p.berat_pakaian}
                          onChange={(e) => handleUpdateAdmin(p.id_pesanan, parseFloat(e.target.value) || 0, p.status)}
                          className="w-20 px-2 py-1 border rounded-lg text-center text-slate-800 bg-white"
                        />
                      </td>
                      <td className="p-4 font-semibold text-emerald-700">Rp {p.total_biaya.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <select
                          value={p.status}
                          onChange={(e) => handleUpdateAdmin(p.id_pesanan, p.berat_pakaian, e.target.value as Pesanan['status'])}
                          className="px-3 py-1.5 border rounded-lg bg-white text-xs font-semibold text-slate-800"
                        >
                          {statusList.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}