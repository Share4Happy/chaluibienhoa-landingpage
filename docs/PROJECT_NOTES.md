# TÀI LIỆU PHÂN TÍCH THIẾT KẾ & KẾ HOẠCH TRIỂN KHAI (PROJECT_NOTES.md)

**Dự án:** Landing Page Chả Lụi Lạc Hồng – Biên Hòa Food Reviewer (Lạc Hồng Hub)  
**Thời gian cập nhật:** 02/11/2026 (Đã cập nhật đầy đủ 9 ảnh thiết kế hoàn chỉnh từ Header đến Footer)  
**Lập trình viên:** Frontend Senior  

---

## 1. PHÂN TÍCH HIỆN TRẠNG DỰ ÁN

- **Thư mục làm việc:** `d:\Projects\landing-page\chaluilachong`
- **Môi trường hệ thống:**
  - Node.js: `v22.15.1` (bản LTS)
  - NPM: `10.9.2`
  - Hệ điều hành: Windows
- **Công nghệ cam kết:**
  - Vite (template Vanilla JS), thuần HTML5, CSS3 (CSS Variables / Design Tokens, Flexbox, CSS Grid), JavaScript ES Modules.
  - Không dùng React/Vue, không TypeScript, không Tailwind CSS hay UI framework cồng kềnh.
  - Carousel WP, Tab tương tác, Filter quán, FAQ Accordion, Mobile Menu, Form xử lý thuần CSS/JS.
  - Tự động deploy qua GitHub Actions lên GitHub Pages (`.github/workflows/deploy.yml`).

---

## 2. KẾT QUẢ GỌI THỬ VÀ KIỂM TRA API WORDPRESS THỰC TẾ

### 2.1. Thông số Endpoint
- **URL kiểm tra:** `https://share4happy.com/wp-json/wp/v2/posts?categories=220&per_page=4&_embed`
- **Chuyên mục:** "Chả lụi Biên Hoà" (ID 220).
- **Cấu hình hiển thị:** 4 thẻ bài viết chạy trôi chậm vô hạn bên trong phạm vi container, bỏ nút tạm dừng, hỗ trợ hover/touch pause.
- **Cơ chế Fallback:** Khi chuyên mục 220 chưa có bài viết mới, tự động hiển thị 4 thẻ mẫu chuẩn chủ đề Chả Lụi Biên Hòa, liên kết dẫn về `https://share4happy.com/category/cha-lui-bien-hoa/`. Khi có bài mới trên WordPress, hệ thống tự động nhận diện và hiển thị bài thật.

### 2.2. Kiểm tra CORS
- Đã test gửi request giả lập browser với header `Origin: https://localhost:5173` và `Origin: https://username.github.io`.
- Phản hồi từ server: `access-control-allow-origin` echo chính xác Origin của client, `access-control-allow-credentials: true`.
- **Kết luận:** **API KHÔNG BỊ CHẶN CORS** khi gọi trực tiếp từ trình duyệt.

### 2.3. Cấu trúc dữ liệu và giải pháp xử lý
- **Tiêu đề (`title.rendered`):** Giải mã an toàn bằng `DOMParser` / `.textContent`.
- **Mô tả ngắn (`excerpt.rendered`):** Tách thẻ HTML, lấy text thuần ngắn gọn.
- **Ảnh đại diện (`featured_media`):** Lấy từ `_embedded['wp:featuredmedia'][0].source_url` (hoặc `sizes.medium_large.source_url`).
- **Ngày đăng (`date`):** Format `DD/MM/YYYY`.
- **Liên kết (`link`):** Gắn thẻ `<a href="..." target="_blank" rel="noopener noreferrer">`.

---

## 3. PHÂN TÍCH TOÀN BỘ 10 SECTIONS THEO THIẾT KẾ ĐÍNH KÈM

Trang Landing Page gồm 10 khối liên hoàn, nhất quán về phong cách Dark Theme cao cấp:

### 3.1. Hệ thống Design Tokens
- **Bảng màu:**
  - Background nền trang: `#0e0f12` (đen carbon sâu)
  - Nền Card chính: `#16171b` (xám đen than)
  - Nền Card con / Input: `#1a1c23` (xám tối)
  - Đường viền (Border): `#282a35` và `rgba(255, 255, 255, 0.08)`
  - Màu nhấn chính (Brand Accent): Cam rực `#ff541e` đến `#ff6b00`
  - Màu bổ trợ: Vàng hổ phách `#fbbf24`, Xanh lá `#22c55e`, Đỏ ớt `#ef4444`
  - Màu chữ: Tiêu đề trắng `#ffffff`, mô tả `#d1d5db`, phụ `#9ca3af`
- **Typography:** Google Fonts `'Plus Jakarta Sans', system-ui, sans-serif`
- **Hiệu ứng:** Ambient Glow cam quanh card chính và nút CTA, transition mượt mà.

