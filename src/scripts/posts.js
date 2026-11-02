/**
 * WORDPRESS POSTS API & CAROUSEL (posts.js)
 * Lấy các bài viết từ Category 220 (Chả lụi Biên Hoà).
 * Tuyệt đối không dùng bài viết mẫu. Nếu chưa có bài thật, ẩn section an toàn.
 */

import { CONFIG } from './config.js';

/**
 * Hàm giải mã an toàn HTML entities và loại bỏ thẻ HTML mà không dùng innerHTML.
 */
function sanitizeText(htmlString) {
  if (!htmlString) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return (doc.body.textContent || '').trim();
}

/**
 * Định dạng ngày ISO 8601 sang DD/MM/YYYY
 */
function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return isoString;
  }
}

/**
 * Chuẩn hóa đối tượng bài viết từ WP JSON thô
 */
function normalizePost(raw) {
  const title = sanitizeText(raw.title?.rendered || 'Bài viết chưa có tiêu đề');
  let excerpt = sanitizeText(raw.excerpt?.rendered || '');
  if (excerpt.length > 95) {
    excerpt = excerpt.slice(0, 92) + '...';
  }

  // Lấy ảnh đại diện
  let imageUrl = null;
  let imageAlt = title;
  const media = raw._embedded?.['wp:featuredmedia']?.[0];
  if (media) {
    imageUrl = media.media_details?.sizes?.medium_large?.source_url || media.source_url || null;
    if (media.alt_text) imageAlt = media.alt_text;
  }

  // Tên chuyên mục
  let categoryName = 'CHẢ LỤI BIÊN HOÀ';
  const terms = raw._embedded?.['wp:term']?.[0];
  if (terms && terms.length > 0) {
    categoryName = terms[0].name.toUpperCase();
  }

  return {
    id: raw.id,
    title,
    excerpt,
    url: raw.link || '#',
    imageUrl,
    imageAlt,
    date: formatDate(raw.date),
    categoryName
  };
}

/**
 * Tạo một phần tử Card bài viết an toàn bằng document.createElement
 */
function createPostCardElement(post, isDuplicate = false) {
  const card = document.createElement('article');
  card.className = 'post-card';
  if (isDuplicate) {
    card.setAttribute('aria-hidden', 'true');
    card.setAttribute('tabindex', '-1');
  }

  // Link bao ngoài
  const link = document.createElement('a');
  link.className = 'post-card-inner';
  link.href = post.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', post.title);
  if (isDuplicate) {
    link.setAttribute('tabindex', '-1');
  }

  // Category Tag
  const catTag = document.createElement('span');
  catTag.className = 'post-category';
  catTag.textContent = post.categoryName;
  link.appendChild(catTag);

  // Title
  const titleEl = document.createElement('h3');
  titleEl.className = 'post-title';
  titleEl.textContent = post.title;
  link.appendChild(titleEl);

  // Excerpt
  if (post.excerpt) {
    const excerptEl = document.createElement('p');
    excerptEl.className = 'post-excerpt';
    excerptEl.textContent = post.excerpt;
    link.appendChild(excerptEl);
  }

  // Footer CTA
  const ctaRow = document.createElement('div');
  ctaRow.className = 'post-cta';
  
  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'post-cta-icon';
  ctaIcon.textContent = '▶';

  const ctaText = document.createElement('span');
  ctaText.textContent = 'Đọc bài viết';

  ctaRow.appendChild(ctaIcon);
  ctaRow.appendChild(ctaText);
  link.appendChild(ctaRow);

  card.appendChild(link);
  return card;
}

/**
 * Khởi tạo Carousel từ WordPress REST API thật (Category 220)
 */
export async function initPosts() {
  const section = document.getElementById('bai-viet');
  const container = document.getElementById('posts-track');
  const statusContainer = document.getElementById('posts-status');
  const wrapper = document.querySelector('.posts-carousel-wrapper');

  if (!container || !section) return;

  try {
    const res = await fetch(CONFIG.WP.API_URL);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const rawPosts = await res.json();

    // Nếu không có bài viết nào từ API
    if (!Array.isArray(rawPosts) || rawPosts.length === 0) {
      // Ẩn section bài viết và liên kết menu khi chưa có bài thật trên WordPress
      section.style.display = 'none';
      const navPostLinks = document.querySelectorAll('a[href="#bai-viet"]');
      navPostLinks.forEach(link => link.style.display = 'none');
      return;
    }

    // Đảm bảo section và link menu hiển thị khi có bài viết thật
    section.style.display = '';
    const navPostLinks = document.querySelectorAll('a[href="#bai-viet"]');
    navPostLinks.forEach(link => link.style.display = '');

    // Chuẩn hóa tối đa 4 bài
    const posts = rawPosts.slice(0, CONFIG.WP.POST_COUNT).map(normalizePost);

    // Xóa skeleton loading
    container.innerHTML = '';
    if (statusContainer) statusContainer.style.display = 'none';

    // Render các thẻ gốc
    const originalCards = posts.map(p => createPostCardElement(p, false));
    originalCards.forEach(card => container.appendChild(card));

    // Duplicate các thẻ để chạy marquee lặp vô hạn
    for (let r = 0; r < 2; r++) {
      posts.forEach(p => {
        const dupCard = createPostCardElement(p, true);
        container.appendChild(dupCard);
      });
    }

    // Bật animation marquee
    container.classList.add('is-running');

    // Touch support cho thiết bị di động
    if (wrapper) {
      wrapper.addEventListener('touchstart', () => {
        container.classList.add('is-paused');
      }, { passive: true });

      wrapper.addEventListener('touchend', () => {
        container.classList.remove('is-paused');
      }, { passive: true });
    }

  } catch (err) {
    console.warn('Không thể nạp bài viết WordPress từ Category 220:', err);
    // Ẩn section khi có lỗi kết nối để không làm hỏng giao diện trang
    section.style.display = 'none';
    const navPostLinks = document.querySelectorAll('a[href="#bai-viet"]');
    navPostLinks.forEach(link => link.style.display = 'none');
  }
}
