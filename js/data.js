/* BreathSync – nội dung: các kỹ thuật thở, bộ phanh, an toàn, giới thiệu.
   Nguồn chính: chuỗi bài về hơi thở của BS. Trần Văn Phúc trên kênh YouTube
   "Bác sĩ Trần Văn Phúc Official" – số 117 (06/06/2026), 120 (27/06/2026), 121 (04/07/2026),
   đã được đối chiếu y văn trong kho Cẩm nang/Góp ý (D:\Bs Phuc). Mỗi nhận định được gắn nhãn:
   'y' = y văn xác nhận · 'p' = quan điểm của BS. Phúc · 'd' = đang tranh luận / chưa chứng minh.
   Sửa nội dung: chỉ sửa tệp này (giữ đủ cả vi và en). */
window.APP = {
  version: '2.1.0',
  url: 'https://tho.hlvsuckhoe.com/',
  repo: 'https://github.com/nddzungx/breathsync',
  email: 'nddzungx@gmail.com',
  bank: { name: 'NGUYEN DUC DUNG', bank: 'BIDV', acc: '3210256468' },
  paypal: { email: 'ndd.phateco@gmail.com', me: '' }, // me: dán link paypal.me/... nếu có
  site: 'https://hlvsuckhoe.com/',
  apps: [
    { vi: 'HLV Sức Khỏe – huấn luyện viên sức khoẻ cá nhân', en: 'HLV Sức Khỏe – personal health coach', url: 'https://app.hlvsuckhoe.com/' },
    { vi: 'Xưởng kính thiên văn', en: 'Telescope Workshop (Vietnamese)', url: 'https://thienvan.hlvsuckhoe.com/' }
  ]
};

const YT = {
    e117: 'https://www.youtube.com/watch?v=uNoLFRZbfkw',
  e120: 'https://www.youtube.com/watch?v=n35R35yICD8',
  e121: 'https://www.youtube.com/watch?v=hkP4Heyobuc'
};

const L = (vi, en) => ({ vi, en });
const P = {
  inhale: L('Hít vào', 'Breathe in'),
  inhale3d: L('Hít vào 3D', 'Breathe in (3D)'),
  hold: L('Nín thở', 'Hold'),
  exhale: L('Thở ra', 'Breathe out'),
  exhaleSlow: L('Thở ra chậm', 'Slow exhale'),
  hum: L('Ngân "Mmm"', 'Hum "Mmm"'),
  inBelly: L('Hít vào – phồng bụng', 'In – belly rises'),
  outBelly: L('Thở ra – hóp bụng', 'Out – belly falls')
};
const H = {
  in3d: L('phồng bụng rồi nở ngực', 'belly first, then chest'),
  out3d: L('hóp bụng, thu ngực', 'belly in, chest softens'),
  holdSoft: L('giữ nhẹ, không gồng', 'soft, no straining'),
  teeth: L('hé môi, hơi qua kẽ răng', 'lips parted, air through the teeth'),
  nose: L('bằng mũi', 'through the nose'),
  humLips: L('khép môi, rung nhẹ ở mũi', 'lips closed, feel the buzz'),
  hand: L('tay trên bụng nâng lên', 'hand on belly rises'),
  handDown: L('tay trên bụng hạ xuống', 'hand on belly sinks')
};
const ph = (key, dur, label, hint) => ({ key, dur, label, hint });

