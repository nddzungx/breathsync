# BÀN GIAO & KINH NGHIỆM – BreathSync 2.1.0 và trang chủ 1.1.1

Ngày 22/11/2026 · Người phát triển: Nguyễn Đức Dũng (nddzungx@gmail.com) · Thực hiện cùng Claude.

## 1. Hiện trạng

| Thành phần | Địa chỉ | Repo | Phiên bản |
|---|---|---|---|
| Trang chủ | https://hlvsuckhoe.com | `nddzungx/hlvsuckhoe-web` | 1.1.1 |
| HLV Sức Khỏe | https://app.hlvsuckhoe.com | `nddzungx/hlv-suc-khoe` | 1.2.2 |
| **BreathSync** | **https://tho.hlvsuckhoe.com** | **`nddzungx/breathsync`** (mới) | **2.1.0** |
| Xưởng kính thiên văn | https://thienvan.hlvsuckhoe.com | `nddzungx/xuong-kinh-thien-van` | – |

DNS Cloudflare: thêm `CNAME tho → nddzungx.github.io` (DNS only, mây xám).

### Nguyên tắc cố định của anh Dũng cho mọi ứng dụng
**Ứng dụng nào cũng phải có, ngay trong app:** (1) phần **Giới thiệu** – ứng dụng là gì, ý nghĩa, tác dụng có thể mong đợi (nói trung thực, không hứa chữa bệnh); (2) phần **Hướng dẫn sử dụng** cho người chưa quen – các bước dùng nhanh, đọc màn hình, từng nút, chọn chức năng nào cho nhu cầu nào, cách cài lên điện thoại, mẹo, câu hỏi thường gặp; (3) **Mời cà phê** (VietQR + PayPal); (4) **Miễn trừ trách nhiệm**. Đặt lối vào dễ thấy: nút **?** trên đầu trang, thẻ "Lần đầu dùng" khi mới mở, liên kết ở chân trang và trong mục Giới thiệu. Song ngữ nếu app có tiếng Anh.

### Đợt 2 (2.1.0) – đối chiếu kho D:\Bs Phuc
- Đã đọc trực tiếp kho: thở bụng/cơ hoành có ở số **011** (cơ liên sườn – cơ hoành, "hít vào bụng phồng, thở ra bụng hóp"), **068** (thở cơ hoành để thu nạp oxy, mỡ ra ngoài dưới dạng CO₂), **117** và **121** (thở 3D – hơi thở trẻ sơ sinh), **134** (1-1-2 cho trào ngược – phần nhận xét đọc trên sóng), **135** (thở chúm môi kết hợp cơ hoành nhịp 1:2 cho tổn thương phế quản; lộ trình 1:2 → ba thì → 4-7-8).
- **Ngân âm "M" không có trong bất kỳ bản Đối thoại nào** (đã tìm "ngân nga", "humming", "Bhramari"…). Câu "NO ×15, diệt khuẩn, thông mủ xoang" của bản 1.x đến từ các tệp tổng hợp `Hit tho.docx` (bản mô tả yêu cầu viết app) và `Hơi thở không đơn thuần là hoạt động trao đổi khí vô thức.docx` – không phải lời bác sĩ. Trong app, kỹ thuật này được giữ ở vị trí cuối, gắn nhãn "Bổ sung · y văn" và ghi rõ BS. Phúc không hướng dẫn.
- Góp ý số 011: "70% phụ nữ thở sai" là ước lượng cá nhân, không có số liệu → app ghi là quan điểm BS. Phúc.
- Thay đổi: thở bụng lên số 1 (mặc định cho người mới) + phương án chúm môi 3-0-6; bộ phanh thêm nấc "nền"; lộ trình tuần 1 bắt đầu bằng thở bụng; **Hướng dẫn sử dụng** song ngữ 9 mục; nút ngôn ngữ một chạm (EN/VI) để đầu trang đủ chỗ cho phụ đề.

