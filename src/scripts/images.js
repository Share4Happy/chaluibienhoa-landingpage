/**
 * QUẢN LÝ HÌNH ẢNH DỰ ÁN (images.js)
 * Áp dụng quy tắc "khung trước, ảnh sau".
 * Tự động phát hiện ảnh thật khi người dùng thêm vào thư mục src/assets/images/
 */

// Tự động quét các ảnh có trong thư mục src/assets/images/ (Vite Feature)
const localAssets = (typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function')
  ? import.meta.glob('/src/assets/images/*.*', { eager: true, query: '?url', import: 'default' })
  : {};

export const IMAGE_MANIFEST = {
  hero: {
    filename: 'hero-chaluimet.png',
    alt: 'Mẹt Chả Lụi Lạc Hồng Đầy Đủ nướng than hồng',
    width: 600,
    height: 450,
    aspectRatio: '4/3'
  },
  quanCoYen: {
    filename: 'quan-co-yen.jpg',
    alt: 'Chả lụi Cô Yến - Hẻm 42 Lạc Hồng Biên Hòa',
    width: 640,
    height: 360,
    aspectRatio: '16/9'
  },
  quan15k: {
    filename: 'quan-lac-hong-15k.jpg',
    alt: 'Chả lụi Lạc Hồng Quán 15K cổng trường ĐH Lạc Hồng',
    width: 640,
    height: 360,
    aspectRatio: '16/9'
  },
  quanBaBay: {
    filename: 'quan-ba-bay.jpg',
    alt: 'Chả lụi Bà Bảy góc Huỳnh Văn Nghệ Biên Hòa',
    width: 640,
    height: 360,
    aspectRatio: '16/9'
  },
  step1: {
    filename: 'step-1-banh-trang-rau.png',
    alt: 'Trải bánh tráng và lót rau sống, xoài xanh bào sợi',
    width: 320,
    height: 240,
    aspectRatio: '4/3'
  },
  step2: {
    filename: 'step-2-kep-cha-ram.png',
    alt: 'Kẹp chả lụi nướng than và ram giòn rụm',
    width: 320,
    height: 240,
    aspectRatio: '4/3'
  },
  step3: {
    filename: 'step-3-cham-sot.png',
    alt: 'Chấm ngập cuốn chả lụi vào chén tương sệt ấm nóng',
    width: 320,
    height: 240,
    aspectRatio: '4/3'
  }
};

/**
 * Lấy thông tin ảnh: Nếu đã có ảnh trong assets thì trả về đường dẫn thật,
 * nếu chưa có thì trả về cờ isPlaceholder = true để giao diện giữ khung placeholder.
 */
export function getImage(key) {
  const item = IMAGE_MANIFEST[key];
  if (!item) return null;

  const targetPath = `/src/assets/images/${item.filename}`;
  const realUrl = localAssets[targetPath];

  return {
    ...item,
    url: realUrl || null,
    isAvailable: !!realUrl
  };
}