window.MODES = [
  {
    id: 'alpha', n: 2, rgb: '16,185,129', accent: '#10b981', soft: '#34d399', binaural: 10,
    name: L('Thở đều 3D', 'Even 3D breathing'),
    band: L('Alpha · 8–12 Hz', 'Alpha · 8–12 Hz'), ratio: '1 : 1 : 1',
    src: L('Số 117', 'Ep. 117'),
    variants: [
      { id: 'A', label: L('4 – 4 – 4', '4 – 4 – 4'), sub: L('Nhẹ nhàng nhất', 'Gentlest'), phases: [ph('inhale', 4, P.inhale3d, H.in3d), ph('hold', 4, P.hold, H.holdSoft), ph('exhale', 4, P.exhale, H.out3d)] },
      { id: 'B', label: L('5 – 5 – 5', '5 – 5 – 5'), sub: L('Như BS. Phúc đếm', 'As Dr. Phúc counts'), phases: [ph('inhale', 5, P.inhale3d, H.in3d), ph('hold', 5, P.hold, H.holdSoft), ph('exhale', 5, P.exhale, H.out3d)] }
    ],
    how: [
      L('Ngồi thẳng lưng, vai thả lỏng (hoặc nằm). Thở ra hết một lần cho nhẹ.', 'Sit tall with relaxed shoulders (or lie down). Breathe out fully once.'),
      L('Hít vào "3D": phồng bụng trước để cơ hoành hạ xuống, rồi nở ngực ra phía trước và hai bên.', 'Breathe in "3D": let the belly rise first so the diaphragm drops, then widen the chest front and sides.'),
      L('Nín nhẹ nhàng bằng đúng thời gian hít vào – không gồng, không nghẹn cổ.', 'Hold gently for the same count – no straining, no throat lock.'),
      L('Thở ra từ từ cùng số đếm: hóp bụng vào hết, ngực thu lại. Bỏ thì nín thứ tư, hít vào ngay chu kỳ mới.', 'Exhale slowly for the same count: belly in, chest softens. Skip the 4th pause and start the next cycle.'),
      L('Đếm nhanh hay chậm tuỳ hơi dài ngắn – quan trọng là ba thì bằng nhau.', 'Count faster or slower to suit your breath – what matters is three equal parts.')
    ],
    when: L('Căng thẳng ban ngày, trước khi phát biểu, học bài, làm bài thi. BS. Phúc gợi ý người tăng huyết áp tập 10–15 phút mỗi ngày và đo lại huyết áp sau khoảng 8 tuần.',
            'Daytime stress, before a talk, studying or an exam. Dr. Phúc suggests people with high blood pressure practise 10–15 minutes a day and re-check their pressure after about 8 weeks.'),
    ev: [
      [L('Thở chậm có chủ đích làm nhịp tim chậm lại, giảm cảm giác lo âu và có thể hạ huyết áp tâm thu vài mmHg – mức giảm khác nhau ở mỗi người (AHA 2013 xếp mức IIb).', 'Deliberate slow breathing slows the heart, eases anxiety and may lower systolic pressure by a few mmHg – the effect varies between people (AHA 2013, class IIb).'), 'y'],
      [L('Gắn kiểu thở này với sóng Alpha là cách hệ thống hoá của BS. Phúc; ứng dụng không đo sóng não.', 'Linking this pattern to alpha waves is Dr. Phúc\'s framework; the app does not measure brain waves.'), 'p'],
      [L('Tập thở là biện pháp hỗ trợ, không thay thuốc huyết áp – không tự ngừng hay giảm thuốc.', 'Breathing is a complement, not a replacement for blood-pressure medicine – never stop or cut it yourself.'), 'y']
    ],
    tags: [L('Thở 3D', '3D breath'), L('Hệ phó giao cảm', 'Parasympathetic'), L('Hỗ trợ huyết áp', 'BP support'), L('Tập trung', 'Focus')],
    source: L('BS. Trần Văn Phúc – số 117 "Làm chủ Nhân xanh – thở đều đặn giúp hạ huyết áp và khơi thông trí tuệ" (06/06/2026).', 'Dr. Trần Văn Phúc – episode 117 on even breathing and blood pressure (6 Jun 2026, Vietnamese).'), link: YT.e117,
    caution: L('Hỗ trợ, không thay thuốc huyết áp. Dừng lại nếu chóng mặt, tê môi hay tức ngực.', 'A complement, not a replacement for BP medicine. Stop if dizzy, tingling or chest-tight.')
  },
  {
    id: 'theta', n: 3, rgb: '139,92,246', accent: '#8b5cf6', soft: '#a78bfa', binaural: 6,
    name: L('Thở Theta 1-1-2 · 1-4-2', 'Theta breathing 1-1-2 · 1-4-2'),
    band: L('Theta · 4–8 Hz', 'Theta · 4–8 Hz'), ratio: '1 : 1 : 2',
    src: L('Số 120', 'Ep. 120'),
    variants: [
      { id: 'A', label: L('4 – 4 – 8', '4 – 4 – 8'), sub: L('1-1-2 · phanh hiệu nghiệm', '1-1-2 · effective brake'), phases: [ph('inhale', 4, P.inhale3d, H.in3d), ph('hold', 4, P.hold, H.holdSoft), ph('exhale', 8, P.exhaleSlow, H.out3d)] },
      { id: 'B', label: L('4 – 16 – 8', '4 – 16 – 8'), sub: L('1-4-2 · cho người đã quen', '1-4-2 · experienced only'), hold: true, phases: [ph('inhale', 4, P.inhale3d, H.in3d), ph('hold', 16, P.hold, H.holdSoft), ph('exhale', 8, P.exhaleSlow, H.out3d)] }
    ],
    how: [
      L('Tập quen thở đều 1-1-1 trước ít nhất 1–2 tuần.', 'Get comfortable with even 1-1-1 breathing for at least 1–2 weeks first.'),
      L('Phương án A (1-1-2): hít 4, nín 4, thở ra 8 – thì thở ra dài gấp đôi.', 'Option A (1-1-2): in 4, hold 4, out 8 – the exhale is twice as long.'),
      L('Phương án B (1-4-2): nín gấp bốn lần hít vào. Nếu khó, đếm nhanh hơn hoặc quay lại A.', 'Option B (1-4-2): the hold is four times the inhale. If it is hard, count faster or go back to A.'),
      L('Thở ra đều như rót nước – không "xả" vội ở cuối.', 'Pour the exhale out evenly – don\'t dump the air at the end.')
    ],
    when: L('Bực bội, sau cãi vã, muốn lắng lại để suy nghĩ thấu đáo; phương án B cho thư giãn sâu, chuẩn bị ngủ (người đã quen tập). Ở số 134, nhịp 1-1-2 thở cơ hoành được gợi ý cho người trào ngược dạ dày – thực quản và căng thẳng thần kinh.',
            'Irritation, after an argument, when you want to settle and think clearly; option B for deep relaxation before sleep (experienced only). In episode 134 the 1-1-2 diaphragmatic pace is suggested for people with acid reflux and nervous exhaustion.'),
    ev: [
      [L('Thì thở ra kéo dài gắn với tăng hoạt động phó giao cảm: tim đập chậm lại khi thở ra (loạn nhịp xoang hô hấp).', 'Longer exhales go with more parasympathetic activity: the heart slows as you breathe out (respiratory sinus arrhythmia).'), 'y'],
      [L('Tập thở cơ hoành đều đặn giảm triệu chứng trào ngược trong một số thử nghiệm nhỏ – là biện pháp hỗ trợ, không thay thuốc.', 'Regular diaphragmatic breathing training reduced reflux symptoms in some small trials – a complement, not a replacement for medicine.'), 'y'],
      [L('"Đưa não vào sóng Theta", rèn nhân xanh chịu đựng CO₂ là cách giải thích của BS. Phúc.', '"Moving the brain into theta" and training CO₂ tolerance is Dr. Phúc\'s explanation.'), 'p'],
      [L('Chuỗi "CO₂ → nhân xanh → phó giao cảm" không khớp với y văn hiện hành; nhịp thở được tạo chủ yếu ở hành não.', 'The chain "CO₂ → locus coeruleus → parasympathetic" does not match current physiology; breathing rhythm arises mainly in the medulla.'), 'd']
    ],
    tags: [L('Thở ra dài', 'Long exhale'), L('Thả lỏng sâu', 'Deep calm'), L('Khí công · Yoga', 'Qigong · Yoga')],
    source: L('BS. Trần Văn Phúc – số 120 "Hơi thở của Ý thức – sóng não Theta trong khí công và yoga" (27/06/2026); ứng dụng cho trào ngược ở số 134.', 'Dr. Trần Văn Phúc – episode 120 on theta waves, qigong and yoga (27 Jun 2026, Vietnamese); applied to reflux in episode 134.'), link: YT.e120,
    caution: L('Phương án B nín 16 nhịp: không dành cho người bệnh tim mạch, tăng huyết áp chưa kiểm soát, bệnh phổi, thai phụ, người hay hoảng sợ.', 'Option B holds for 16 counts: not for heart disease, uncontrolled high blood pressure, lung disease, pregnancy or panic disorder.')
  },
  {
    id: 'delta', n: 4, rgb: '59,130,246', accent: '#3b82f6', soft: '#60a5fa', binaural: 3,
    name: L('Thở 4-7-8 trước khi ngủ', '4-7-8 breathing for sleep'),
    band: L('Delta · 0,5–4 Hz', 'Delta · 0.5–4 Hz'), ratio: '4 : 7 : 8',
    src: L('Số 121', 'Ep. 121'),
    variants: [
      { id: 'A', label: L('4 – 7 – 8', '4 – 7 – 8'), sub: L('Chuẩn', 'Classic'), phases: [ph('inhale', 4, P.inhale, H.nose), ph('hold', 7, P.hold, H.holdSoft), ph('exhale', 8, P.exhaleSlow, H.teeth)] },
      { id: 'B', label: L('4 – 4 – 8', '4 – 4 – 8'), sub: L('Khi nín 7 còn khó', 'If 7 feels long'), phases: [ph('inhale', 4, P.inhale, H.nose), ph('hold', 4, P.hold, H.holdSoft), ph('exhale', 8, P.exhaleSlow, H.teeth)] }
    ],
    how: [
      L('Ngồi lưng thẳng hoặc nằm ngửa trên giường. Thở ra hết một lần qua miệng.', 'Sit upright or lie on your back in bed. Breathe out fully through the mouth once.'),
      L('Hít vào bằng mũi đếm 4 – bụng phồng trước rồi đến ngực, không cố hít thật căng.', 'Breathe in through the nose for 4 – belly then chest, without forcing.'),
      L('Nín nhẹ nhàng đếm 7.', 'Hold softly for 7.'),
      L('Thở ra chậm đếm 8: hé miệng, chu môi nhẹ, hai hàm răng khép để hơi đi đều qua kẽ răng (hoặc thở bằng mũi nếu giữ đều được).', 'Exhale slowly for 8: lips slightly parted, teeth together so the air flows evenly between them (or through the nose if you can keep it even).'),
      L('Người mới: 4 chu kỳ mỗi lần, 2 lần/ngày; sau khoảng 1 tháng mới tăng dần (tối đa khoảng 8 chu kỳ). Chọn thời lượng 1 phút ≈ 3 chu kỳ.', 'Beginners: 4 cycles per session, twice a day; increase slowly after about a month (up to ~8 cycles). The 1-minute setting ≈ 3 cycles.')
    ],
    when: L('Trước khi ngủ, khi trằn trọc giữa đêm – đếm nhịp thở thay vì đếm cừu, đừng ra lệnh cho mình "phải ngủ".', 'At bedtime or when you wake at night – count breaths instead of sheep, and don\'t order yourself to sleep.'),
    ev: [
      [L('Kỹ thuật do BS. Andrew Weil phổ biến, phát triển từ pranayama. Thở chậm, thở ra dài giúp cơ thể dịu xuống.', 'Popularised by Dr. Andrew Weil from pranayama. Slow breathing with long exhales helps the body settle.'), 'y'],
      [L('Một nghiên cứu nhỏ (Vierra 2022) thấy 4-7-8 cải thiện biến thiên nhịp tim sau một đêm thiếu ngủ – kết quả sơ bộ.', 'A small study (Vierra 2022) found 4-7-8 improved heart-rate variability after a night of sleep loss – preliminary.'), 'y'],
      [L('Tạo được sóng Delta khi đang thức hay tăng hormone tăng trưởng nhờ 4-7-8 là chưa được chứng minh. Giấc ngủ sâu mới là lúc tiết GH nhiều nhất.', 'Producing delta waves while awake, or boosting growth hormone with 4-7-8, is unproven. Deep sleep itself is when GH peaks.'), 'd']
    ],
    tags: [L('Giấc ngủ', 'Sleep'), L('Thở ra dài', 'Long exhale'), L('Thiền tập trung', 'Focused meditation')],
    source: L('BS. Trần Văn Phúc – số 121 "Kỹ thuật thở 4-7-8, sóng não Delta và thiền định" (04/07/2026); số 135 nhắc lộ trình nâng dần 1:2 → ba thì → 4-7-8.', 'Dr. Trần Văn Phúc – episode 121 on 4-7-8 breathing, delta waves and meditation (4 Jul 2026, Vietnamese).'), link: YT.e121,
    caution: L('Choáng nhẹ những lần đầu khá thường gặp – bắt đầu ít chu kỳ. Mất ngủ trên 3 tháng, ngáy to, ngừng thở khi ngủ: hãy đi khám.', 'Light-headedness is common at first – start with few cycles. Insomnia over 3 months, loud snoring or pauses in breathing at night: see a doctor.')
  },
  {
    id: 'hum', n: 5, rgb: '245,158,11', accent: '#f59e0b', soft: '#fbbf24', binaural: 8,
    name: L('Thở ngân âm "M"', 'Humming breath "M"'),
    band: L('Ngân nga · NO mũi', 'Humming · nasal NO'), ratio: '4 : 2 : 8',
    src: L('Bổ sung · y văn', 'Extra · literature'),
    variants: [
      { id: 'A', label: L('4 – 2 – 8', '4 – 2 – 8'), sub: L('Có nín ngắn', 'Short hold'), phases: [ph('inhale', 4, P.inhale, H.nose), ph('hold', 2, P.hold, H.holdSoft), ph('hum', 8, P.hum, H.humLips)] },
      { id: 'B', label: L('4 – 0 – 8', '4 – 0 – 8'), sub: L('Không nín', 'No hold'), phases: [ph('inhale', 4, P.inhale, H.nose), ph('hum', 8, P.hum, H.humLips)] }
    ],
    how: [
      L('Hít vào nhẹ bằng mũi.', 'Breathe in gently through the nose.'),
      L('Khép môi, thả lỏng hàm, ngân "mmm" nhỏ và đều suốt thì thở ra – cảm nhận rung ở mũi, môi, ngực.', 'Close the lips, relax the jaw and hum a soft, steady "mmm" for the whole exhale – feel the buzz in the nose, lips and chest.'),
      L('Không cần to – âm vừa đủ nghe, như ru em bé.', 'No need to be loud – as soft as a lullaby.')
    ],
    when: L('Khi muốn thở ra dài mà không phải đếm; khi tâm trí lan man; trước giờ ngủ hoặc giữa giờ làm việc.', 'When you want a long exhale without counting; when the mind wanders; before sleep or during a work break.'),
    ev: [
      [L('Nghiên cứu nhỏ (Weitzberg & Lundberg, 2002) ghi nhận ngân nga làm nitric oxide (NO) trong khoang mũi tăng khoảng 15 lần so với thở ra yên lặng, do tăng trao đổi khí giữa xoang và mũi.', 'A small study (Weitzberg & Lundberg, 2002) found humming raised nasal nitric oxide about 15-fold versus quiet exhaling, by boosting air exchange between sinuses and nose.'), 'y'],
      [L('Chưa có bằng chứng ngân nga chữa viêm xoang hay "diệt khuẩn" – đừng thay thuốc điều trị.', 'There is no evidence humming cures sinusitis or "kills germs" – don\'t replace treatment.'), 'd']
    ],
    tags: [L('Nitric oxide mũi', 'Nasal NO'), L('Thở ra dài', 'Long exhale'), L('Rung âm', 'Vibration')],
    source: L('Kỹ thuật bổ sung của người biên soạn. BS. Trần Văn Phúc KHÔNG hướng dẫn kỹ thuật này trong các số phát sóng (đã rà soát kho đối thoại). Y văn: Weitzberg E, Lundberg JO. Am J Respir Crit Care Med 2002 (giống bài thở "tiếng ong" Bhramari của yoga).', 'Added by the editor. Dr. Trần Văn Phúc does NOT teach this technique in his episodes (transcripts checked). Reference: Weitzberg E, Lundberg JO. Am J Respir Crit Care Med 2002 (similar to yoga\'s "bee breath", Bhramari).'), link: '',
    caution: L('Ngừng nếu đau nhức xoang, chóng mặt. Không thay thuốc điều trị viêm xoang.', 'Stop if your sinuses hurt or you feel dizzy. Not a substitute for sinus treatment.')
  },
  {
    id: 'belly', n: 1, rgb: '13,148,136', accent: '#0d9488', soft: '#2dd4bf', binaural: 6,
    name: L('Thở bụng cơ hoành', 'Diaphragmatic breathing'),
    band: L('Nền tảng · thở đúng', 'Foundation · breathe right'), ratio: '4 : 2 : 6',
    src: L('Số 011 · 068', 'Ep. 011 · 068'),
    variants: [
      { id: 'A', label: L('4 – 2 – 6', '4 – 2 – 6'), sub: L('Nín ngắn', 'Short hold'), phases: [ph('inhale', 4, P.inBelly, H.hand), ph('hold', 2, P.hold, H.holdSoft), ph('exhale', 6, P.outBelly, H.handDown)] },
      { id: 'B', label: L('4 – 0 – 6', '4 – 0 – 6'), sub: L('Không nín – an toàn nhất', 'No hold – safest'), phases: [ph('inhale', 4, P.inBelly, H.hand), ph('exhale', 6, P.outBelly, H.handDown)] },
      { id: 'C', label: L('3 – 0 – 6', '3 – 0 – 6'), sub: L('Chúm môi 1 : 2 (phế quản)', 'Pursed lips 1 : 2 (airways)'), phases: [ph('inhale', 3, P.inBelly, H.nose), ph('exhale', 6, L('Thở ra chúm môi', 'Pursed-lip exhale'), L('chúm môi như huýt sáo, bụng hóp', 'lips pursed as if whistling, belly in'))] }
    ],
    how: [
      L('Đặt một tay lên bụng, một tay lên ngực. Ngồi thẳng hoặc nằm ngửa, vai thả lỏng.', 'Place one hand on your belly and one on your chest. Sit tall or lie on your back, shoulders relaxed.'),
      L('Hít vào bằng mũi: bụng phồng ra (tay trên bụng nâng lên) – cơ hoành hạ xuống, phổi giãn nở nhiều nhất. Tay trên ngực gần như đứng yên.', 'Breathe in through the nose: the belly rises (belly hand lifts) – the diaphragm drops and the lungs expand most. The chest hand barely moves.'),
      L('Thở ra chậm hơn hít vào, hóp bụng vào để cơ hoành đẩy lên, đẩy hết khí cặn ra ngoài.', 'Breathe out longer than in, drawing the belly in so the diaphragm rises and pushes stale air out.'),
      L('Nguyên tắc BS. Phúc nhắc nhiều lần: "hít vào bụng phồng, thở ra bụng hóp". Nhiều người – nhất là phụ nữ – quen thở ngực nhanh và nông; hãy tập lại như hơi thở tự nhiên của trẻ sơ sinh.', 'Dr. Phúc\'s rule, repeated often: "belly out on the in-breath, belly in on the out-breath". Many people – especially women – habitually breathe fast and shallow with the chest; relearn the natural breath of a newborn.'),
      L('Phương án B không nín thở – hợp khi mang thai, có bệnh tim phổi, người lớn tuổi. Phương án C thở ra chúm môi như huýt sáo, dài gấp đôi hít vào – dành cho người phế quản yếu, hay hụt hơi.', 'Option B has no hold – for pregnancy, heart or lung conditions and older adults. Option C exhales through pursed lips, twice as long as the inhale – for people with weak airways or breathlessness.')
    ],
    when: L('Bước đầu tiên trước mọi bài thở khác; khi hồi hộp, sau gắng sức, trước khi ngủ. Ở số 135, thở chúm môi kết hợp thở cơ hoành nhịp 1:2 được gợi ý cho người tổn thương phế quản, sau đó nâng dần lên thở ba thì và 4-7-8.',
            'The first step before any other exercise; when nervous, after exertion, before sleep. In episode 135 pursed-lip diaphragmatic breathing at 1:2 is suggested for damaged airways, then gradually progressing to three-phase and 4-7-8 breathing.'),
    ev: [
      [L('Cơ hoành là cơ hô hấp chính; thở cơ hoành chậm giúp giảm nhịp thở và cảm giác căng thẳng; thì thở ra dài hơn hít vào dễ chịu và an toàn với đa số người.', 'The diaphragm is the main breathing muscle; slow diaphragmatic breathing lowers breathing rate and perceived stress; an exhale longer than the inhale is comfortable and safe for most people.'), 'y'],
      [L('Thở chúm môi giúp người bệnh phổi tắc nghẽn mạn (COPD) bớt khó thở và được khuyến cáo trong phục hồi chức năng hô hấp.', 'Pursed-lip breathing eases breathlessness in COPD and is recommended in pulmonary rehabilitation.'), 'y'],
      [L('Mỡ thừa khi được đốt cháy phần lớn rời cơ thể dưới dạng CO₂ qua hơi thở (số 068) – đúng; nhưng thở sâu hơn không tự làm đốt nhiều mỡ hơn, cần vận động và ăn uống hợp lý.', 'Most burned body fat leaves as CO₂ through the breath (ep. 068) – true; but breathing harder does not burn more fat by itself – you still need exercise and diet.'), 'd'],
      [L('"Khoảng 70% phụ nữ thở sai" là ước lượng từ quan sát của BS. Phúc, chưa có số liệu nghiên cứu.', '"About 70% of women breathe wrongly" is Dr. Phúc\'s observational estimate, without study data.'), 'p'],
      [L('Không chữa được ngáy hay ngưng thở khi ngủ – người ngáy to, ngừng thở khi ngủ cần đi khám.', 'It does not treat snoring or sleep apnoea – loud snoring or pauses in breathing at night need a doctor.'), 'y']
    ],
    tags: [L('Cơ hoành', 'Diaphragm'), L('Hơi thở trẻ sơ sinh', 'Newborn breath'), L('Chúm môi', 'Pursed lips'), L('An toàn', 'Gentle')],
    source: L('BS. Trần Văn Phúc – số 011 "Ngủ ngáy: cẩn thận gây tai nạn!" (cơ liên sườn và cơ hoành, nguyên tắc thở bụng), số 068 "Giảm béo phần 4" (thở cơ hoành để thu nạp oxy), số 117 và 121 (thở 3D – hơi thở trẻ sơ sinh), số 134 và 135 (ứng dụng cho trào ngược, tổn thương phế quản). Nhịp 4-2-6 / 4-0-6 / 3-0-6 do người biên soạn đặt theo các nguyên tắc này.',
                  'Dr. Trần Văn Phúc – ep. 011 on snoring (intercostal muscles vs diaphragm, belly-breathing rule), ep. 068 on fat loss (diaphragmatic breathing for oxygen), eps. 117 & 121 (3D / newborn breath), eps. 134 & 135 (reflux and airway damage). The 4-2-6 / 4-0-6 / 3-0-6 paces were set by the editor from these principles.'), link: '',
    caution: L('Nếu bạn mang thai hoặc có bệnh tim, phổi: chọn phương án B (không nín) hoặc C (chúm môi).', 'Pregnant, or living with a heart or lung condition? Choose option B (no hold) or C (pursed lips).')
  }
];
window.MODES.sort((a, b) => a.n - b.n);