### Đợt 1 (2.0.0)
**BreathSync (làm lại từ bản 1 tệp HTML):**
- Phụ đề đổi thành **HƠI THỞ Ý THỨC · HLV SỨC KHOẺ**; logo mới (quả cầu xanh với làn sóng hít – thở, vòng hơi thở lan toả, chấm vàng nối với trái tim vàng của logo HLV).
- Song ngữ Việt – Anh (nút VI/EN, nhớ lựa chọn, link `?lang=en`).
- Giao diện điện thoại: **nút Bắt đầu chuyển từ cuối trang xuống thanh cố định ở đáy màn hình** (vùng ngón cái, luôn nhìn thấy, tôn trọng vùng an toàn iPhone), chạm vòng tròn cũng bắt đầu/tạm dừng; khi tập thì ẩn hết, chỉ còn vòng tròn – thời gian – chu kỳ (chế độ tập trung); giữ màn hình sáng (Wake Lock).
- Âm thanh mới, tự tổng hợp: nền **sóng biển** dâng khi hít vào, rút khi thở ra; **nền ấm** (hợp âm Rê treo) mở – khép theo hơi thở; **chuông bát hát** (cao khi hít, mõ gỗ khi nín, trầm khi thở ra), ba tiếng chuông kết thúc; nhịp đôi tai tuỳ chọn; giọng đọc hướng dẫn của máy; thanh âm lượng; nút nghe thử.
- Nội dung cập nhật theo chuỗi bài của BS. Phúc trong kho (số 117, 120, 121) và phần Góp ý/đối chiếu y văn: bỏ các khẳng định quá mức (bản cũ ghi "tái tạo ADN", "diệt khuẩn", "chống ngưng thở khi ngủ", "đảm bảo hạ huyết áp"…), mỗi nhận định gắn nhãn **Y văn / Quan điểm BS. Phúc / Đang tranh luận**; thêm phương án **5-5-5** (đúng cách BS. Phúc đếm ở số 117), **4-4-8** cho 4-7-8, các phương án **không nín** (4-0-6, 4-0-8); bộ phanh hơi thở + lộ trình 12 tuần; khung an toàn 10 điểm; màn hình đồng ý miễn trừ lần đầu.
- Mục **Giới thiệu & mời cà phê** giống app HLV (VietQR, chép số TK, PayPal), chia sẻ, liên hệ, miễn trừ 7 điều, bản quyền.
- Giữ và cải tiến: nhịp cá nhân hoá (đo/nhập hít vào), đo nhịp thở tự nhiên (bỏ lần bấm < 1,2 s hoặc > 60 s), chuỗi ngày tập, thời lượng 1–15 phút/∞ (luôn kết thúc trọn chu kỳ).
- PWA: manifest, service worker, biểu tượng 32/180/192/512/maskable.

**Trang chủ:** bỏ dải "Bản nháp"; thêm mục **Giới thiệu** (Nguyễn Đức Dũng) + **Mời Dũng một ly cà phê** (`#ung-ho`); khung **đặt bài hát riêng** trong Âm nhạc; BreathSync ở mục Thở & thiền, khối ứng dụng, menu, chân trang; thêm câu miễn trừ về bài giảng BS. Phúc ở chân trang.

## 2. Kiến trúc BreathSync

```
index.html   khung + CSS (biến màu --accent đổi theo kỹ thuật)
js/i18n.js   I18N.vi / I18N.en  → t('khoa')
js/data.js   APP (link, ngân hàng), MODES (5 kỹ thuật), BRAKE, SAFETY, ABOUT, CONSENT
js/audio.js  Sound: init, startAmbient/stopAmbient, breath(key,dur), cue(key), gong(), say(text,lang)
js/app.js    cài đặt (localStorage 'breathsync:v2'), dựng giao diện, vòng lặp tick() bằng requestAnimationFrame
sw.js        cache-first; đổi CACHE mỗi lần phát hành
```

