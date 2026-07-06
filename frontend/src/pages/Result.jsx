import { useEffect, useRef } from 'react';
import { Award, RefreshCw, Users } from 'lucide-react';

function Result({ userName, result, sessionId, onRestart, onViewAdmin }) {
  const savedRef = useRef(false);

  // Menyimpan hasil tes ke localStorage ketika komponen dimuat
  useEffect(() => {
    if (!userName || !result || !sessionId || savedRef.current) return;

    try {
      const existingHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
      const isAlreadySaved = existingHistory.some((item) => item.sessionId === sessionId);
      
      if (!isAlreadySaved) {
        const newRecord = {
          id: Math.random().toString(36).substr(2, 9),
          sessionId: sessionId,
          name: userName,
          score: result.total_score,
          date: new Date().toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        const updatedHistory = [newRecord, ...existingHistory];
        localStorage.setItem('quiz_history', JSON.stringify(updatedHistory));
        savedRef.current = true;
      }
    } catch (err) {
      console.error('Gagal menyimpan riwayat ke localStorage', err);
    }
  }, [userName, result, sessionId]);

  const score = result?.total_score || 0;
  const percentage = Math.round((score / 30) * 100);

  // Untuk w-32 h-32 (diameter 128px):
  // cx = 64, cy = 64, r = 56 (lebar stroke 8)
  // Keliling = 2 * pi * r = 2 * 3.14159 * 56 = 351.85 (dibulatkan 352)
  const strokeDasharray = 352;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 h-full flex flex-col justify-center overflow-hidden">
      {/* Container Utama: Tinggi dibatasi max-h-[520px] agar pas di layar tanpa scroll */}
      <div className="bg-slate-950/30 border border-slate-800 rounded-3xl p-5 md:p-6 w-full flex flex-col justify-between max-h-[85vh] md:max-h-[520px] overflow-hidden shadow-xl text-center">

        <div>
          {/* Ikon Sukses (Diperkecil) */}
          <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm mb-3">
            <Award className="w-6 h-6 text-white" />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
            Selamat! Tes Selesai
          </p>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-100 mb-4 tracking-tight">
            Hasil Perhitungan Skor
          </h1>

          {/* Visualisasi Skor - Circular Gauge Ringkas (w-32 h-32) */}
          <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                className="stroke-indigo-500 transition-all duration-1000 ease-out"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Skor Total</span>
              <span className="text-[8px] text-slate-500">Maks. 30</span>
            </div>
          </div>

          {/* User Card (Diperkecil) */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl py-2 px-4 mb-4 max-w-[240px] mx-auto">
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Nama Peserta</p>
            <p className="text-base font-bold text-slate-200 truncate">{userName}</p>
          </div>
        </div>

        {/* Laporan Deskripsi Pendek */}
        <div className="text-slate-400 text-xs max-w-xs mx-auto mb-4 leading-relaxed">
          Skor dihitung berdasarkan pilihan jawaban Anda (Setuju = 3, Ragu-ragu = 2, Tidak Setuju = 1).
        </div>

        {/* Aksi Navigasi */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition text-slate-200 cursor-pointer font-bold text-xs w-full"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Ulangi Tes
          </button>
          
          <button
            onClick={onViewAdmin}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-sm transition cursor-pointer font-bold text-xs w-full"
          >
            <Users className="w-3.5 h-3.5" />
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