/* Bộ phanh hơi thở (số 117 → 120 → 121) và lộ trình 12 tuần (biên tập bổ sung, thận trọng) */
window.BRAKE = {
  intro: L('BS. Phúc ví bộ não căng thẳng như chiếc xe đổ dốc: đừng "phanh" bằng cách ép mình "không được nghĩ gì", mà hạ dần từng nấc bằng hơi thở.',
           'Dr. Phúc likens a stressed brain to a car rolling downhill: don\'t brake by forcing yourself to "think of nothing" – step down gradually with your breath.'),
  head: [L('Nấc', 'Level'), L('Nhịp', 'Pace'), L('Dùng khi', 'When')],
  rows: [
    [L('Nền: thở bụng (số 011)', 'Base: belly (ep. 011)'), '4-0-6', L('Học thở đúng trước tiên', 'Learn to breathe right first')],
    [L('1-1-1 (số 117)', '1-1-1 (ep. 117)'), '4-4-4', L('Căng thẳng ban ngày, trước khi học, làm bài', 'Daytime stress, before study or exams')],
    [L('1-1-2 (số 120)', '1-1-2 (ep. 120)'), '4-4-8', L('Bực bội, cãi vã', 'Irritation, arguments')],
    [L('1-4-2 (số 120)', '1-4-2 (ep. 120)'), '4-16-8', L('Thư giãn sâu – người đã quen', 'Deep relaxation – experienced')],
    [L('4-7-8 (số 121)', '4-7-8 (ep. 121)'), '4-7-8', L('Trước khi ngủ', 'Before sleep')]
  ],
  planTitle: L('Lộ trình 12 tuần gợi ý', 'Suggested 12-week plan'),
  plan: [
    L('<b>Tuần 1:</b> thở bụng cơ hoành 4-0-6 hoặc 4-2-6, 3–5 phút × 2 lần/ngày, tay đặt trên bụng để cảm nhận.', '<b>Week 1:</b> belly breathing 4-0-6 or 4-2-6, 3–5 min × twice a day, hand on the belly.'),
    L('<b>Tuần 2:</b> thở đều 3D 4-4-4 (hoặc 5-5-5), 5 phút × 2–3 lần/ngày. Ghi giờ ngủ, giờ thức.', '<b>Week 2:</b> even 3D 4-4-4 (or 5-5-5), 5 min × 2–3 a day. Note bed and wake times.'),
    L('<b>Tuần 3–4:</b> thêm 4-4-8 trước khi ngủ; tập thở ra qua kẽ răng.', '<b>Weeks 3–4:</b> add 4-4-8 at bedtime; practise exhaling between the teeth.'),
    L('<b>Tuần 5–6:</b> bắt đầu 4-7-8: 4 chu kỳ × 2 lần/ngày (một lần lúc lên giường).', '<b>Weeks 5–6:</b> start 4-7-8: 4 cycles × twice a day (once in bed).'),
    L('<b>Tuần 7–10:</b> nếu dễ chịu, tăng lên 6–8 chu kỳ; thêm một lần khi căng thẳng.', '<b>Weeks 7–10:</b> if comfortable, 6–8 cycles; add one session when stressed.'),
    L('<b>Tuần 11–12:</b> duy trì và so sánh với tuần đầu: thời gian vào giấc, số lần thức giấc, mức mệt ban ngày. Sau 3 tháng không cải thiện: đi khám chuyên khoa giấc ngủ.', '<b>Weeks 11–12:</b> keep going and compare with week 1: time to fall asleep, night wakings, daytime tiredness. No better after 3 months? See a sleep specialist.')
  ],
  base: L('Nền móng trước, bộ phanh sau: ăn uống đủ chất, ngủ đúng giờ, vận động ban ngày – rồi mới đến kỹ thuật thở.', 'Foundation first, brakes second: eat well, keep regular sleep, move during the day – then add breathing techniques.')
};

