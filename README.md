# 🧠 Simple Personality Quiz - Technical Test Project

Aplikasi **"Simple Personality Quiz"** (Tes Kepribadian Sederhana) adalah aplikasi fullstack web yang dirancang untuk kebutuhan uji teknis (technical test). Aplikasi ini menghitung skor kepribadian pengguna berdasarkan jawaban pilihan kuis tanpa database (menggunakan penyimpanan lokal `localStorage` di sisi frontend).

Aplikasi ini mengedepankan **clean code**, kemudahan dibaca, serta performa dan desain antarmuka yang premium, simpel, dan elegan tanpa bar scroll browser utama (immersif).

---

## 🛠️ Stack Teknologi

* **Frontend**: React JS (Vite) + Tailwind CSS v4 + Lucide Icons.
* **Backend**: FastAPI (Python) + Uvicorn + Pydantic.
* **Penyimpanan**: `localStorage` (untuk riwayat tes di sisi klien/frontend).

---

## 📂 Struktur Proyek Utama

Proyek terbagi menjadi dua subfolder utama:

```text
Test Case Psiko Ai/
├── README.md               # Dokumentasi utama proyek ini
├── backend/                # Server API FastAPI (Python)
│   ├── app/main.py         # Logika Endpoint GET /api/questions & POST /api/calculate
│   ├── requirements.txt    # Dependensi backend Python
│   └── README.md           # Panduan khusus menjalankan backend
└── frontend/               # Aplikasi Klien React (Vite)
    ├── src/
    │   ├── App.jsx         # Router berbasis State
    │   ├── index.css       # Konfigurasi Tailwind v4 & Google Font
    │   └── pages/          # Komponen Halaman (Quiz, Result, Admin)
    ├── package.json        # Dependensi frontend Node
    └── README.md           # Panduan khusus menjalankan frontend
```

---

## 🚀 Panduan Cepat Menjalankan Aplikasi

Anda perlu menjalankan **Backend** dan **Frontend** secara bersamaan. Ikuti petunjuk berikut:

### Langkah 1: Jalankan Backend (FastAPI)

1. Buka terminal baru dan masuk ke folder `backend`:
   ```bash
   cd backend
   ```
2. Aktifkan Virtual Environment Python:
   * **Windows (PowerShell):** `.\venv\Scripts\activate`
   * **Windows (CMD):** `venv\Scripts\activate.bat`
3. Jalankan server API:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   * *Server API akan aktif di: `http://127.0.0.1:8000`*
   * *Swagger UI dokumentasi interaktif tersedia di: `http://127.0.0.1:8000/docs`*

---

### Langkah 2: Jalankan Frontend (React)

1. Buka terminal kedua (terpisah) dan masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
2. Instal dependensi Node.js:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal Vite:
   ```bash
   npm run dev
   ```
   * *Aplikasi web frontend dapat dibuka di browser pada alamat: `http://localhost:5173`*


*Untuk detail parameter request-response API dan skema JSON penyimpanan lokal, Anda dapat membaca berkas dokumentasi internal di [backend/README.md](file:///D:/Tugas/Testing/Test%20Case%20Psiko%20Ai/backend/README.md) dan [frontend/README.md](file:///D:/Tugas/Testing/Test%20Case%20Psiko%20Ai/frontend/README.md).*
