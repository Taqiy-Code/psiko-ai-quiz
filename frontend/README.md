# ⚛️ Simple Personality Quiz - Frontend (React + Vite + Tailwind CSS v4)

Repositori ini berisi kode frontend untuk aplikasi "Simple Personality Quiz" yang dibangun menggunakan **React JS (Vite)** dan dipoles menggunakan **Tailwind CSS v4** serta ikon **Lucide React**.

---

## 🛠️ Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* **Node.js** (versi 18 ke atas direkomendasikan)
* **npm** (biasanya otomatis terinstal bersama Node.js)

---

## 🚀 Cara Menjalankan Aplikasi Frontend

Ikuti langkah-langkah di bawah ini untuk menginstal dependensi dan menjalankan server frontend secara lokal:

### 1. Masuk ke Direktori Frontend
Buka terminal baru (Command Prompt, PowerShell, atau terminal VS Code) dan masuk ke direktori frontend:
```powershell
cd frontend
```

### 2. Instal Dependensi
Instal modul Node.js yang didefinisikan di `package.json` (termasuk Tailwind CSS v4 dan Lucide Icons):
```powershell
npm install
```

### 3. Jalankan Development Server
Jalankan server pengembangan Vite secara lokal:
```powershell
npm run dev
```

Aplikasi web sekarang dapat diakses melalui browser pada alamat default:
👉 **`http://localhost:5173`** (atau port lain yang diinfokan di terminal Anda).

---

## 🏗️ Struktur Halaman Utama (Views)

Aplikasi ini menggunakan perutean modular berbasis state (`useState`) untuk beralih layar secara lancar:

1. **Halaman Beranda (Home)**: Formulir memasukkan nama lengkap sebelum memulai kuis, dengan tombol navigasi ke Dashboard Admin.
2. **Halaman Tes (Quiz)**: Menampilkan satu pertanyaan pada satu waktu dengan Progress Bar yang dinamis. Pilihan jawaban berupa tombol interaktif dengan penanda sederhana berwarna indigo saat terpilih.
3. **Halaman Hasil (Result)**: Menampilkan total skor Anda dengan visualisasi *circular gauge* (lingkaran progress) yang bersih dan elegan berbasis warna indigo solid.
4. **Halaman Admin (Admin/Dashboard)**: Menampilkan statistik performa kuis (Total peserta, skor rata-rata), tabel riwayat lengkap (No, Nama, Tanggal, Skor), kolom pencarian nama peserta, serta kontrol untuk menghapus catatan individu atau membersihkan seluruh riwayat tes.

---

## 💾 Penyimpanan Riwayat Lokal (localStorage)
Setelah backend mengembalikan skor, frontend akan langsung menyimpannya ke `localStorage` dengan format berikut:
* **Key**: `quiz_history`
* **Format Data**:
  ```json
  [
    {
      "id": "abc123xyz",
      "sessionId": "def456_1720253456",
      "name": "Taqiy Jayya",
      "score": 25,
      "date": "6 Juli 2026, 21.22"
    }
  ]
  ```

---

## ⚠️ Catatan Konektivitas (CORS)
Frontend ini diatur untuk meminta data dari server API lokal di **`http://127.0.0.1:8000`**. Pastikan Anda telah menjalankan aplikasi **Backend FastAPI** terlebih dahulu sebelum memulai tes agar pengambilan data pertanyaan dan penghitungan skor tidak mengalami kegagalan.
