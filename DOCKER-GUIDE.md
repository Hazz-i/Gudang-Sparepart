# 🐳 Docker Management Guide - Gudang Sparepart

## 📋 Step-by-Step untuk Berbagai Skenario

### 🆕 1. **PERTAMA KALI SETUP** (Belum pernah jalankan)

```bash
# Windows PowerShell
.\docker.bat setup

# Linux/Mac/Zima OS
chmod +x docker.sh
./docker.sh setup
```

**Proses:**

- Build image dari Dockerfile
- Start container
- Run migrations & seeding
- Set permissions

---

### ▶️ 2. **START APLIKASI** (Setelah stop/restart server)

```bash
# Windows
.\docker.bat start

# Linux/Mac/Zima OS
./docker.sh start
```

**Kapan:** Container sudah ada, tinggal start ulang

---

### 🔄 3. **UPDATE KODE** (Edit PHP/Blade/Routes)

```bash
# Windows
.\docker.bat update

# Linux/Mac/Zima OS
./docker.sh update
```

**Proses:**

- Clear cache
- Run migrations
- Rebuild cache
- Restart PHP-FPM

**TIDAK perlu rebuild image!** ⚡ Cepat (1-2 detik)

---

### 🔨 4. **REBUILD IMAGE** (Update composer.json/package.json/Dockerfile)

```bash
# Windows
.\docker.bat rebuild

# Linux/Mac/Zima OS
./docker.sh rebuild
```

**Kapan:**

- Tambah/update package composer
- Tambah/update package npm
- Ubah Dockerfile
- Update PHP version

**Proses:** Build ulang image dari awal (lebih lama)

---

### 🧹 5. **CLEANUP** (Hapus container lama yang menumpuk)

```bash
# Windows
.\docker.bat cleanup

# Linux/Mac/Zima OS
./docker.sh cleanup
```

**Menghapus:**

- Container yang sudah stop
- Image yang tidak terpakai
- Volume yang tidak terpakai

---

### 🛑 6. **STOP APLIKASI**

```bash
# Windows
.\docker.bat stop

# Linux/Mac/Zima OS
./docker.sh stop
```

---

### 📊 7. **CEK STATUS**

```bash
# Windows
.\docker.bat status

# Linux/Mac/Zima OS
./docker.sh status
```

---

### 📝 8. **LIHAT LOGS**

```bash
# Container logs
.\docker.bat logs      # Windows
./docker.sh logs       # Linux

# Laravel logs
./docker.sh laravel-logs  # Linux only
```

---

### 💻 9. **AKSES SHELL CONTAINER**

```bash
# Windows
.\docker.bat shell

# Linux/Mac/Zima OS
./docker.sh shell
```

---

### ⚙️ 10. **RUN ARTISAN COMMAND**

```bash
# Windows
.\docker.bat artisan migrate
.\docker.bat artisan db:seed

# Linux/Mac/Zima OS
./docker.sh artisan migrate
./docker.sh artisan cache:clear
```

---

## 🎯 Workflow Paling Efisien

### **Skenario 1: Edit Kode PHP/Blade**

```bash
# Edit file di editor
# Lalu:
.\docker.bat update
```

✅ Tidak perlu rebuild, cukup update!

---

### **Skenario 2: Tambah Package Composer**

```bash
# Edit composer.json
# Lalu:
.\docker.bat rebuild
```

⚠️ Perlu rebuild karena dependencies berubah

---

### **Skenario 3: Server Restart**

```bash
.\docker.bat start
```

✅ Container sudah ada, tinggal start

---

### **Skenario 4: Bersihkan Container Lama**

```bash
# Setiap 1-2 minggu sekali
.\docker.bat cleanup
```

🧹 Hindari penumpukan container

---

## ⚡ Tips Performa

### **Gunakan Volume dengan Benar**

✅ Code di volume = no rebuild needed
✅ Vendor/node_modules di volume = faster install

### **Jangan Rebuild Kalau Tidak Perlu**

❌ Edit PHP → Rebuild (SALAH)
✅ Edit PHP → Update (BENAR)

### **Cleanup Berkala**

```bash
# Setiap minggu
docker system prune -a --volumes -f
```

---

## 🚀 Production di Zima OS

### **Deploy Pertama Kali:**

```bash
cd /DATA/AppData/gudang-sparepart
./docker.sh setup
```

### **Update Kode (Deploy Baru):**

```bash
# Upload code baru
# Lalu:
./docker.sh update
```

### **Monitor:**

```bash
./docker.sh status
./docker.sh logs
```

---

## 📌 Cheat Sheet

| Aksi               | Command   | Rebuild? |
| ------------------ | --------- | -------- |
| Edit PHP/Blade     | `update`  | ❌ No    |
| Edit Routes        | `update`  | ❌ No    |
| Edit Config        | `update`  | ❌ No    |
| Tambah Package     | `rebuild` | ✅ Yes   |
| Edit Dockerfile    | `rebuild` | ✅ Yes   |
| Update PHP Version | `rebuild` | ✅ Yes   |
| Migration Baru     | `update`  | ❌ No    |
| Server Restart     | `start`   | ❌ No    |

---

## ⚠️ Troubleshooting

### Container tidak mau stop?

```bash
docker stop gudang-sparepart-app -t 30
docker rm gudang-sparepart-app -f
```

### Image menumpuk?

```bash
docker images | grep gudang-sparepart
docker rmi <image-id> -f
```

### Disk penuh?

```bash
docker system df
docker system prune -a --volumes
```

---

**Dibuat untuk:** Gudang Sparepart Management System
**Platform:** Windows / Linux / Zima OS
