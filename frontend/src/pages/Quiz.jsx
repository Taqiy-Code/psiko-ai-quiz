import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, HelpCircle } from 'lucide-react';
import { API_BASE_URL } from '../settings/config';

function Quiz({ userName, onComplete, onBackToHome }) {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil daftar pertanyaan');
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data.questions || []);
        setOptions(data.options || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat pertanyaan dari server. Pastikan Backend FastAPI sudah berjalan.');
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (option) => {
    const currentQuestion = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));

    // Auto-advance ke pertanyaan berikutnya setelah jeda singkat (300ms) untuk UX yang mulus
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    // Validasi: pastikan semua pertanyaan sudah dijawab
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setError(`Silakan jawab semua pertanyaan terlebih dahulu. Masih ada ${unanswered.length} pertanyaan belum terjawab.`);
      return;
    }

    setSubmitting(true);
    setError('');

    // Format payload sesuai schema backend CalculateRequest
    const payload = {
      answers: questions.map((q) => ({
        question_id: q.id,
        answer: answers[q.id],
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gagal menghitung skor dari server');
      }

      const result = await response.json();
      onComplete(result);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengirim jawaban ke server. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 animate-pulse text-sm">Memuat pertanyaan...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="max-w-md mx-auto p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-200 mb-1.5">Error Terjadi</h3>
        <p className="text-slate-450 text-xs mb-5">{error}</p>
        <button
          onClick={onBackToHome}
          className="px-5 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition text-xs font-medium cursor-pointer"
        >
          Kembali ke Menu Utama
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id] || null;
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const getIndonesianOptionLabel = (opt) => {
    switch (opt) {
      case 'Agree':
        return 'Setuju';
      case 'Neutral':
        return 'Ragu-ragu';
      case 'Disagree':
        return 'Tidak Setuju';
      default:
        return opt;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 h-full flex flex-col justify-center overflow-hidden">
      {/* Tombol Back */}
      <button
        onClick={onBackToHome}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition text-xs mb-3 group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Beranda
      </button>

      {/* Main Container Card: Dibatasi tinggi maksimum 520px agar tidak meluap */}
      <div className="bg-slate-950/30 border border-slate-800 rounded-3xl p-5 md:p-6 w-full flex flex-col justify-between max-h-[85vh] md:max-h-[520px] overflow-hidden shadow-xl">
        
        <div>
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Tes Kepribadian
            </span>
            <span className="text-xs font-medium text-slate-400">
              Pertanyaan {currentIndex + 1} dari {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Area */}
          <div className="min-h-[85px] mb-5 flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl shrink-0">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <h2 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                  {currentQuestion?.question}
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Halo, {userName}. Pilih salah satu jawaban di bawah ini:
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center gap-1.5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-4 text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Options Selection (Dibuat ringkas) */}
        <div className="grid grid-cols-1 gap-2.5 mb-5">
          {options.map((option) => {
            const isSelected = selectedAnswer === option;
            let buttonStyles = "border-slate-800 bg-slate-900/40 text-slate-350 hover:bg-slate-850 hover:border-slate-700";
            
            if (isSelected) {
              buttonStyles = "border-indigo-500 bg-indigo-500/10 text-indigo-300 shadow-sm";
            }

            return (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                disabled={submitting}
                className={`w-full py-3 px-4 text-left border rounded-xl transition-all duration-150 cursor-pointer font-semibold text-xs md:text-sm flex justify-between items-center ${buttonStyles}`}
              >
                <span>{getIndonesianOptionLabel(option)}</span>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div className="flex justify-between items-center border-t border-slate-800/80 pt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || submitting}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition text-xs text-slate-300 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Sebelumnya
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting || !selectedAnswer}
              className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition font-bold text-xs cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Kirim Jawaban'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition text-xs text-slate-300 cursor-pointer font-medium"
            >
              Lanjut
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