window.SAFETY = [
  L('<b>Bệnh tim mạch</b> (mạch vành, suy tim, rối loạn nhịp, từng đột quỵ): không nín lâu, không gồng khi nín – chọn phương án không nín hoặc rút ngắn thì nín; hỏi bác sĩ trước khi tập 4-16-8.', '<b>Heart disease</b> (coronary disease, heart failure, arrhythmia, past stroke): no long or strained holds – pick a no-hold option or shorten it; ask your doctor before 4-16-8.'),
  L('<b>Huyết áp cao chưa kiểm soát, huyết áp thấp, hay chóng mặt khi đứng dậy:</b> tập khi ngồi tựa hoặc nằm, đứng dậy từ từ.', '<b>Uncontrolled high or low blood pressure, dizziness on standing:</b> practise seated or lying down; get up slowly.'),
  L('<b>Hen, bệnh phổi tắc nghẽn mạn, đang khó thở:</b> không ép hít và nín; dừng nếu khó thở tăng. Tập thở không thay thuốc xịt.', '<b>Asthma, COPD, current breathlessness:</b> don\'t force the inhale or hold; stop if breathing gets harder. Breathing exercises don\'t replace inhalers.'),
  L('<b>Mang thai:</b> tránh nín thở lâu – ưu tiên thở bụng 4-0-6 và hỏi bác sĩ sản khoa.', '<b>Pregnancy:</b> avoid long holds – prefer belly breathing 4-0-6 and ask your obstetrician.'),
  L('<b>Rối loạn hoảng sợ, lo âu nặng, động kinh, tiền sử loạn thần hoặc sang chấn:</b> tập ngắn, có người có chuyên môn hướng dẫn.', '<b>Panic disorder, severe anxiety, epilepsy, history of psychosis or trauma:</b> keep sessions short and practise with qualified guidance.'),
  L('<b>Dưới 18 tuổi:</b> tập cùng cha mẹ hoặc người lớn; chọn nhịp nhẹ.', '<b>Under 18:</b> practise with a parent or adult; choose gentle paces.'),
  L('<b>Không tập</b> khi lái xe, bơi, ở dưới nước, trên cao hoặc vận hành máy móc. Không nín thở dưới nước.', '<b>Never practise</b> while driving, swimming, underwater, at heights or operating machinery. Never hold your breath underwater.'),
  L('<b>Dừng ngay</b> khi chóng mặt, tê tay chân hoặc môi, tim đập loạn, đau tức ngực – thở bình thường lại. Đau ngực, khó thở kéo dài: gọi cấp cứu <b>113</b> (115 vẫn dùng trong giai đoạn chuyển tiếp) hoặc số khẩn cấp nơi bạn sống.', '<b>Stop at once</b> if dizzy, tingling in hands or lips, irregular heartbeat or chest tightness – return to normal breathing. Lasting chest pain or breathlessness: call your local emergency number.'),
  L('<b>Không tự ngừng, giảm hay đổi thuốc</b> (huyết áp, thuốc ngủ, an thần, chống trầm cảm, thuốc hen…). Mọi thay đổi do bác sĩ điều trị quyết định.', '<b>Never stop, reduce or change medication</b> (blood pressure, sleeping pills, sedatives, antidepressants, inhalers…) on your own. Only your doctor decides.'),
  L('<b>Cần giúp đỡ ngay</b> nếu có ý nghĩ tự hại: nói với người thân, đến cơ sở y tế gần nhất hoặc gọi cấp cứu.', '<b>Get help now</b> if you have thoughts of self-harm: tell someone close, go to the nearest health facility or call emergency services.')
];

