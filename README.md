# LANDING PAGE CHẢ LỤI LẠC HỒNG (BIÊN HÒA FOOD REVIEWER)

Landing page giới thiệu và đánh giá ẩm thực **Chả Lụi Lạc Hồng** (Biên Hòa, Đồng Nai) – Đạt chuẩn production-ready, siêu nhẹ, tối ưu SEO, chuẩn WCAG Accessibility và tự động hóa CI/CD deploy lên GitHub Pages với custom domain `chaluilachong.share4happy.com`.

---

## 1. CÔNG NGHỆ SỬ DỤNG

- **Nền tảng build:** [Vite](https://vite.dev/) (Vanilla Template).
- **Ngôn ngữ:** HTML5 Semantic + CSS3 Hiện đại (CSS Variables / Design Tokens, Flexbox, CSS Grid) + JavaScript ES Modules.
- **Không dùng:** React/Vue, TypeScript, Tailwind CSS, Bootstrap hay bất kỳ UI framework bên thứ 3 nào. Toàn bộ Carousel, Tab lọc, FAQ Accordion, Menu di động, Rating và Form đều được viết thuần (Vanilla), tối ưu tốc độ tải trang cao nhất.
- **Yêu cầu Node.js:** Node.js `>= 20.0.0` (Khuyên dùng bản LTS v22.x).

---

## 2. CẤU TRÚC THƯ MỤC

```
chaluilachong/
├── index.html                    # File HTML chính chứa đầy đủ 10 Section & SEO tags
├── vite.config.js                # Cấu hình Vite (base: '/' cho custom domain)
├── package.json                  # Khai báo scripts & dependencies
├── .env.example                  # Mẫu biến môi trường
├── .env                          # Biến môi trường local
├── .gitignore                    # Bỏ qua node_modules, dist, .env
├── .github/
│   └── workflows/
│       └── deploy.yml            # Tự động build & deploy lên GitHub Pages qua GitHub Actions
├── public/                       # File tĩnh phục vụ trực tiếp
│   ├── CNAME                     # Khai báo domain chaluilachong.share4happy.com
│   ├── robots.txt                # Cấu hình bot tìm kiếm
│   ├── sitemap.xml               # Sơ đồ trang web
│   ├── 404.html                  # Trang lỗi 404 tùy chỉnh
│   ├── favicon.svg               # Favicon vector ngọn lửa thương hiệu
│   └── og-image.svg              # Ảnh chia sẻ Open Graph (1200x630)
├── src/
│   ├── assets/
│   │   └── images/               # Thư mục để bạn thả ảnh chụp thật vào
│   ├── styles/
│   │   ├── tokens.css            # Biến màu sắc, font, radius, spacing, shadows
│   │   ├── base.css              # Reset CSS, typography, layout container
│   │   ├── components.css        # Buttons, Badges, Placeholder, Rating, Toasts
│   │   └── sections/             # CSS riêng biệt cho từng section
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── top-quan.css
│   │       ├── vi-ngon.css
│   │       ├── cach-an.css
│   │       ├── danh-gia.css
│   │       ├── reviews-form.css
│   │       ├── faq.css
│   │       ├── posts-carousel.css
│   │       └── footer.css
│   └── scripts/
│       ├── config.js             # Cấu hình URL API, webhook, domain
│       ├── images.js             # Quản lý hình ảnh và placeholder tập trung
│       ├── menu.js               # Xử lý mobile menu & smooth scroll
│       ├── tabs.js               # Xử lý tab lọc quán, tab bước cuốn & FAQ
│       ├── posts.js              # Xử lý API WordPress 5 bài & Carousel trôi chậm
│       ├── form.js               # Xử lý form gửi review, bookmark, like, copy link
│       └── main.js               # Điểm kết nối tất cả các modules
└── docs/
    ├── PROJECT_NOTES.md          # Tài liệu phân tích kỹ thuật chi tiết
    └── ASSETS_TODO.md            # Bảng theo dõi danh mục hình ảnh
```

---

## 3. HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### 3.1. Cài đặt dependencies
```bash
npm install
```

### 3.2. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Trình duyệt sẽ tự động mở trang tại `http://localhost:5173/`.

### 3.3. Build bản Production
```bash
npm run build
```
Kết quả build được tạo trong thư mục `dist/` (kích thước nén gzip chỉ ~24kB cho toàn trang!).

### 3.4. Chạy thử bản Build (Preview)
```bash
npm run preview
```

---

## 4. QUY TẮC "KHUNG TRƯỚC, ẢNH SAU" & CÁCH THAY ẢNH THẬT

Trang web đã được thiết kế sẵn khung layout chính xác tuyệt đối theo 9 ảnh giao diện. Khi chưa có ảnh thật, hệ thống tự động hiển thị placeholder màu trung tính giữ nguyên kích thước, `aspect-ratio` và không làm vỡ bố cục.

Khi bạn có ảnh chụp thật, chỉ cần đặt ảnh đúng tên file vào thư mục `src/assets/images/`:
- `hero-chaluimet.png` (Mẹt chả lụi Lạc Hồng đầy đủ - tỉ lệ 4:3)
- `quan-co-yen.jpg` (Quán Cô Yến - 640x360 tỉ lệ 16:9)
- `quan-lac-hong-15k.jpg` (Quán 15K cổng trường ĐH Lạc Hồng - 640x360 tỉ lệ 16:9)
- `quan-ba-bay.jpg` (Quán Bà Bảy góc Huỳnh Văn Nghệ - 640x360 tỉ lệ 16:9)
- `step-1-banh-trang-rau.png` (Minh họa bước 1)
- `step-2-kep-cha-ram.png` (Minh họa bước 2)
- `step-3-cham-sot.png` (Minh họa bước 3)

Hệ thống tại `src/scripts/images.js` sẽ tự động phát hiện và hiển thị ảnh thật ngay lập tức mà không cần sửa bất kỳ dòng HTML hay CSS nào!

---

## 5. HƯỚNG DẪN BẬT GITHUB PAGES VỚI CUSTOM DOMAIN

1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: complete chaluilachong landing page"
   git remote add origin <URL_REPO_CUA_BAN>
   git push -u origin main
   ```
2. Vào **Settings** trên GitHub repository:
   - Mục **Pages**:
     - Tại phần **Source**, chọn: **GitHub Actions**.
   - Mục **Custom domain**:
     - Điền: `chaluilachong.share4happy.com`.
     - Tích chọn **Enforce HTTPS** (sau khi chứng chỉ SSL của GitHub được cấp).
3. Cấu hình DNS trên nhà cung cấp tên miền của `share4happy.com`:
   - Thêm bản ghi CNAME:
     - **Host / Name:** `chaluilachong`
     - **Type:** `CNAME`
     - **Value / Target:** `<username>.github.io`
4. GitHub Actions sẽ tự động chạy file workflow `.github/workflows/deploy.yml` và deploy trang web lên `https://chaluilachong.share4happy.com/` trong vòng 1-2 phút.

---

## 6. LƯU Ý KHI GẶP SỰ CỐ
- **Sau deploy thấy trang trắng:** Đảm bảo `base: '/'` trong `vite.config.js` (đã được cấu hình chuẩn cho custom domain).
- **DNS chưa nhận:** DNS bản ghi CNAME có thể mất từ 5-15 phút để lan truyền toàn cầu.