---

### 3.2. Danh sách 10 Section theo thứ tự từ trên xuống dưới

#### Section 1: Header (Navigation Bar)
- Logo: Icon ngọn lửa cam + chữ 2 dòng `CHÀ LỤI LẠC HỒNG` (trắng/cam) / `BIÊN HÒA FOOD REVIEWER` (xám).
- Menu điều hướng:
  - `Trang Chủ` (`#hero`)
  - `Top Quán Review` (`#top-quan`)
  - `Bóc Tách Vị Ngon` (`#vi-ngon`)
  - `Cách Ăn Chuẩn` (`#cach-an`)
  - `Đánh Giá` (`#danh-gia`)
  - `Hỏi Đáp` (`#faq`)
  - `Bài viết nổi bật` (`#bai-viet`)
- Actions bên phải:
  - Nút `♡ 1,842 Yêu thích` (tương tác click tăng tim và lưu localStorage).
  - Nút CTA `Săn Quán Ngon` (pill cam gradient cuộn nhanh xuống Top Quán).
- Mobile Drawer Menu đáp ứng hoàn hảo màn hình nhỏ.

#### Section 2: Hero Section (Ảnh 1)
- Cột trái:
  - Badge: `KIỂM CHỨNG & REVIEW THỰC TẾ BỞI GEN Z BIÊN HÒA`
  - Eyebrow: `SĂN LÙNG CHẢ LỤI LẠC HỒNG`
  - H1: `MÓN "GÂY NGHIỆN" SỐ 1 BIÊN HÒA`
  - Mô tả: Nhấn mạnh "nước chấm tương thịt sệt béo bùi".
  - 2 CTA: `Bản Đồ Top Quán Ngon →` & `🍴 Cách Ăn Đúng Chuẩn`.
  - 3 Stats: `15K – 25K Giá sinh viên siêu hời`, `4.9/5 ★ Đánh giá trung bình`, `100% Review trung thực 0% QC`.
- Cột phải: Card đồ họa Mẹt chả lụi Lạc Hồng viền phát sáng cam (Glow):
  - Badge góc: `NÓNG HỔI GIÒN RỤM!`
  - Khung ảnh mẹt chả lụi (aspect-ratio 4:3)
  - Tên món: `Mẹt Chả Lụi Lạc Hồng Đầy Đủ`
  - Tags: `📍 Khu Lạc Hồng, Biên Hòa` | `🌶 Sốt tương sệt`.

#### Section 3: Top Quán Chả Lụi Lạc Hồng Chuẩn Vị Nhất (Ảnh 2)
- Tiêu đề & Subtitle gợi ý chọn quán theo gu ẩm thực.
- 4 Tabs lọc tương tác bằng JS:
  - `Tất Cả Quán Hot`
  - `🌶 Sốt Đậm Đà`
  - `💳 Giá Sinh Viên (15k)`
  - `👑 Chuẩn Gốc Lạc Hồng`
- Grid 3 Card Quán:
  1. `Chả Lụi Cô Yến - Lạc Hồng` (TOP 1 REVIEW, 4.9★, Hẻm 42 Lạc Hồng, Giá 18k-25k)
  2. `Chả Lụi Lạc Hồng - Quán 15K` (GIÁ RẺ SINH VIÊN, 4.7★, Gần Cổng ĐH Lạc Hồng Cơ sở 1, Giá 15k-20k)
  3. `Chả Lụi Bà Bảy - Góc Huỳnh Văn Nghệ` (NƯỚC SỐT ĐẬM ĐÀ, 4.8★, Ngã 3 Lạc Hồng, Giá 20k-30k)
  - Có nút bookmark lưu quán (localStorage) và nút `Chi Tiết Review`.

#### Section 4: Bóc Tách Cấu Trúc Chả Lụi Lạc Hồng (Ảnh 3)
- Badge: `BÍ MẬT VỊ NGON`
- Tiêu đề: `"BÓC TÁCH" CẤU TRÚC CHẢ LỤI LẠC HỒNG`
- 4 Cards thành tố (Grid 4 cột desktop):
  - Thành phần #1 (Ớt): `Sốt Chấm Tương Thịt Sệt`
  - Thành phần #2 (Lửa): `Vỏ Bánh Nướng Than Hồng`
  - Thành phần #3 (Thịt): `Nhân Tôm Thịt Đậm Đà`
  - Thành phần #4 (Lá): `Rau Ăn Kèm & Xoài Bào`

