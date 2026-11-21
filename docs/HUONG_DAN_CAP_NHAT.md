# Hướng dẫn đưa lên mạng và cập nhật – BreathSync & hlvsuckhoe.com

Cập nhật 22/11/2026 (BreathSync 2.1.0, trang chủ 1.1.1).

> **Nếu anh đã tải bản 2.0.0 lên rồi:** chỉ cần tải đè `index.html`, `sw.js`, `README.md`, thư mục `js` và thư mục `docs` của bản 2.1.0 vào repo `breathsync` (Add file → Upload files → Commit). Trang chủ: tải đè `index.html` và `README.md`.
 Làm theo đúng thứ tự A → B → C. Toàn bộ làm trên trình duyệt, không cần cài phần mềm.

Bạn nhận được 2 gói:
- `breathsync-v2.1.0.zip` – toàn bộ repo ứng dụng tập thở (mới).
- `hlvsuckhoe-web-v1.1.1.zip` – trang chủ đã cập nhật (thay cho repo `hlvsuckhoe-web` hiện có).

Giải nén cả hai ra máy tính trước.

---

## A. Tạo repo `breathsync` và bật GitHub Pages (≈10 phút)

1. Đăng nhập https://github.com bằng tài khoản **nddzungx** → góc trên phải bấm **+** → **New repository**.
2. **Repository name:** `breathsync` · chọn **Public** · KHÔNG tích "Add a README" → **Create repository**.
3. Trên trang repo trống, bấm dòng **uploading an existing file**.
4. Mở thư mục `breathsync` đã giải nén, **chọn tất cả** bên trong (index.html, sw.js, manifest.webmanifest, CNAME, LICENSE, README.md, .nojekyll và các thư mục `js`, `img`, `icons`, `docs`) rồi kéo thả vào trang GitHub.
   - Kéo các **thư mục** vào thì GitHub giữ nguyên cấu trúc thư mục.
   - Tệp `.nojekyll` bị ẩn trên Windows. Nếu không thấy: sau khi commit, bấm **Add file → Create new file**, gõ tên `.nojekyll`, để trống, **Commit**.
5. Ô *Commit changes* ghi `BreathSync 2.1.0` → **Commit changes**. Đợi tải xong.
6. Kiểm tra trong repo có tệp **CNAME** với nội dung `tho.hlvsuckhoe.com`.
7. **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main**, thư mục **/(root)** → **Save**.
8. Vẫn trong **Settings → Pages**, ô *Custom domain* phải hiện `tho.hlvsuckhoe.com` (tự đọc từ tệp CNAME). Nếu trống: gõ `tho.hlvsuckhoe.com` → **Save**.

## B. Thêm tên miền phụ `tho` trên Cloudflare (≈3 phút)

1. Đăng nhập https://dash.cloudflare.com → chọn **hlvsuckhoe.com** → **DNS → Records** → **Add record**.
2. Điền:
   - **Type:** `CNAME`
   - **Name:** `tho`
   - **Target:** `nddzungx.github.io`
   - **Proxy status:** bấm cho thành **DNS only** (đám mây **xám**) – giống `app` và `thienvan`.
   - **TTL:** Auto → **Save**.
3. Quay lại GitHub **Settings → Pages** của repo `breathsync`, đợi 5–30 phút đến khi hiện *"DNS check successful"*, rồi tích **Enforce HTTPS** (nếu ô còn mờ thì đợi thêm, chứng chỉ HTTPS có thể mất tới 1 giờ).
4. Mở https://tho.hlvsuckhoe.com trên điện thoại để kiểm tra.
   - Vì tên miền gốc đã được *Verified* trong GitHub (Settings tài khoản → Pages → Verified domains), không cần xác minh lại cho tên miền phụ.

## C. Cập nhật trang chủ hlvsuckhoe.com (≈5 phút)

1. Mở repo **nddzungx/hlvsuckhoe-web** → **Add file → Upload files**.
2. Kéo vào **từ thư mục `hlvsuckhoe-web` đã giải nén**:
   - `index.html` (thay bản cũ)
   - `README.md` (thay bản cũ)
   - thư mục `img` (GitHub sẽ thêm 2 tệp mới `img/logo-breathsync.svg`, `img/qr_ung_ho.png` và ghi đè các tệp trùng tên – nội dung giống hệt, không sao).
3. Commit: `Trang chủ 1.1.0 – Giới thiệu, ủng hộ, BreathSync` → **Commit changes**.
4. Đợi 1–2 phút, mở https://hlvsuckhoe.com và bấm tải lại (điện thoại: kéo xuống để tải lại). Kiểm tra:
   - Không còn dải vàng "Bản nháp…".
   - Menu có **Giới thiệu**; cuối trang có mục **Người làm ra trang này** + **Mời Dũng một ly cà phê** (mã QR hiện ra, bấm "Chép số tài khoản" thấy thông báo "Đã chép").
   - Mục **Âm nhạc** có khung "Muốn có một bài hát viết riêng cho mình?".
   - Mục **Thở & thiền** và khối ứng dụng có **BreathSync**, nút mở đúng tho.hlvsuckhoe.com.
   - **KHÔNG** xoá tệp `CNAME` của repo này.