- **Mỗi kỹ thuật** trong `MODES`: `variants[]` → `phases[]` gồm `{key:'inhale'|'hold'|'exhale'|'hum', dur, label{vi,en}, hint{vi,en}}`. Vòng tròn: `inhale` phóng to, `exhale/hum` thu nhỏ, `hold` giữ nguyên rung nhẹ.
- **Nội dung luôn có cặp `{vi, en}`**; hàm `tr()` chọn theo ngôn ngữ, thiếu `en` thì dùng `vi`.
- **Dữ liệu người dùng**: `breathsync:v2` (cài đặt), `breathsync:sessions` (lịch sử ≤ 1000 phiên). Tự đọc cài đặt cũ `breathsync:settings` của bản 1.x.
- Phiên < 25 giây không được ghi vào lịch sử.

## 3. Kinh nghiệm rút ra

**Thiết kế cho điện thoại**
1. Nút hành động chính không bao giờ đặt cuối trang dài. Thanh cố định đáy + `env(safe-area-inset-bottom)` + chừa `padding-bottom` cho nội dung là mẫu nên dùng cho mọi app sau.
2. Khi người dùng đang làm việc chính (thở, đếm giờ), ẩn hết phần cài đặt bằng một lớp trên `body` (`body.running .setup{display:none!important}`). Lưu ý: phần tử có `style="display:flex"` viết sẵn sẽ thắng CSS thường → phải dùng `!important` (lỗi này đã gặp khi kiểm tra).
3. Đầu trang hẹp (390 px): logo + tên + phụ đề + VI/EN + nút ☕ là tối đa. Viên "chuỗi ngày" phải ẩn dưới 480 px, thông tin đó chuyển xuống dòng thống kê.
4. Các phần ít dùng (cơ sở khoa học, âm thanh, đo nhịp, an toàn) cho vào `<details>` – không cần JavaScript, đọc được cả bằng trình đọc màn hình.

**Âm thanh trên web**
5. Trình duyệt chỉ cho phát âm thanh sau một lần chạm → khởi tạo `AudioContext` trong sự kiện bấm Bắt đầu / Nghe thử.
6. iPhone: công tắc im lặng tắt luôn Web Audio; iPhone không hỗ trợ `navigator.vibrate` → phải ghi rõ trong giao diện.
7. Âm thanh tự tổng hợp (không dùng tệp mp3) giúp app nhẹ, chạy offline, không lo bản quyền. Âm "thiền" nghe dễ chịu nhờ: hoạ âm không điều hoà kiểu chuông bát (1 : 2,76 : 5,4 : 8,93), hai dao động lệch nhau 1–2 Hz tạo tiếng ngân, vang (convolver với xung nhiễu tắt dần), và nền thay đổi chậm theo hơi thở thay vì tiếng "bíp".
8. Giọng đọc `speechSynthesis` phụ thuộc máy – luôn có phương án dự phòng (chuông) và thông báo khi thiếu giọng tiếng Việt.

**Nội dung y khoa**
9. Lấy nội dung từ kho Bs. Phúc thì ưu tiên tệp **Cẩm nang** và **Góp ý** (đã đối chiếu y văn) hơn bản Đối thoại; giữ nguyên phong cách gắn nhãn của kho để người đọc phân biệt được quan điểm và bằng chứng.
10. Không viết lời khuyên có thể khiến người bệnh bỏ thuốc; luôn kèm "không tự ngừng thuốc" ở chỗ dễ thấy (chân trang, màn hình đồng ý, từng kỹ thuật).
11. Kỹ thuật nín thở dài (4-16-8) cần cảnh báo riêng + thông báo lần đầu chọn; luôn có một phương án không nín cho thai phụ, người bệnh tim phổi.
12. Không nhúng video của bác sĩ (cần sự đồng ý); chỉ dẫn link nguồn và ghi rõ "bác sĩ không biên soạn, không duyệt".

