<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Pembayaran - {{ $invoiceNumber }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            color: black;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            margin-bottom: 5px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.95;
        }
        .content {
            padding: 30px;
        }
        .invoice-info {
            background-color: #f8fafc;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 5px;
        }
        .invoice-info h2 {
            font-size: 18px;
            color: #2563eb;
            margin-bottom: 15px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #64748b;
        }
        .info-value {
            color: #1e293b;
            text-align: right;
        }
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
            margin: 25px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        .product-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .product-table th {
            background-color: #f1f5f9;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #475569;
            border-bottom: 2px solid #cbd5e1;
        }
        .product-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .product-table tr:last-child td {
            border-bottom: none;
        }
        .text-right {
            text-align: right;
        }
        .total-section {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
        }
        .total-row.grand-total {
            font-size: 20px;
            font-weight: 700;
            color: #2563eb;
            padding-top: 15px;
            border-top: 2px solid #cbd5e1;
            margin-top: 10px;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            background-color: #fef3c7;
            color: #92400e;
        }
        .payment-info {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
        }
        .payment-info h3 {
            color: #1e40af;
            margin-bottom: 12px;
            font-size: 16px;
        }
        .payment-info p {
            color: #1e3a8a;
            line-height: 1.6;
            margin-bottom: 8px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 25px;
            text-align: center;
            color: #64748b;
            font-size: 13px;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
            .header h1 {
                font-size: 24px;
            }
            .product-table {
                font-size: 14px;
            }
            .product-table th,
            .product-table td {
                padding: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="text-2xl font-bold">Invoice Pembayaran</h1>
            <p>Terima kasih atas pesanan Anda</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Invoice Information -->
            <h3 class="section-title">Informasi Invoice</h3>
            <table style="width: 100%; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Kode Booking:</td>
                    <td style="padding: 8px 0; color: #1e293b;">{{ $bookingCode }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Tanggal Pesanan:</td>
                    <td style="padding: 8px 0; color: #1e293b;">{{ $orderDate }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Status:</td>
                    <td style="padding: 8px 0; color: #1e293b;"><span class="status-badge">{{ $status }}</span></td>
                </tr>
            </table>

            <!-- Customer Information -->
            <h3 class="section-title">Informasi Pemesan</h3>
            <table style="width: 100%; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 8px 0; width: 40%; color: #64748b; font-weight: 600;">Nama:</td>
                    <td style="padding: 8px 0; color: #1e293b;">{{ $customerName }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #1e293b;">{{ $customerEmail }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">No. Telepon:</td>
                    <td style="padding: 8px 0; color: #1e293b;">{{ $customerPhone }}</td>
                </tr>
            </table>

            <!-- Product Details -->
            <h3 class="section-title">Detail Produk</h3>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th class="text-right">Harga Satuan</th>
                        <th class="text-right">Jumlah</th>
                        <th class="text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>{{ $productName }}</strong><br>
                            <span style="color: #64748b; font-size: 13px;">{{ $productBrand }}</span>
                        </td>
                        <td class="text-right">Rp {{ number_format($pricePerUnit, 0, ',', '.') }}</td>
                        <td class="text-right">{{ $quantity }}</td>
                        <td class="text-right"><strong>Rp {{ number_format($totalPrice, 0, ',', '.') }}</strong></td>
                    </tr>
                </tbody>
            </table>

            <!-- Total Section -->
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>Rp {{ number_format($totalPrice, 0, ',', '.') }}</span>
                </div>
                <div class="total-row grand-total">
                    <span>Total Pembayaran:</span>
                    <span>Rp {{ number_format($totalPrice, 0, ',', '.') }}</span>
                </div>
            </div>

            <!-- Payment Information -->
            <div class="payment-info">
                <h3>💳 Informasi Pembayaran</h3>
                <p><strong>Metode Pembayaran:</strong> {{ $paymentMethod }}</p>
                <p style="margin-top: 12px;">
                    <strong>Catatan Penting:</strong><br>
                    • Pesanan Anda akan dikonfirmasi oleh admin dalam 1x24 jam<br>
                    • Simpan kode booking Anda untuk mengecek status pesanan<br>
                    • Ambil barang dalam 7 hari setelah konfirmasi<br>
                    • Jika ada pertanyaan, hubungi customer service kami
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p style="margin-top: 15px; color: #94a3b8;">
                Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
            </p>
        </div>
    </div>
</body>
</html>
