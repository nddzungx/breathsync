<img src="img/logo.svg" width="96" alt="BreathSync logo">

# BreathSync – Hơi thở ý thức · HLV Sức Khoẻ

Ứng dụng web cài được lên điện thoại (PWA) hướng dẫn **thở chậm có kiểm soát**: vòng tròn co giãn dẫn nhịp, nền âm thanh sóng biển dâng lên – rút xuống theo hơi thở, chuông bát báo nhịp, giọng đọc hướng dẫn và rung. Song ngữ **Việt – Anh**, miễn phí, không quảng cáo, dùng được khi không có mạng.

**👉 Mở ứng dụng: https://tho.hlvsuckhoe.com/** · English: https://tho.hlvsuckhoe.com/?lang=en

## Năm kỹ thuật – "bộ phanh hơi thở" đi từ nhẹ đến sâu
| # | Kỹ thuật | Nhịp (giây) | Nguồn |
|---|---|---|---|
| 1 | Thở bụng cơ hoành (nền tảng) | 4-2-6 / 4-0-6 (không nín) / 3-0-6 chúm môi | BS. Trần Văn Phúc, số 011, 068, 117, 121, 134, 135 |
| 2 | Thở đều 3D (1-1-1) | 4-4-4 hoặc 5-5-5 | số 117 |
| 3 | Thở Theta 1-1-2 / 1-4-2 | 4-4-8 / 4-16-8 | số 120, 134 |
| 4 | Thở 4-7-8 trước khi ngủ | 4-7-8 / 4-4-8 | số 121, 135 |
| 5 | Ngân âm "M" (humming) | 4-2-8 / 4-0-8 | **không phải của BS. Phúc** – bổ sung theo y văn Weitzberg & Lundberg 2002 |

Mỗi nhận định khoa học được gắn nhãn **Y văn / Quan điểm BS. Phúc / Đang tranh luận**.

## Tính năng
- **Hướng dẫn sử dụng ngay trong app** (nút **?** trên cùng, thẻ "Lần đầu dùng", chân trang, mục Giới thiệu): ứng dụng là gì, ý nghĩa của hơi thở chậm, tác dụng có thể mong đợi, 4 bước dùng nhanh, đọc màn hình, các nút, nên chọn kỹ thuật nào (bấm là chọn luôn), cài lên điện thoại, mẹo, câu hỏi thường gặp.
- Nút **Bắt đầu cố định ở đáy màn hình** (vùng ngón cái) + chạm vào vòng tròn để bắt đầu/tạm dừng; khi đang tập chỉ còn vòng tròn (chế độ tập trung), màn hình luôn sáng.
- Thời lượng 1–15 phút hoặc không giới hạn; luôn kết thúc trọn chu kỳ, ba tiếng chuông khi xong.
- **Nhịp cá nhân hoá**: đo hoặc nhập thời gian hít vào, app tự giữ tỉ lệ.
- **Đo nhịp thở tự nhiên** (nhịp/phút) bằng cách chạm.
- Lộ trình 12 tuần, khung an toàn, lịch sử – chuỗi ngày tập.
- Mục **Giới thiệu & mời cà phê** (VietQR, PayPal), miễn trừ trách nhiệm, đồng ý lần đầu.

## Cấu trúc
| Tệp | Vai trò |
|---|---|
| `index.html` | Khung trang + toàn bộ CSS |
| `js/i18n.js` | Chuỗi giao diện Việt / Anh |
| `js/data.js` | Nội dung: kỹ thuật, bộ phanh, an toàn, giới thiệu, ngân hàng/PayPal |
| `js/audio.js` | Âm thanh tự tổng hợp (Web Audio): sóng biển, nền ấm, chuông bát, nhịp đôi tai, giọng đọc |
| `js/app.js` | Giao diện, bộ máy phiên thở, lưu cài đặt |
| `sw.js`, `manifest.webmanifest`, `icons/` | Chạy offline, cài như app |
| `img/logo.svg`, `img/qr_ung_ho.png` | Logo, mã VietQR |
| `CNAME` | Tên miền `tho.hlvsuckhoe.com` – **không xoá** |
| `docs/` | Hướng dẫn cập nhật & bàn giao kinh nghiệm |

Không cần build – tải đè tệp lên GitHub là xong. Xem **[docs/HUONG_DAN_CAP_NHAT.md](docs/HUONG_DAN_CAP_NHAT.md)** và **[docs/BAN_GIAO.md](docs/BAN_GIAO.md)**.

## Miễn trừ trách nhiệm
Ứng dụng cung cấp hướng dẫn giáo dục sức khoẻ chung, **không thay thế** tư vấn, chẩn đoán hay điều trị của bác sĩ. Tập thở chỉ hỗ trợ – **không tự ngừng thuốc**. Người bệnh tim mạch, huyết áp, bệnh phổi, thai phụ, người có rối loạn hoảng sợ hãy hỏi bác sĩ và chọn kỹ thuật không nín thở. Nội dung bài giảng tham khảo thuộc về BS. Trần Văn Phúc; bác sĩ không biên soạn, không duyệt ứng dụng.

## Ủng hộ
Thấy hữu ích? Mời người phát triển một ly cà phê: VietQR – BIDV · 3210256468 · NGUYEN DUC DUNG · PayPal: ndd.phateco@gmail.com

## Phiên bản
- **2.1.0** (22/11/2026): thêm **Hướng dẫn sử dụng** song ngữ; thở bụng cơ hoành lên vị trí số 1 (nền tảng) với nguồn số 011, 068, 117, 121, 134, 135 và phương án **thở chúm môi 1:2**; ghi rõ ngân âm "M" không thuộc bài giảng BS. Phúc; bổ sung số 134 (1-1-2 cho trào ngược), 135 (lộ trình 1:2 → ba thì → 4-7-8); nút ngôn ngữ gọn một chạm.
- **2.0.0** (22/11/2026): làm lại toàn bộ – song ngữ, giao diện điện thoại, nút Bắt đầu cố định + chế độ tập trung, âm thanh thiền mới, nội dung cập nhật theo số 117/120/121 kèm nhãn y văn, giới thiệu & ủng hộ, miễn trừ, logo mới, PWA tại tho.hlvsuckhoe.com.
- 1.x: bản một tệp HTML ban đầu (5 phác đồ, sóng Alpha/Theta/Delta, binaural).

## English
**BreathSync** is a free, offline-capable breathing coach (PWA): a guiding circle, ocean sound that swells with your breath, singing-bowl cues, voice and haptics; five techniques from gentle to deep (3D even breathing, 1-1-2 / 1-4-2, 4-7-8, humming, diaphragmatic). Switch language with the VI/EN toggle. Feedback: nddzungx@gmail.com

© 2026 Nguyễn Đức Dũng. Bảo lưu mọi quyền – xem [LICENSE](LICENSE).
