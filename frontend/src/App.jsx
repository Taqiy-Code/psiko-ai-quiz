import { useState } from 'react';
import { Brain, User, Play, Users, ClipboardCheck, Clock } from 'lucide-react';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'quiz' | 'result' | 'admin'
  const [userName, setUserName] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    // Generate unique ID untuk sesi kuis ini (digunakan untuk mencegah duplikasi di localStorage)
    const newSessionId = Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    setSessionId(newSessionId);
    setCurrentPage('quiz');
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setCurrentPage('result');
  };

  const handleRestart = () => {
    // Reset state kuis tapi simpan nama untuk kenyamanan
    setSessionId(null);
    setQuizResult(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-200 bg-slate-900 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {currentPage === 'home' && (
        <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-100">
                Quiz Kepribadian
              </span>
            </div>
            
            <button
              onClick={() => setCurrentPage('admin')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-sm font-semibold text-slate-200 cursor-pointer"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              Dashboard Admin
            </button>
          </div>
        </header>
      )}

      <main className={`grow flex items-center justify-center ${currentPage === 'quiz' || currentPage === 'result' || currentPage === 'admin' ? 'h-screen max-h-screen overflow-hidden py-0' : 'py-12'}`}>
        {currentPage === 'home' && (
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-6 text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Temukan Kecenderungan <br />
                <span className="text-indigo-400">Gaya Berpikir Anda</span>
              </h1>
              
              <p className="text-slate-450 text-base md:text-lg leading-relaxed max-w-lg">
                Ikuti tes kepribadian sederhana kami. Jawab dengan pilihan yang paling sesuai untuk melihat kalkulasi skor kecenderungan berpikir Anda secara instan.
              </p>

              {/* Fitur List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-850 border border-slate-800 text-slate-300 rounded-lg shrink-0">
                    <ClipboardCheck className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">10 Pertanyaan</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Pertanyaan ringkas & padat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-850 border border-slate-800 text-slate-300 rounded-lg shrink-0">
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Waktu Singkat</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Hasil skor langsung dihitung</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 w-full">
              <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-6 md:p-8 relative">
                
                <h3 className="text-xl font-bold text-slate-100 mb-2">Mulai Tes</h3>
                <p className="text-slate-500 text-xs mb-6">
                  Masukkan nama Anda untuk memulai kuis.
                </p>

                <form onSubmit={handleStartQuiz} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4.5 h-4.5" />
                      </span>
                      <input
                        id="name-input"
                        type="text"
                        required
                        placeholder="Contoh: Taqiy Jayya"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 placeholder-slate-600 outline-none text-sm transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!userName.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold rounded-xl shadow-md transition cursor-pointer text-sm"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Mulai Tes Sekarang
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

        {currentPage === 'quiz' && (
          <Quiz
            userName={userName}
            onComplete={handleQuizComplete}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'result' && (
          <Result
            userName={userName}
            result={quizResult}
            sessionId={sessionId}
            onRestart={handleRestart}
            onViewAdmin={() => setCurrentPage('admin')}
          />
        )}

        {currentPage === 'admin' && (
          <Admin
            onBackToHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* FOOTER KONDISIONAL */}
      {currentPage === 'home' && (
        <footer className="border-t border-slate-800 py-4 bg-slate-950/20 text-center text-xs text-slate-500 w-full mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>© {new Date().getFullYear()} PsikoQuiz App. Technical Test Case.</p>
            <p>Built with FastAPI & React JS + Tailwind CSS</p>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;