#### Section 5: Hướng Dẫn 3 Bước Cuốn Chả Lụi Chuẩn Local (Ảnh 4)
- Badge: `TRẢI NGHIỆM TRỰC QUAN`
- Tiêu đề: `HƯỚNG DẪN 3 BƯỚC CUỐN CHẢ LỤI CHUẨN LOCAL`
- 3 Tabs chọn bước tương tác: `1. Bánh Tráng & Rau`, `2. Kẹp Chả & Ram`, `3. Chấm Ngập Sốt`.
- Card nội dung thay đổi theo tab: Chi tiết từng bước cuốn + Bí kíp độc quyền + Khung minh họa icon trực quan.
- Banner chân section: `KHUNG GIỜ VÀNG ĐI ĂN: Nên tới từ 15:00 - 17:00...`

#### Section 6: Đánh Giá Tiêu Chí & Cảm Nhận Chi Tiết (Ảnh 5)
- Layout 2 cột:
  - Cột trái: Bảng đánh giá tiêu chí chấm điểm (4.9★ Must Try, 4 progress bars: Độ giòn 5.0, Độ đậm đà 4.9, Độ tươi rau xoài 4.8, Giá sinh viên 5.0, Kết luận chuẩn điểm 10).
  - Cột phải: Cảm nhận chi tiết `"Một Lần Thử - Cả Đời Nhớ Mãi Góc Phố Lạc Hồng"` + Khối Quote viền cam nổi bật.

#### Section 7: Cộng Đồng Reviewer & Form Gửi Review (Ảnh mới 1)
*(Mục tiêu chuyển đổi cốt lõi theo đề bài và thiết kế)*
- Layout 2 cột:
  - **Cột trái:** Danh sách đánh giá thực tế của cộng đồng thực khách:
    - Review 1: `Minh Thảo (Sinh viên LHU)` - Đã ăn tại Quán Cô Yến • 2 ngày trước - ★★★★★: *"Mấy năm học ở LHU tuần nào nhóm mình cũng ăn chả lụi Lạc Hồng 2-3 lần. Mê nhất quả nước chấm tương thịt nóng hổi cay cay. Ăn no nê mà chia ra mỗi đứa có 20k, siêu đỉnh!"*
    - Review 2: `Hoàng Dũng (Food Blogger TP.HCM)` - Chuyến đi Foodtour Biên Hòa • Tuần trước - ★★★★★: *"Lần đầu xuống Biên Hòa săn chả lụi theo review của Lạc Hồng Hub. Chả lụi nướng than thơm lừng, vỏ giòn xốp khác hẳn nơi khác. Xoài bào ăn kèm rất bắt vị!"*
  - **Cột phải:** Form `Gửi Review Của Bạn`:
    - Tiêu đề: `Gửi Review Của Bạn`
    - Subtitle: `Bạn vừa trải nghiệm chả lụi Lạc Hồng? Chia sẻ đánh giá thực tế nhé!`
    - Field 1: `Tên/Biệt danh của bạn` (input text, placeholder: *Ví dụ: An An Foodie*)
    - Field 2: `Quán bạn đã ăn` (select dropdown: *Chả Lụi Cô Yến – Lạc Hồng*, *Chả Lụi Lạc Hồng – Quán 15K*, *Chả Lụi Bà Bảy*, *Quán khác*)
    - Field 3: `Đánh giá điểm số` (select dropdown: *★★★★★ (5/5 – Tuyệt vời)*, *★★★★☆ (4/5 – Rất ngon)*, ...)
    - Field 4: `Lời nhận xét chi tiết` (textarea: *Nước chấm thế nào, chả giòn không, phục vụ tốt không...*)
    - Nút CTA: `Gửi Đánh Giá Ngay` (pill cam gradient rực rỡ, validate client-side, loading và toast/modal thông báo thành công).

#### Section 8: Giải Đáp Thắc Mắc (FAQ Accordion) (Ảnh mới 2 & 4)
- Eyebrow: `GIẢI ĐÁP THẮC MẮC`
- Tiêu đề: `CÂU HỎI THƯỜNG GẶP VỀ CHẢ LỤI`
- 3 Accordion tương tác mượt mà (Hỗ trợ mở/đóng từng mục, icon mũi tên xoay animation):
  1. **Một phần Chả Lụi Lạc Hồng trung bình có giá bao nhiêu?**
     *Trả lời:* Chả lụi khu Lạc Hồng có giá rất sinh viên. Một phần đầy đủ (gồm 5–8 xiên chả, dĩa rau xoài bào và tô nước chấm tương thịt) thường có giá từ 15.000đ đến 25.000đ.
  2. **Chả Lụi Lạc Hồng (Biên Hòa) khác gì Chả Lụi Lagi hay Ninh Hòa?**
     *Trả lời:* Chả lụi Lạc Hồng nổi bật nhất ở chén nước chấm tương thịt sệt đặc trưng (tương hột băm nấu thịt), trong khi chả lụi Lagi dùng sốt đậu phộng xay béo ngậy. Ngoài ra xoài bào sợi chua tại Biên Hòa luôn được cho rất thoải mái!
  3. **Đi ăn chả lụi ở Lạc Hồng gửi xe ở đâu? Có dễ tìm không?**
     *Trả lời:* Tất cả các quán chả lụi dọc trục đường Lạc Hồng (P. Bửu Long) đều có chỗ trông giữ xe máy miễn phí. Đối với xe ô tô, khuyến khích đậu ở đầu hẻm hoặc trục đường lớn Huỳnh Văn Nghệ rồi đi bộ vào.