**Quy trình**
13. Kiểm tra tự động bằng Playwright ở khung 390×844: chụp màn hình VI/EN, bấm thử Bắt đầu – Tạm dừng – Kết thúc, tua nhanh thời gian (`performance.now` × 20) để kiểm tra kết thúc phiên và ghi lịch sử. Không có lỗi console là điều kiện phát hành.
14. Mỗi app một repo + một tên miền phụ (`app`, `tho`, `thienvan`) giúp cập nhật độc lập, không làm hỏng trang chủ.
15. Đợt 1 không đọc được `D:\Bs Phuc` (quyền bị từ chối) nên đọc bản đồng bộ Google Drive; đợt 2 anh đã cấp quyền và đối chiếu trực tiếp. Cách tìm nhanh trong kho: `9. MD/2. Doi thoai` (lời nói thật), `9. MD/3. Cam nang` và `4. Gop y` (đã đối chiếu y văn). Tệp .docx rời ở thư mục gốc phần lớn là tài liệu tổng hợp, cần kiểm lại với bản Đối thoại trước khi ghi "theo BS. Phúc".
17. Luôn kiểm tra nguồn gốc một khẳng định trước khi gắn tên bác sĩ: tìm từ khoá trong `2. Doi thoai`; không thấy thì ghi là "bổ sung".
18. Hướng dẫn sử dụng viết theo cấu trúc dữ liệu (`window.GUIDE`) nên sửa nội dung không phải động vào mã giao diện.
16. GitHub chưa kết nối với Claude nên Claude chỉ đọc được repo công khai, không tự đẩy (push) được. Muốn Claude tự cập nhật: claude.ai → Settings → Connectors → GitHub, rồi cài Claude GitHub App cho các repo.

## 4. Việc nên làm ở phiên bản sau

1. **Nhắc tập hằng ngày** (thông báo PWA – cần thêm Push/Notification, iPhone chỉ hỗ trợ khi đã cài app ra màn hình chính).
2. **Biểu đồ tiến độ** tuần/tháng (phút tập, số đêm ngủ ngon) + phiếu theo dõi giấc ngủ in được như trong Cẩm nang 121.
3. Thêm kỹ thuật khi kho Bs. Phúc có số mới (bác sĩ hẹn: hơi thở điều tiết Beta/Gamma, cơ hoành – cơ liên sườn). Thêm thẳng vào `MODES`.
4. **Giọng đọc thu sẵn** (giọng thật của anh Dũng) thay cho giọng máy – thêm tệp mp3 ngắn vào `audio/`, nhớ thêm vào `sw.js`.
5. Liên kết 2 chiều với app HLV Sức Khỏe (ghi phút tập thở vào báo cáo tuần của HLV) – có thể dùng chung `localStorage` nếu cùng tên miền gốc thì không được (khác tên miền phụ) → cần xuất/nhập tệp hoặc gộp vào cùng một app.
6. Trang chủ: viết 6 bài đầu tiên (đã có danh sách), bài "Thở 4-7-8 trước khi ngủ" nên link sang BreathSync; cân nhắc Astro/Hugo khi > 10 bài.
7. Bản tiếng Anh cho trang chủ (hiện chỉ app có).
8. Nếu có PayPal.Me: điền vào `APP.paypal.me` trong `js/data.js` và nút PayPal trên trang chủ.

## 5. Danh sách kiểm tra mỗi lần phát hành
- [ ] Đổi `CACHE` trong `sw.js` và `version` trong `js/data.js`
- [ ] Sửa đủ cả `vi` và `en`
- [ ] Mở thử trên Chrome (F12, khung điện thoại), không lỗi đỏ ở Console
- [ ] Bấm Bắt đầu → nghe chuông/sóng → Tạm dừng → Kết thúc
- [ ] Mở mục Giới thiệu: mã QR hiện, nút chép hoạt động
- [ ] Ghi dòng thay đổi vào `README.md` mục Phiên bản
- [ ] Không xoá tệp `CNAME`
