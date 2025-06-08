// Ganti fungsi ini dengan yang baru
function tampilkanKeranjang() {
  const daftarKeranjang = document.getElementById("daftar-keranjang");
  const totalHargaElement = document.getElementById("total-harga");
  
  daftarKeranjang.innerHTML = "";
  
  let total = 0;
  
  keranjang.forEach((item, index) => {
    const subtotal = item.harga * (item.jumlah || 1);
    total += subtotal;
    
    const li = document.createElement("li");
    li.className = "keranjang-item";
    li.innerHTML = `
      <div class="produk-info">
        <span class="nama-produk">${item.nama}</span>
        <span class="harga-satuan">Rp${item.harga.toLocaleString()}</span>
      </div>
      <div class="jumlah-control">
        <button class="jumlah-btn" onclick="kurangiJumlah(${index})">-</button>
        <span class="jumlah">${item.jumlah || 1}</span>
        <button class="jumlah-btn" onclick="tambahJumlah(${index})">+</button>
      </div>
      <div class="subtotal">
        <span>Rp${subtotal.toLocaleString()}</span>
        <button class="hapus-btn" onclick="hapusProduk(${index})">
          <img src="images/delete-icon.png" alt="Hapus">
        </button>
      </div>
    `;
    
    daftarKeranjang.appendChild(li);
  });
  
  totalHargaElement.textContent = total.toLocaleString();
}

function hapusDariKeranjang(index) {
  if (keranjang[index].jumlah > 1) {
    keranjang[index].jumlah -= 1;
  } else {
    keranjang.splice(index, 1);
  }

  simpanKeranjang();
  tampilkanKeranjang();
}

// Event listener untuk semua tombol BELI
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("button-beli")) {
    e.preventDefault();
    const artikel = e.target.closest("article");

    if (!artikel) return;

    const namaProduk = artikel.querySelector("h3")?.textContent.trim();
    const hargaText = artikel.querySelector("p:last-of-type")?.textContent.replace(/[^\d]/g, "");
    const harga = parseInt(hargaText || "0");

    if (namaProduk && harga) {
      tambahKeKeranjang(namaProduk, harga);
    }
  }
});
function tambahJumlah(index) {
  keranjang[index].jumlah += 1;
  simpanKeranjang();
  tampilkanKeranjang();
}

function kurangiJumlah(index) {
  if (keranjang[index].jumlah > 1) {
    keranjang[index].jumlah -= 1;
  } else {
    if (confirm(`Jumlah hanya 1. Hapus ${keranjang[index].nama} dari keranjang?`)) {
      keranjang.splice(index, 1);
    }
  }
  simpanKeranjang();
  tampilkanKeranjang();
}

function hapusProduk(index) {
  if (confirm(`Yakin ingin menghapus ${keranjang[index].nama} dari keranjang?`)) {
    keranjang.splice(index, 1);
    simpanKeranjang();
    tampilkanKeranjang();
  }
}

// Tampilkan halaman beranda saat pertama kali
tampilkan("beranda");
function checkoutWhatsApp() {
  // Format nomor WhatsApp (gunakan nomor penjual sebenarnya)
  const phoneNumber = "6289657607756"; // Ganti dengan nomor penjual
  
  // Membuat daftar produk
  let productList = "";
  keranjang.forEach(item => {
    productList += `- ${item.nama} (${item.jumlah}x) : Rp${(item.harga * item.jumlah).toLocaleString()}\n`;
  });
  
  // Hitung total
  const total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
  
  // Buat pesan
  const message = `Halo, saya ingin memesan:\n\n${productList}\nTotal: Rp${total.toLocaleString()}\n\nApakah produk ini tersedia?`;
  
  // Encode pesan untuk URL
  const encodedMessage = encodeURIComponent(message);
  
  // Buka WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}