window.ABOUT = {
  tagline: L('Hơi thở ý thức · HLV Sức Khoẻ', 'Conscious breathing · HLV Sức Khỏe'),
  appTitle: L('Về ứng dụng', 'About the app'),
  app: L('BreathSync dẫn bạn thở chậm có kiểm soát bằng vòng tròn co giãn, âm thanh thiền và rung theo từng nhịp. Các kỹ thuật được tổng hợp từ chuỗi bài giảng về hơi thở của BS. Trần Văn Phúc (số 117, 120, 121) và đối chiếu với y văn phổ biến. Miễn phí, không quảng cáo, không thu thập dữ liệu; cài lên điện thoại và dùng được khi không có mạng.',
         'BreathSync guides slow, controlled breathing with an expanding circle, calming sound and haptics for every phase. The techniques are drawn from Dr. Trần Văn Phúc\'s lecture series on breathing (episodes 117, 120, 121) and checked against mainstream medical literature. Free, no ads, no data collection; install it on your phone and use it offline.'),
  devTitle: L('Người phát triển', 'The developer'),
  dev: L('Xin chào, mình là <b>Nguyễn Đức Dũng</b>. Mình yêu khoa học, thích du lịch, gần gũi thiên nhiên và mê âm nhạc. Mình dành nhiều thời gian tìm hiểu về sức khoẻ cùng nhiều lĩnh vực khác, rồi ghi chép, làm ứng dụng và viết bài hát để chia sẻ lại với mọi người trên <a href="https://hlvsuckhoe.com/" target="_blank" rel="noopener">hlvsuckhoe.com</a>.',
         'Hi, I\'m <b>Nguyễn Đức Dũng</b>. I love science, travel, nature and music. I spend a lot of time learning about health and many other fields, then write notes, build apps and compose songs to share with everyone at <a href="https://hlvsuckhoe.com/" target="_blank" rel="noopener">hlvsuckhoe.com</a>.'),
  coffeeTitle: L('☕ Mời Dũng một ly cà phê', '☕ Buy Dũng a coffee'),
  coffee: L('Nếu bạn thấy ứng dụng và các thông tin ở đây hữu ích, hãy mời người phát triển một ly cà phê. Mỗi ly cà phê là động lực để mình tiếp tục duy trì và phát triển trang. Ủng hộ là hoàn toàn tự nguyện – ứng dụng vẫn miễn phí đầy đủ.',
            'If you find this app and the information here useful, you can buy the developer a coffee. Every cup helps keep the site running and growing. Support is entirely voluntary – the app stays fully free.'),
  qrHelp: L('Mở ứng dụng ngân hàng → Quét QR (hoặc chụp màn hình rồi chọn ảnh QR).', 'Open your banking app → Scan QR (or screenshot and pick the image).'),
  copyAcc: L('Chép số tài khoản', 'Copy account no.'),
  paypalTitle: L('🌏 Ở nước ngoài? Ủng hộ qua PayPal', '🌏 Abroad? Support via PayPal'),
  paypal: L('Mở PayPal → Gửi tiền → nhập email dưới đây → chọn số tiền và đơn vị tiền tệ.', 'Open PayPal → Send → enter the email below → choose amount and currency.'),
  openPaypal: L('Mở PayPal', 'Open PayPal'), copyPaypal: L('Chép email PayPal', 'Copy PayPal email'),
  shareTitle: L('🔗 Chia sẻ ứng dụng', '🔗 Share the app'),
  share: L('Chia sẻ', 'Share'), copyLink: L('Chép link', 'Copy link'), github: L('Mã nguồn GitHub', 'GitHub source'),
  moreTitle: L('🌿 Cùng hệ sinh thái hlvsuckhoe.com', '🌿 Also from hlvsuckhoe.com'),
  contactTitle: L('✉️ Góp ý, báo lỗi', '✉️ Feedback & bugs'),
  contact: L('Mọi góp ý, báo lỗi, đề xuất kỹ thuật thở mới xin gửi về:', 'Feedback, bug reports and technique suggestions:'),
  sendMail: L('Gửi email', 'Send email'),
  disTitle: L('⚖️ Miễn trừ trách nhiệm', '⚖️ Disclaimer'),
  dis: [
    L('BreathSync cung cấp hướng dẫn <b>giáo dục sức khoẻ chung</b>, không phải tư vấn, chẩn đoán hay điều trị y khoa, và không thay thế ý kiến của bác sĩ.', 'BreathSync offers <b>general health education</b>, not medical advice, diagnosis or treatment, and does not replace your doctor.'),
    L('Tập thở là <b>biện pháp hỗ trợ</b>. Không tự ngừng, giảm hay đổi thuốc đang điều trị.', 'Breathing exercises are <b>a complement</b>. Never stop, reduce or change prescribed medication on your own.'),
    L('Hãy hỏi bác sĩ trước khi tập các kỹ thuật nín thở nếu bạn có bệnh tim mạch, huyết áp, bệnh phổi, đang mang thai, có rối loạn lo âu – hoảng sợ, động kinh, tiền sử loạn thần, hoặc dưới 18 tuổi.', 'Ask your doctor before breath-hold techniques if you have heart, blood-pressure or lung disease, are pregnant, have anxiety/panic disorder, epilepsy, a history of psychosis, or are under 18.'),
    L('<b>Dừng ngay</b> khi chóng mặt, tê tay chân, đau tức ngực, khó thở. Cấp cứu tại Việt Nam: <b>113</b> (115 vẫn dùng trong giai đoạn chuyển tiếp); ở nước khác: số khẩn cấp địa phương.', '<b>Stop immediately</b> if dizzy, tingling, chest pain or short of breath. Emergency: your local number (Vietnam 113; 115 still works during the transition).'),
    L('Nội dung bài giảng thuộc về BS. Trần Văn Phúc và kênh YouTube của bác sĩ. Ứng dụng do cá nhân biên soạn độc lập; <b>bác sĩ không biên soạn, không duyệt</b> và không chịu trách nhiệm về ứng dụng. Các nhãn "Y văn / Quan điểm BS. Phúc / Đang tranh luận" là nhận định của người biên soạn.', 'The lecture content belongs to Dr. Trần Văn Phúc and his YouTube channel. This app is an independent compilation; <b>the doctor did not write or review it</b> and bears no responsibility for it. The "Evidence / Dr. Phúc\'s view / Debated" labels are the editor\'s assessment.'),
    L('Sóng não, nhịp đôi tai và hình minh hoạ chỉ mang tính tham khảo – ứng dụng <b>không đo</b> sóng não hay chỉ số sinh học nào.', 'Brain-wave labels, binaural tones and visuals are illustrative – the app <b>does not measure</b> brain waves or any biometrics.'),
    L('Dữ liệu (lịch sử tập, cài đặt) chỉ lưu trên thiết bị của bạn. Người phát triển không chịu trách nhiệm cho thiệt hại trực tiếp hay gián tiếp phát sinh từ việc sử dụng ứng dụng.', 'Data (history, settings) stays on your device. The developer accepts no liability for any direct or indirect damage arising from use of the app.')
  ],
  copyTitle: L('©️ Bản quyền', '©️ Copyright'),
  copy: L('© {y} Nguyễn Đức Dũng. Bảo lưu mọi quyền. Được sử dụng miễn phí cho mục đích cá nhân, phi thương mại. Không sao chép, phân phối lại hoặc dùng vì mục đích thương mại khi chưa có sự đồng ý bằng văn bản của tác giả.',
          '© {y} Nguyễn Đức Dũng. All rights reserved. Free for personal, non-commercial use. No copying, redistribution or commercial use without the author\'s written permission.'),
  credit: L('Nguồn tham khảo: kênh YouTube "Bác sĩ Trần Văn Phúc Official" – số 117, 120, 121. Phông chữ Fraunces, Be Vietnam Pro (SIL OFL).', 'References: YouTube channel "Bác sĩ Trần Văn Phúc Official" – episodes 117, 120, 121. Fonts: Fraunces, Be Vietnam Pro (SIL OFL).'),
  version: L('Phiên bản', 'Version')
};