## D. Cài BreathSync lên điện thoại
- **iPhone:** mở https://tho.hlvsuckhoe.com bằng **Safari** → nút Chia sẻ → **Thêm vào MH chính**. Lưu ý gạt công tắc im lặng sang **bật tiếng** thì mới nghe được âm thanh.
- **Android:** mở bằng **Chrome** → menu ⋮ → **Cài đặt ứng dụng** (hoặc *Thêm vào màn hình chính*).
- Lần đầu cần mạng; sau đó dùng được khi không có mạng (riêng phông chữ đẹp cần mạng lần đầu, không có mạng thì dùng phông của máy).

---

## E. Cập nhật phiên bản sau (quy trình chuẩn)

1. Sửa tệp trên máy (thường chỉ `js/data.js` cho nội dung, `js/i18n.js` cho chữ giao diện).
2. **Bắt buộc** mở `sw.js`, đổi dòng `const CACHE = 'breathsync-v2.1.0';` sang số mới (ví dụ `v2.1.1`). Không đổi thì máy người dùng vẫn giữ bản cũ.
3. Đổi `version: '2.1.0'` trong `js/data.js` cho khớp, ghi một dòng vào mục *Phiên bản* của `README.md`.
4. Trên GitHub: **Add file → Upload files** → kéo các tệp đã sửa (đúng thư mục: tệp trong `js/` thì mở thư mục `js` trên GitHub rồi mới tải, hoặc kéo cả thư mục `js`) → Commit.
5. Người dùng chỉ cần mở app khi có mạng, đóng hẳn rồi mở lại là nhận bản mới.

Sửa nhanh một chữ: mở tệp trên GitHub → biểu tượng bút chì ✏️ → sửa → **Commit changes** (vẫn nhớ đổi số CACHE trong `sw.js`).

### Những chỗ hay cần sửa
| Muốn | Sửa ở đâu |
|---|---|
| Đổi số tài khoản / PayPal / thêm link paypal.me | `js/data.js` → `window.APP` (`bank`, `paypal.me`); thay ảnh `img/qr_ung_ho.png` nếu đổi tài khoản |
| Sửa nội dung một kỹ thuật, thêm phương án nhịp | `js/data.js` → `window.MODES` |
| Thêm kỹ thuật mới | chép một khối trong `MODES`, đổi `id`, `n`, màu `rgb/accent/soft`, nội dung vi + en |
| Sửa chữ nút, nhãn | `js/i18n.js` (sửa cả `vi` và `en`) |
| Sửa miễn trừ, giới thiệu | `js/data.js` → `window.ABOUT`, `window.CONSENT`, `window.SAFETY` |
| Sửa **Hướng dẫn sử dụng** | `js/data.js` → `window.GUIDE` (mỗi mục có `h` tiêu đề, `body`/`list`/`steps`/`table`/`qa`; bảng "nên chọn kỹ thuật nào" ứng với `pickId` trong hàm `openGuide()` của `js/app.js`) |
| Đổi màu nền, cỡ chữ, bố cục | phần `<style>` trong `index.html` |
| Đổi âm thanh | `js/audio.js` (tần số chuông trong `cue()`, độ to nền trong `breath()`) |

### Kiểm tra trước khi tải lên (tuỳ chọn)
Mở trực tiếp `index.html` bằng Chrome trên máy tính là chạy được (riêng chế độ offline chỉ hoạt động khi chạy trên https). Bấm F12 → *Console* để xem có lỗi đỏ không. Muốn xem như điện thoại: F12 → biểu tượng điện thoại (Toggle device toolbar).

### Gỡ rối
| Hiện tượng | Cách xử lý |
|---|---|
| Mở tho.hlvsuckhoe.com báo 404 | Kiểm tra repo có `index.html` ở thư mục gốc (không nằm trong thư mục con `breathsync/`), Pages đã bật nhánh main /(root) |
| "Domain does not resolve" / DNS check lỗi | Kiểm tra bản ghi CNAME `tho` → `nddzungx.github.io`, đám mây **xám**; đợi thêm 30 phút |
| Không bật được Enforce HTTPS | Đợi chứng chỉ (tới 1 giờ); bỏ rồi nhập lại Custom domain để GitHub cấp lại |
| Sửa rồi mà điện thoại vẫn bản cũ | Quên đổi số `CACHE` trong `sw.js`; hoặc đóng hẳn app rồi mở lại khi có mạng |
| iPhone không có tiếng | Gạt công tắc im lặng; tăng âm lượng; bấm "Nghe thử" trong mục Âm thanh |
| Không có giọng đọc tiếng Việt | Máy chưa có giọng vi-VN (Android: Cài đặt → Chuyển văn bản thành giọng nói → tải tiếng Việt; iPhone: Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Việt). Chuông vẫn hoạt động |
