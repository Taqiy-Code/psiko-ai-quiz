# 🐍 Simple Personality Quiz API - Backend

Repositori ini berisi kode backend untuk aplikasi "Simple Personality Quiz" menggunakan **FastAPI** (Python). Backend ini bertanggung jawab untuk menyediakan daftar pertanyaan kuis kepribadian dan melakukan perhitungan skor jawaban untuk menentukan tipe kepribadian pengguna.

---

## 🛠️ Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* **Python 3.8 ke atas** (Virtual Environment sudah disediakan di dalam folder `venv`).

---

## 🚀 Cara Menjalankan Server API

Ikuti langkah-langkah di bawah ini untuk menginstal dependensi dan menjalankan server FastAPI:

### 1. Masuk ke Direktori Backend
Buka terminal (Command Prompt atau PowerShell) dan masuk ke direktori backend:
```powershell
cd backend
```

### 2. Aktifkan Virtual Environment
Aktifkan Virtual Environment yang sudah tersedia untuk mengisolasi dependensi proyek:
* **Di Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\activate
  ```
* **Di Windows (Command Prompt):**
  ```cmd
  venv\Scripts\activate.bat
  ```

*(Setelah aktif, Anda akan melihat tanda `(venv)` di depan baris terminal Anda).*

### 3. Instal Dependensi
Instal pustaka Python yang diperlukan (seperti FastAPI, Uvicorn, dan Pydantic) dari `requirements.txt`:
```powershell
pip install -r requirements.txt
```

### 4. Jalankan Server FastAPI
Mulai server development lokal menggunakan Uvicorn:
```powershell
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Server API sekarang berjalan di: **`http://127.0.0.1:8000`**

---

## 📖 Dokumentasi API (Swagger UI)
FastAPI secara otomatis menyediakan antarmuka Swagger yang interaktif untuk menguji API. Setelah server berjalan, Anda dapat mengakses dokumentasi tersebut di browser Anda pada alamat:
👉 **`http://127.0.0.1:8000/docs`**

---

## 🔌 Daftar Endpoint API

### 1. GET `/api/questions`
Mengambil daftar 10 pertanyaan tes kepribadian beserta pilihan jawaban yang tersedia.
* **Response Contoh:**
  ```json
  {
    "questions": [
      {
        "id": 1,
        "question": "Saya lebih suka bekerja secara mandiri daripada dalam tim."
      }
    ],
    "options": [
      "Agree",
      "Neutral",
      "Disagree"
    ]
  }
  ```

### 2. POST `/api/calculate`
Mengirim array jawaban pengguna untuk dihitung skor totalnya.
* **Request Body Contoh:**
  ```json
  {
    "answers": [
      { "question_id": 1, "answer": "Agree" },
      { "question_id": 2, "answer": "Neutral" }
    ]
  }
  ```
* **Response Contoh:**
  ```json
  {
    "total_score": 25
  }
  ```