window.CONSENT = {
  title: L('Trước khi bắt đầu', 'Before you begin'),
  points: [
    L('BreathSync là công cụ <b>giáo dục sức khoẻ</b>, không thay thế bác sĩ. Tập thở chỉ hỗ trợ – <b>không tự ngừng thuốc</b>.', 'BreathSync is a <b>health-education</b> tool, not a doctor. Breathing only complements care – <b>never stop medication</b> on your own.'),
    L('Có bệnh tim, huyết áp, phổi, đang mang thai hay hay hoảng sợ? Chọn kỹ thuật <b>không nín thở</b> và hỏi bác sĩ.', 'Heart, blood-pressure or lung disease, pregnancy or panic attacks? Choose a <b>no-hold</b> technique and ask your doctor.'),
    L('<b>Dừng ngay</b> nếu chóng mặt, tê tay, tức ngực. Không tập khi lái xe hay ở dưới nước.', '<b>Stop</b> if dizzy, tingling or chest-tight. Never practise while driving or in water.')
  ],
  agree: L('Tôi đã đọc và đồng ý với thông tin miễn trừ trách nhiệm', 'I have read and agree to the disclaimer'),
  go: L('Bắt đầu sử dụng', 'Continue'),
  more: L('Đọc đầy đủ', 'Read in full'),
  need: L('Vui lòng đánh dấu đồng ý trước.', 'Please tick the box first.')
};

