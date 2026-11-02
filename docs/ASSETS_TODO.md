# BẢNG ĐỐI CHIẾU ASSETS (ASSETS_TODO.md)

Tài liệu này theo dõi toàn bộ hình ảnh và icon cần thiết cho Landing Page **Chả Lụi Lạc Hồng**.
Áp dụng quy tắc **"khung trước, ảnh sau"**:
- Tất cả ảnh đều được định nghĩa tập trung tại `src/scripts/images.js`.
- Khi ảnh chưa có, giao diện hiển thị `.img-placeholder` giữ đúng kích thước, `aspect-ratio`, `object-fit`, bo góc và không làm vỡ bố cục.
- Khi người dùng bổ sung ảnh đúng tên file vào `src/assets/images/`, giao diện tự động nhận ảnh thật.

---

## 1. Bảng danh sách hình ảnh

| STT | Tên file dự kiến | Vị trí sử dụng | Kích thước đề xuất (px) | Tỷ lệ (aspect-ratio) | Trạng thái | Ghi chú & Alt text |
|:---:|:---|:---|:---:|:---:|:---:|:---|
| 1 | `hero-chaluimet.png` | Hero Section (Card bên phải) | 600 x 450 | 4:3 | **Còn thiếu** | Alt: "Mẹt Chả Lụi Lạc Hồng Đầy Đủ nướng than hồng". Minh hoạ mẹt chả lụi hoặc ảnh chụp thật tách nền/nền tối. |
| 2 | `quan-co-yen.jpg` | Section Top Quán (Card Cô Yến) | 640 x 360 | 16:9 | **Còn thiếu** | Alt: "Chả lụi Cô Yến - Hẻm 42 Lạc Hồng Biên Hòa". Ảnh mẹt chả lụi/không gian quán Cô Yến. |
| 3 | `quan-lac-hong-15k.jpg` | Section Top Quán (Card Quán 15K) | 640 x 360 | 16:9 | **Còn thiếu** | Alt: "Chả lụi Lạc Hồng Quán 15K cổng trường ĐH Lạc Hồng". Ảnh đĩa chả lụi và nem lụi giá sinh viên. |
| 4 | `quan-ba-bay.jpg` | Section Top Quán (Card Bà Bảy) | 640 x 360 | 16:9 | **Còn thiếu** | Alt: "Chả lụi Bà Bảy góc Huỳnh Văn Nghệ Biên Hòa". Ảnh tô sốt tương chấm đậm đà và chả nướng. |
| 5 | `step-1-banh-trang-rau.png` | Section Cách Ăn Chuẩn (Minh hoạ Bước 1) | 320 x 240 | 4:3 | **Còn thiếu** | Alt: "Trải bánh tráng và lót rau sống, xoài xanh bào sợi". Minh hoạ cọng rau xanh và xoài chua. |
| 6 | `step-2-kep-cha-ram.png` | Section Cách Ăn Chuẩn (Minh hoạ Bước 2) | 320 x 240 | 4:3 | **Còn thiếu** | Alt: "Kẹp chả lụi nướng than và ram giòn rụm". Minh hoạ xiên chả lụi và ram chiên. |
| 7 | `step-3-cham-sot.png` | Section Cách Ăn Chuẩn (Minh hoạ Bước 3) | 320 x 240 | 4:3 | **Còn thiếu** | Alt: "Chấm ngập cuốn chả lụi vào chén tương sệt ấm nóng". Minh hoạ cuốn chả và bát nước chấm tương đậu bùi ngậy. |
| 8 | `og-image.jpg` | Meta thẻ chia sẻ MXH (Facebook/Zalo) | 1200 x 630 | 1.91:1 | **Còn thiếu** | Lưu tại `public/og-image.jpg`. Banner tổng quan Chả Lụi Lạc Hồng Food Reviewer. |
| 9 | `favicon.svg` / `favicon.ico` | Favicon trình duyệt | 32 x 32 / Vector | 1:1 | **Còn thiếu** | Lưu tại `public/favicon.svg`. Icon ngọn lửa thương hiệu Lạc Hồng. |

---

## 2. Icon hệ thống (SVG nội tuyến / SVG Sprite)

Tất cả icon được vẽ bằng SVG inline chuẩn vector, không phụ thuộc font icon bên ngoài, đảm bảo nhẹ và tối ưu hiển thị:

| Icon | Vị trí dùng | Trạng thái |
|:---|:---|:---:|
| `logo-flame` | Logo Header & Footer (Lạc Hồng Hub) | Dự kiến tạo inline SVG |
| `icon-heart` | Nút "Yêu thích 1,842" | Dự kiến tạo inline SVG |
| `icon-compass` / `icon-search` | Nút CTA "Săn Quán Ngon" | Dự kiến tạo inline SVG |
| `icon-arrow-right` | Nút CTA "Bản Đồ Top Quán Ngon" | Dự kiến tạo inline SVG |
| `icon-utensils` | Nút CTA "Cách Ăn Đúng Chuẩn" | Dự kiến tạo inline SVG |
| `icon-star` | Rating sao quán, tiêu chí và reviews | Dự kiến tạo inline SVG |
| `icon-bookmark` | Nút lưu quán trên các card Top Quán | Dự kiến tạo inline SVG |
| `icon-chili` | Thành phần #1 Sốt Tương Thịt & Tab Sốt Đậm Đà | Dự kiến tạo inline SVG |
| `icon-fire` | Thành phần #2 Vỏ Bánh Nướng Than Hồng | Dự kiến tạo inline SVG |
| `icon-meat` / `icon-shrimp` | Thành phần #3 Nhân Tôm Thịt Đậm Đà | Dự kiến tạo inline SVG |
| `icon-leaf` | Thành phần #4 Rau Ăn Kèm & Xoài Bào | Dự kiến tạo inline SVG |
| `icon-clock` | Banner Khung Giờ Vàng Đi Ăn | Dự kiến tạo inline SVG |
| `icon-chevron-down` / `icon-chevron-up` | Accordion Hỏi Đáp FAQ & Select Dropdown | Dự kiến tạo inline SVG |
| `icon-share` / `icon-copy` | Nút "Sao chép liên kết trang" ở Footer | Dự kiến tạo inline SVG |
| `social-facebook`, `social-tiktok`, `social-instagram` | Footer mạng xã hội | Dự kiến tạo inline SVG |
| `icon-pause` / `icon-play` | Nút Tạm Dừng / Tiếp Tục Carousel WordPress | Dự kiến tạo inline SVG |

---

## 3. Ảnh bài viết WordPress (Lấy tự động qua API)

- Lấy trực tiếp từ trường `_embedded['wp:featuredmedia'][0].source_url` của WP REST API.
- Nếu bài viết nào thiếu ảnh: tự động fallback về `.img-placeholder` hoặc ảnh mặc định `post-placeholder.jpg` với tỉ lệ `16:9`.
