# 🌸 Thiệp Tốt Nghiệp - Intro Hoa Nở Bầu Trời Hồng

Dự án thiệp mời và kỷ niệm tốt nghiệp được viết hoàn toàn bằng **HTML5, CSS3, và JavaScript thuần** (Vanilla), không cần cài đặt thư viện nặng hay Node.js. Chỉ cần mở file `index.html` trong bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox).

---

## ✨ Điểm nổi bật của phần Intro:
1. **Bầu trời hồng mộng mơ (Pink Dreamy Sky):**
   - Hiệu ứng gradient đa tầng chuyển sắc hồng pastel dịu ngọt kết hợp ánh vầng dương (sun glow) bừng sáng.
   - Những dải mây hồng trôi bồng bềnh nhẹ nhàng.

2. **Hiệu ứng mọc nhánh cây và nở hoa (Blooming Blossoms):**
   - Các nhánh cây đâm chồi uốn lượn tự nhiên từ hai góc dưới.
   - Nụ hoa và các đóa hoa anh đào / mẫu đơn hồng bung nở mềm mại với hiệu ứng chuyển động mượt mà.

3. **Cánh hoa rơi lả tả & bụi sao lấp lánh (Falling Petals & Fairy Dust):**
   - Vẽ bằng HTML5 Canvas với hiệu ứng lật 3D tự nhiên theo làn gió nhẹ.
   - **Tương tác chạm / click:** Bất cứ khi nào bạn chạm hoặc click vào màn hình, một chùm cánh hoa và bụi sao sẽ nở tung rực rỡ tại vị trí đó!

4. **Âm thanh hộp nhạc Web Audio API:**
   - Tích hợp sẵn nút 🎵 phát tiếng chuông gió / nhạc hộp nhạc trong trẻo mà không cần tải thêm file mp3 bên ngoài.

5. **Thiệp mời chính (Modal Invitation):**
   - Khi bấm **"Mở Thiệp Mừng ✨"**, hiệu ứng pháo hoa cánh hoa bùng nổ và mở ra tấm thiệp trao bằng tốt nghiệp trang trọng, đầy đủ ngày giờ, địa điểm và dresscode.

---

## 🚀 Cách mở và chạy thử:
1. Nhấp đúp chuột trực tiếp vào file `index.html` để mở bằng trình duyệt.
2. Hoặc dùng tính năng **Live Server** trong VS Code nếu muốn xem realtime.

---

## 🎨 Cách tùy chỉnh thông tin:
- **Tên người tốt nghiệp:** Mở file `index.html` và tìm thẻ `<p class="intro-recipient">Nguyễn Gia Vy</p>` hoặc `<h3 class="grad-name">Nguyễn Gia Vy</h3>` để đổi thành tên mong muốn.
- **Thời gian & Địa điểm:** Chỉnh sửa trong phần `<div class="info-grid">...</div>` trong `index.html`.
- **Tông màu chủ đạo:** Mở file `style.css`, bạn có thể thay đổi các biến màu ở phần `:root` như `--pink-sky-mid`, `--pink-deep`, `--gold-warm`.