/* Hướng dẫn sử dụng & giới thiệu ý nghĩa – tác dụng (bắt buộc có trong mọi ứng dụng của anh Dũng) */
window.GUIDE = {
  title: L('Hướng dẫn sử dụng', 'How to use'),
  sections: [
    { h: L('🌿 BreathSync là gì, để làm gì?', '🌿 What is BreathSync for?'), body: [
      L('Hơi thở là chức năng tự động duy nhất của cơ thể mà ta điều khiển được bằng ý muốn. Vì vậy hơi thở là "cánh cửa" để làm dịu hệ thần kinh: thở chậm, thở bụng, thở ra dài giống như nhẹ nhàng đạp chân phanh khi cơ thể đang căng thẳng.', 'Breathing is the only automatic body function you can control at will. That makes it a "door" to the nervous system: slow, belly-led breathing with a long exhale is like gently pressing the brake when you are stressed.'),
      L('BreathSync là "người đếm nhịp" bỏ túi: vòng tròn to ra khi hít vào, đứng yên khi nín, nhỏ lại khi thở ra; âm thanh và rung báo mỗi lần đổi nhịp – bạn chỉ cần nhắm mắt và làm theo, không phải tự đếm.', 'BreathSync is a pocket pace-keeper: the circle grows as you breathe in, rests while you hold and shrinks as you breathe out; sounds and vibration mark every change – just close your eyes and follow, no counting needed.')
    ]},
    { h: L('💚 Tác dụng có thể mong đợi', '💚 What you can expect'), list: [
      L('Bình tĩnh lại nhanh hơn khi hồi hộp, lo lắng (vài phút).', 'Calming down faster when nervous or anxious (within minutes).'),
      L('Dễ vào giấc hơn khi tập trước giờ ngủ.', 'Falling asleep more easily when practised at bedtime.'),
      L('Nhịp tim chậm lại; tập đều 10–15 phút mỗi ngày trong khoảng 8 tuần có thể hỗ trợ hạ huyết áp vài mmHg.', 'A slower heart rate; 10–15 minutes a day for about 8 weeks may support a few mmHg lower blood pressure.'),
      L('Tập trung hơn trước khi học, làm bài, phát biểu.', 'Better focus before study, exams or speaking.'),
      L('Hình thành thói quen thở bụng đúng cách trong sinh hoạt hằng ngày.', 'A daily habit of correct belly breathing.')
    ], note: L('BreathSync không chữa bệnh và không thay thuốc. Hiệu quả khác nhau ở mỗi người.', 'BreathSync does not cure disease or replace medicine. Results vary between people.') },
    { h: L('▶️ Dùng nhanh trong 4 bước', '▶️ Quick start in 4 steps'), steps: [
      L('<b>Chọn kỹ thuật</b> ở dải thẻ "Chọn kỹ thuật thở" (vuốt ngang để xem hết). Mới dùng lần đầu: chọn <b>01 · Thở bụng cơ hoành</b>.', '<b>Pick a technique</b> in the "Choose a technique" strip (swipe sideways). First time? Choose <b>01 · Diaphragmatic breathing</b>.'),
      L('<b>Chọn phương án nhịp</b> (ô bên dưới thẻ) và <b>thời lượng</b>: 1, 3, 5, 10, 15 phút hoặc ∞ (không giới hạn). Người mới nên bắt đầu 3 phút.', '<b>Pick a pace option</b> (boxes under the cards) and a <b>duration</b>: 1, 3, 5, 10, 15 minutes or ∞. Beginners: start with 3 minutes.'),
      L('Bấm nút xanh <b>Bắt đầu</b> ở đáy màn hình (hoặc chạm vào vòng tròn). Ngồi thẳng hoặc nằm, vai thả lỏng.', 'Tap the green <b>Start</b> button at the bottom (or tap the circle). Sit tall or lie down, shoulders relaxed.'),
      L('<b>Làm theo vòng tròn</b>: to ra → hít vào; đứng yên → nín nhẹ; nhỏ lại → thở ra. Con số lớn ở giữa là số giây còn lại của thì hiện tại. Hết giờ, ứng dụng tự dừng sau khi bạn thở ra trọn chu kỳ và rung chuông ba tiếng.', '<b>Follow the circle</b>: growing → breathe in; still → hold gently; shrinking → breathe out. The big number shows seconds left in the current phase. When time is up the app finishes the cycle and rings three bells.')
    ]},
    { h: L('🧭 Đọc màn hình', '🧭 Reading the screen'), list: [
      L('<b>Huy hiệu trên vòng tròn</b>: tên nhóm kỹ thuật và số phát sóng tham khảo.', '<b>Badges above the circle</b>: technique group and the reference episode.'),
      L('<b>Vòng sáng chạy quanh</b>: tiến trình của thì đang tập.', '<b>Running ring</b>: progress of the current phase.'),
      L('<b>Dãy số nhỏ (ví dụ 4 · 4 · 4)</b>: nhịp hít – nín – thở; số đang sáng là thì hiện tại.', '<b>Small numbers (e.g. 4 · 4 · 4)</b>: in – hold – out; the highlighted one is now.'),
      L('<b>Dòng chữ nhỏ dưới số</b>: mẹo cho thì đang tập (ví dụ "phồng bụng rồi nở ngực").', '<b>Small line under the number</b>: a tip for this phase (e.g. "belly first, then chest").'),
      L('<b>Chu kỳ và thời gian</b>: số vòng thở đã xong, thời gian đã tập / tổng thời gian.', '<b>Cycles and time</b>: breaths completed, time elapsed / total.'),
      L('<b>Vạch mảnh trên cùng</b>: tiến trình cả buổi tập.', '<b>Thin bar at the top</b>: progress of the whole session.')
    ]},
    { h: L('🎛️ Các nút', '🎛️ Buttons'), list: [
      L('<b>■</b> (trái, dưới): kết thúc buổi tập. <b>Bắt đầu / Tạm dừng / Tiếp tục</b> (giữa). <b>🔊</b> (phải): bật – tắt toàn bộ âm thanh.', '<b>■</b> (bottom left): end the session. <b>Start / Pause / Resume</b> (centre). <b>🔊</b> (right): sound on/off.'),
      L('<b>EN / VI</b> (trên cùng): đổi ngôn ngữ. <b>?</b>: mở hướng dẫn này. <b>☕</b>: giới thiệu, ủng hộ, miễn trừ trách nhiệm.', '<b>EN / VI</b> (top): switch language. <b>?</b>: open this guide. <b>☕</b>: about, support and disclaimer.'),
      L('Các mục mở rộng bên dưới: <b>Cách tập & cơ sở khoa học</b> của kỹ thuật đang chọn; <b>Bộ phanh & lộ trình 12 tuần</b>; <b>Nhịp riêng</b> (đo hoặc nhập thời gian hít vào của bạn, app tự giữ tỉ lệ); <b>Âm thanh</b> (sóng biển, nền ấm, chuông bát, giọng đọc, rung, âm lượng); <b>Đo nhịp thở tự nhiên</b>; <b>An toàn</b>.', 'Expandable sections below: <b>How to & the science</b> for the selected technique; <b>Brake & 12-week plan</b>; <b>Your own pace</b> (measure or type your inhale, the app keeps the ratio); <b>Sound</b> (ocean, warm pad, bowl, voice, vibration, volume); <b>Natural breathing rate</b>; <b>Safety</b>.')
    ]},
    { h: L('🤔 Nên chọn kỹ thuật nào?', '🤔 Which technique?'), table: [
      [L('Mới bắt đầu, muốn học thở đúng', 'New to this, learning to breathe right'), L('01 Thở bụng 4-2-6', '01 Belly 4-2-6')],
      [L('Căng thẳng ban ngày, trước khi học, phát biểu', 'Daytime stress, before study or a talk'), L('02 Thở đều 3D 4-4-4', '02 Even 3D 4-4-4')],
      [L('Bực bội, sau cãi vã, trào ngược', 'Irritation, after an argument, reflux'), L('03 Theta 4-4-8', '03 Theta 4-4-8')],
      [L('Trước khi ngủ, trằn trọc giữa đêm', 'Bedtime, waking at night'), L('04 Thở 4-7-8', '04 4-7-8')],
      [L('Mang thai, bệnh tim, người lớn tuổi', 'Pregnancy, heart disease, older adults'), L('01 Thở bụng 4-0-6 (không nín)', '01 Belly 4-0-6 (no hold)')],
      [L('Phế quản yếu, hay hụt hơi', 'Weak airways, breathlessness'), L('01 Thở chúm môi 3-0-6', '01 Pursed lips 3-0-6')],
      [L('Muốn thở ra dài mà không phải đếm', 'A long exhale without counting'), L('05 Ngân âm "M"', '05 Humming "M"')]
    ]},
    { h: L('📱 Cài lên điện thoại như một ứng dụng', '📱 Install on your phone'), list: [
      L('<b>iPhone:</b> mở tho.hlvsuckhoe.com bằng Safari → nút Chia sẻ → <b>Thêm vào MH chính</b>.', '<b>iPhone:</b> open tho.hlvsuckhoe.com in Safari → Share → <b>Add to Home Screen</b>.'),
      L('<b>Android:</b> mở bằng Chrome → menu ⋮ → <b>Cài đặt ứng dụng</b> (hoặc Thêm vào màn hình chính).', '<b>Android:</b> open in Chrome → ⋮ menu → <b>Install app</b> (or Add to Home screen).'),
      L('Lần đầu cần mạng; sau đó dùng được cả khi không có mạng.', 'The first visit needs internet; after that it works offline.')
    ]},
    { h: L('💡 Mẹo để tập hiệu quả', '💡 Tips'), list: [
      L('Tập cùng giờ mỗi ngày (sáng thức dậy, trưa, trước khi ngủ) – đều đặn quan trọng hơn tập lâu.', 'Practise at the same times daily (on waking, midday, bedtime) – regularity beats length.'),
      L('Đi từ nấc nhẹ đến nấc sâu: thở bụng → 4-4-4 → 4-4-8 → 4-7-8. Đừng nhảy cóc.', 'Step from gentle to deep: belly → 4-4-4 → 4-4-8 → 4-7-8. Don\'t skip levels.'),
      L('Không gồng, không cố hít thật căng. Thấy khó thì chọn phương án nhẹ hơn hoặc dùng "Nhịp riêng" để rút ngắn.', 'Never strain or over-fill. If it feels hard, pick a gentler option or shorten it with "Your own pace".'),
      L('Đeo tai nghe để nghe rõ sóng biển và chuông; tắt thông báo điện thoại khi tập.', 'Use headphones for the ocean and bowl sounds; silence notifications while practising.')
    ]},
    { h: L('❓ Câu hỏi thường gặp', '❓ FAQ'), qa: [
      [L('Thấy chóng mặt, tê tay?', 'Dizzy or tingling?'), L('Dừng lại, thở bình thường. Lần sau chọn phương án không nín hoặc thời lượng ngắn hơn. Nếu đau ngực, khó thở kéo dài: gọi cấp cứu.', 'Stop and breathe normally. Next time pick a no-hold option or a shorter session. Chest pain or lasting breathlessness: call emergency services.')],
      [L('Nín 7 hay 16 giây không nổi?', 'Can\'t hold for 7 or 16 seconds?'), L('Đếm nhanh hơn – quan trọng là tỉ lệ, không phải số giây. Hoặc chọn phương án 4-4-8.', 'Count faster – the ratio matters, not the seconds. Or choose the 4-4-8 option.')],
      [L('Không nghe thấy âm thanh?', 'No sound?'), L('Kiểm tra nút 🔊, âm lượng máy; iPhone cần gạt công tắc im lặng sang bật tiếng. Bấm "Nghe thử" trong mục Âm thanh.', 'Check the 🔊 button and device volume; on iPhone turn off the silent switch. Use "Test sound" in the Sound section.')],
      [L('Không có giọng đọc tiếng Việt?', 'No voice?'), L('Máy chưa cài giọng tiếng Việt (Android: Cài đặt → Chuyển văn bản thành giọng nói; iPhone: Trợ năng → Nội dung được đọc). Chuông vẫn hoạt động.', 'Your device lacks that voice (Android: Settings → Text-to-speech; iPhone: Accessibility → Spoken Content). Bowl cues still work.')],
      [L('Dữ liệu của tôi lưu ở đâu?', 'Where is my data?'), L('Chỉ trên máy của bạn (lịch sử tập, cài đặt). Không có tài khoản, không gửi đi đâu. Xoá dữ liệu trình duyệt sẽ mất lịch sử.', 'Only on your device (history, settings). No account, nothing is sent anywhere. Clearing browser data erases history.')],
      [L('Tập bao lâu thì thấy hiệu quả?', 'How soon will I notice a difference?'), L('Cảm giác dịu xuống có thể đến ngay trong buổi tập. Với giấc ngủ và huyết áp, hãy tập đều 4–12 tuần và theo dõi; không cải thiện thì đi khám.', 'Feeling calmer can come within one session. For sleep and blood pressure, practise regularly for 4–12 weeks and track it; see a doctor if nothing improves.')]
    ]}
  ]
};
