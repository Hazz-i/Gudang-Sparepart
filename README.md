# 📦 Gudang Sparepart - Sistem Manajemen Inventori

Aplikasi manajemen gudang sparepart yang dibangun dengan **Laravel 12** (Backend) dan **React + Inertia.js** (Frontend). Aplikasi ini menyediakan fitur manajemen produk, order, dan autentikasi pengguna dengan dukungan two-factor authentication.

## 🚀 Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 19 + TypeScript
- **UI Framework:** Tailwind CSS 4 + Radix UI
- **State Management:** TanStack Query
- **Routing:** Inertia.js
- **Authentication:** Laravel Fortify
- **Database:** MySQL/PostgreSQL
- **Build Tool:** Vite
- **Containerization:** Docker

## 📋 Prerequisites

Pastikan sistem Anda telah memiliki:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.x
- **npm** atau **pnpm**
- **MySQL** >= 8.0 atau **PostgreSQL** >= 13
- **Git**

**Atau gunakan Docker** (Lebih mudah - direkomendasikan)

- **Docker** >= 20.10
- **Docker Compose** >= 2.0

---

## 🔧 Instalasi

### Metode 1: Instalasi dengan Docker (Direkomendasikan) 🐳

#### 1. Clone Repository

```bash
git clone https://github.com/username/gudang-sparepart.git
cd gudang-sparepart
```

#### 2. Setup Environment

```bash
# Copy file .env.example menjadi .env
cp .env.example .env

# Edit .env sesuai kebutuhan (opsional)
# Database sudah otomatis dikonfigurasi untuk Docker
```

#### 3. Jalankan Setup Docker

**Windows PowerShell:**
```bash
.\docker.bat setup
```

**Linux/Mac/Zima OS:**
```bash
chmod +x docker.sh
./docker.sh setup
```

Proses ini akan:
- Build Docker image
- Install dependencies (Composer & npm)
- Generate application key
- Run migrations
- Seed database
- Build frontend assets

#### 4. Akses Aplikasi

Buka browser dan akses:
```
http://localhost:9090
```

---

### Metode 2: Instalasi Manual (Tanpa Docker) 💻

#### 1. Clone Repository

```bash
git clone https://github.com/username/gudang-sparepart.git
cd gudang-sparepart
```

#### 2. Install Dependencies Backend

```bash
composer install
```

#### 3. Setup Environment

```bash
# Copy .env.example ke .env
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gudang_sparepart
DB_USERNAME=root
DB_PASSWORD=
```

#### 5. Run Migrations & Seeding

```bash
# Buat database terlebih dahulu, lalu jalankan:
php artisan migrate --seed
```

#### 6. Link Storage

```bash
php artisan storage:link
```

#### 7. Install Dependencies Frontend

```bash
npm install
# atau
pnpm install
```

#### 8. Build Frontend (Production)

```bash
npm run build:ssr
# atau untuk development
npm run dev
```

#### 9. Jalankan Server

**Terminal 1 - Backend:**
```bash
php artisan serve
```

**Terminal 2 - Frontend (jika development):**
```bash
npm run dev
```

#### 10. Akses Aplikasi

- **Development:** http://localhost:5173
- **Production:** http://localhost:8000

---

## 🐳 Docker Commands

Untuk pengelolaan aplikasi dengan Docker, gunakan script helper berikut:

### Windows PowerShell

```bash
# Setup pertama kali
.\docker.bat setup

# Start aplikasi
.\docker.bat start

# Stop aplikasi
.\docker.bat stop

# Restart aplikasi
.\docker.bat restart

# Update setelah perubahan kode
.\docker.bat update

# Rebuild image (setelah update dependencies)
.\docker.bat rebuild

# Cleanup (hapus container/image tidak terpakai)
.\docker.bat cleanup

# Lihat logs
.\docker.bat logs

# Masuk ke container
.\docker.bat shell
```

### Linux/Mac/Zima OS

```bash
# Setup pertama kali
./docker.sh setup

# Start aplikasi
./docker.sh start

# Stop aplikasi
./docker.sh stop

# Restart aplikasi
./docker.sh restart

# Update setelah perubahan kode
./docker.sh update

# Rebuild image (setelah update dependencies)
./docker.sh rebuild

# Cleanup (hapus container/image tidak terpakai)
./docker.sh cleanup

# Lihat logs
./docker.sh logs

# Masuk ke container
./docker.sh shell
```

**📘 Untuk dokumentasi lengkap Docker, lihat:** [DOCKER-GUIDE.md](DOCKER-GUIDE.md)

---

## 🛠️ Development

### Menjalankan Development Server

```bash
# Backend (Laravel)
php artisan serve

# Frontend (Vite)
npm run dev
```

### Code Quality

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint & fix
npm run lint

# Type checking
npm run types

# Laravel Pint (PHP formatting)
./vendor/bin/pint
```

### Testing

```bash
# Run all tests
php artisan test

# atau dengan Pest
./vendor/bin/pest

# Run specific test
./vendor/bin/pest --filter=UserTest
```

---

## 📁 Struktur Folder Penting

```
gudang-sparepart/
├── app/
│   ├── Http/Controllers/     # Controllers
│   ├── Models/               # Eloquent Models
│   ├── services/             # Business Logic Services
│   └── Rules/                # Custom Validation Rules
├── database/
│   ├── migrations/           # Database Migrations
│   └── seeders/              # Database Seeders
├── resources/
│   ├── js/                   # React Frontend
│   │   ├── components/       # React Components
│   │   ├── pages/            # Inertia Pages
│   │   ├── layouts/          # Layout Components
│   │   └── types/            # TypeScript Types
│   └── css/                  # Stylesheets
├── routes/
│   └── web.php               # Web Routes
├── public/                   # Public Assets
└── storage/                  # File Storage
```

---

## 🔑 Fitur Utama

- ✅ **Autentikasi & Otorisasi** (Laravel Fortify)
- ✅ **Two-Factor Authentication (2FA)**
- ✅ **Manajemen Produk**
- ✅ **Manajemen Order**
- ✅ **UI Modern** dengan Radix UI & Tailwind CSS
- ✅ **Server-Side Rendering (SSR)** dengan Inertia.js
- ✅ **Type-Safe** dengan TypeScript
- ✅ **Docker Support**
- ✅ **Chatbot Integration** (Gemini AI)

---

## 🔐 Default Credentials

Setelah seeding, Anda dapat login dengan:

```
Email: admin@example.com
Password: password
```

> ⚠️ **Penting:** Segera ubah password default pada environment production!

---

## 🌐 Environment Variables

Konfigurasi penting di file `.env`:

```env
# Application
APP_NAME="Gudang Sparepart"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gudang_sparepart
DB_USERNAME=root
DB_PASSWORD=

# Gemini AI (opsional)
GEMINI_API_KEY=your_api_key_here
```

---

## 📝 Common Issues & Solutions

### Issue: Port sudah digunakan

**Solusi:** Ubah port di `.env` atau `docker-compose.yml`

```env
# Untuk instalasi manual
APP_PORT=8080

# Untuk Docker, edit docker-compose.yml:
ports:
  - '8080:9090'
```

### Issue: Permission denied (Linux/Mac)

**Solusi:**
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $USER:www-data storage bootstrap/cache
```

### Issue: npm install error

**Solusi:**
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Issue: Database connection error

**Solusi:** Pastikan MySQL/PostgreSQL sudah berjalan dan kredensial di `.env` benar.

---

## 🤝 Contributing

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 License

Project ini menggunakan lisensi [MIT License](LICENSE).