#### Section 9: Bài Viết Nổi Bật (Carousel WordPress Tự Động Trôi Chậm - Mục 2B & Ảnh mới 3)
- Eyebrow: `BÀI VIẾT` (chữ cam đỏ)
- Tiêu đề Section: `BÀI VIẾT & TIN TỨC MỚI NHẤT`
- Cấu trúc Card bài viết:
  - Thẻ card tối viền mờ bo góc
  - Badge danh mục nổi bật phía trên: `ẨM THỰC ĐỊA PHƯƠNG`, `CẨM NANG THƯỞNG THỨC`, `GỢI Ý FOOD TOUR`...
  - Tiêu đề bài viết: Lấy từ `title.rendered` của WP API
  - Mô tả ngắn: Lấy từ `excerpt.rendered` của WP API
  - Nút link: `▶ Đọc bài viết` (liên kết thật tới bài gốc, mở tab mới an toàn)
- Hiệu ứng trôi ngang:
  - Marquee liên tục không giật bằng CSS animation `transform: translate3d`.
  - Pause khi hover/focus, mobile swipe vuốt chạm, nút Tạm dừng/Phát, skeleton loading khi gọi API.

#### Section 10: Footer (Ảnh mới 3)
- Nền đen than phân cách bằng đường viền ngang tinh tế.
- 4 Cột:
  - Cột 1: Logo `LẠC HỒNG HUB` + Mô tả sứ mệnh chuyên trang review ẩm thực độc lập.
  - Cột 2: `KHÁM PHÁ` (Top Quán Review, Bóc Tách Vị Ngon, Hướng Dẫn Cuốn Chả).
  - Cột 3: `TỌA ĐỘ NỔI BẬT` (Phường Bửu Long, Biên Hòa; Khu vực Đại học Lạc Hồng; Trục đường Huỳnh Văn Nghệ).
  - Cột 4: `CHIA SẺ BÀI REVIEW` (Nút pill `🔗 Sao chép liên kết trang` - copy URL vào clipboard kèm tooltip "Đã chép link!").
- Dưới cùng:
  - Tuyên bố miễn trừ trách nhiệm (Disclaimer) pháp lý rõ ràng.
  - Social Media Links: Facebook, TikTok, Instagram.

---

## 4. KẾ HOẠCH TRIỂN KHAI THEO THỨ TỰ ƯU TIÊN

1. **Giai đoạn 2 (Cấu trúc code):**
   - Khởi tạo `package.json`, cài đặt `vite`, viết cấu hình `vite.config.js`.
   - Tạo bộ Design Tokens trong `src/styles/tokens.css` và khung CSS nền tảng (`base.css`, `components.css`).
   - Xây dựng file JavaScript khung: `config.js`, `images.js` (placeholder chung), `posts.js`, `menu.js`, `tabs.js`, `form.js`, `main.js`.
   - Tạo workflow GitHub Actions `.github/workflows/deploy.yml`.
   - Chạy test lệnh `npm run dev` và `npm run build` đảm bảo build sạch 100%.

2. **Giai đoạn 3 (Xây dựng giao diện từng Section):**
   - Section 1 & 2: Header + Hero Section
   - Section 3: Top Quán Review + Tabs lọc
   - Section 4: Bóc Tách Vị Ngon (4 cards)
   - Section 5: Hướng Dẫn 3 Bước Cuốn Chả + Banner Khung Giờ Vàng
   - Section 6: Đánh Giá Tiêu Chí + Cảm Nhận Chi Tiết
   - Section 7: Cộng Đồng Reviewer + Form Gửi Review (Mục tiêu chuyển đổi)
   - Section 8: Giải Đáp Thắc Mắc (FAQ Accordion 3 câu hỏi)
   - Section 9: Bài Viết Nổi Bật (Carousel WP REST API tự trôi)
   - Section 10: Footer đầy đủ liên kết và sao chép URL

3. **Giai đoạn 4 -> 7:**
   - Responsive đa kích thước (320px - 1920px), Accessibility chuẩn WCAG.
   - SEO Kỹ thuật (Meta tags, Open Graph, Favicon, robots.txt, sitemap.xml).
   - Kiểm thử toàn diện và Bàn giao tài liệu hướng dẫn.
