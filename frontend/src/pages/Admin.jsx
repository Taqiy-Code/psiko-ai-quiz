import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Search, Users, BarChart3 } from 'lucide-react';

function Admin({ onBackToHome }) {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load history dari localStorage
  useEffect(() => {
    const data = localStorage.getItem('quiz_history');
    if (data) {
      try {
        setHistory(JSON.parse(data));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleDeleteRecord = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      const updatedHistory = history.filter((item) => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem('quiz_history', JSON.stringify(updatedHistory));
    }
  };

  const handleClearAll = () => {
    if (confirm('Apakah Anda yakin ingin menghapus SELURUH riwayat tes? Tindakan ini tidak dapat dibatalkan.')) {
      setHistory([]);
      localStorage.removeItem('quiz_history');
    }
  };

  // Filter history berdasarkan query pencarian nama
  const filteredHistory = history.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Kalkulasi statistik sederhana
  const totalParticipants = history.length;
  const averageScore = totalParticipants
    ? (history.reduce((sum, item) => sum + item.score, 0) / totalParticipants).toFixed(1)
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 h-full flex flex-col justify-center overflow-hidden">
      {/* Tombol Back */}
      <button
        onClick={onBackToHome}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition text-xs mb-3 group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Beranda
      </button>

      {/* Main Container Card: Dibatasi tinggi maks agar tidak memicu scrollbar browser */}
      <div className="bg-slate-950/30 border border-slate-800 rounded-3xl p-5 md:p-6 w-full flex flex-col justify-between max-h-[82vh] md:max-h-[550px] overflow-hidden shadow-xl">
        
        <div>
          {/* Header Panel */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 border-b border-slate-800/80 pb-3">
            <div className="text-left">
              <h1 className="text-xl font-extrabold text-slate-100 tracking-tight m-0">
                Halaman Admin
              </h1>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Riwayat hasil tes kepribadian pengguna.
              </p>
            </div>

            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition text-[10px] font-medium cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Semua
              </button>
            )}
          </div>

          {/* Grid Statistik Ringkas (Tinggi Padat) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 bg-slate-850 border border-slate-800 rounded-lg">
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Total Peserta</p>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">{totalParticipants}</h3>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 bg-slate-850 border border-slate-800 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Rata-rata Skor</p>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">{averageScore} <span className="text-[10px] font-medium text-slate-500">/30</span></h3>
              </div>
            </div>
          </div>
        </div>

        {/* Area Tabel dengan Fitur Cari */}
        <div className="flex-grow flex flex-col min-h-0 bg-slate-900/30 border border-slate-800 rounded-2xl p-4 overflow-hidden">
          
          {/* Fitur Search */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-3 shrink-0">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Cari nama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 placeholder-slate-650 outline-none text-xs transition-all"
              />
            </div>
            <div className="text-[10px] text-slate-500 font-medium self-center">
              Menampilkan {filteredHistory.length} dari {totalParticipants} catatan
            </div>
          </div>

          {/* Tabel Riwayat dengan scrollbar vertikal internal (max-h-56) */}
          <div className="overflow-y-auto overflow-x-auto flex-grow rounded-lg border border-slate-800 max-h-[180px] md:max-h-[220px] min-h-0 bg-slate-950/20">
            <table className="w-full border-collapse text-left text-xs text-slate-350">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[9px] font-bold border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-center w-12 bg-slate-900">No</th>
                  <th className="px-4 py-2.5 font-semibold bg-slate-900">Nama Peserta</th>
                  <th className="px-4 py-2.5 font-semibold bg-slate-900">Tanggal Tes</th>
                  <th className="px-4 py-2.5 font-semibold text-center w-24 bg-slate-900">Skor</th>
                  <th className="px-4 py-2.5 font-semibold text-center w-16 bg-slate-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/5">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-850/40 transition">
                        <td className="px-4 py-2.5 text-center font-medium text-slate-550">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2.5 font-bold text-slate-200 truncate max-w-[120px]">
                          {item.name}
                        </td>
                        <td className="px-4 py-2.5 text-slate-500 text-[10px]">
                          {item.date}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-800 text-slate-200 border border-slate-750">
                            {item.score} / 30
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() => handleDeleteRecord(item.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition cursor-pointer"
                            title="Hapus Catatan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="w-8 h-8 text-slate-700 mb-2" />
                        <p className="text-xs font-semibold text-slate-400">Tidak ada riwayat</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          {searchQuery ? 'Gunakan pencarian lain.' : 'Belum ada peserta yang mengambil tes.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Admin;
