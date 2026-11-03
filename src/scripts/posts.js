/**
 * WORDPRESS POSTS API & CAROUSEL (posts.js)
 * Lấy các bài viết từ Category 220 (Chả lụi Biên Hoà).
 * Nếu chưa có bài viết từ API: giữ nguyên section, để trống carousel và hiển thị text thông báo chờ có bài viết.
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
 * Render khối thông báo chờ bài viết
 */
function showEmptyPostsMessage(statusContainer) {
  if (!statusContainer) return;
  statusContainer.style.display = 'block';
  statusContainer.innerHTML = `
    <div class="posts-empty-box">
      <div class="posts-empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h3 class="posts-empty-title">Đang chờ cập nhật bài viết mới</h3>
      <p class="posts-empty-desc">Chuyên mục Chả lụi Biên Hoà đang được chuẩn bị các bài viết chia sẻ ẩm thực mới nhất. Vui lòng quay lại sau!</p>
    </div>
  `;
}

/**
 * Khởi tạo Carousel từ WordPress REST API (Category 220)
 */
export async function initPosts() {
  const container = document.getElementById('posts-track');
  const statusContainer = document.getElementById('posts-status');
  const wrapper = document.querySelector('.posts-carousel-wrapper');

  if (!container) return;

  try {
    const res = await fetch(CONFIG.WP.API_URL);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const rawPosts = await res.json();

    // Nếu không có bài viết nào từ API: để trống và hiện text chờ có bài viết
    if (!Array.isArray(rawPosts) || rawPosts.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      showEmptyPostsMessage(statusContainer);
      return;
    }

    // Khi có bài viết thật từ API:
    container.style.display = 'flex';
    if (statusContainer) statusContainer.style.display = 'none';

    // Chuẩn hóa tối đa 4 bài
    const posts = rawPosts.slice(0, CONFIG.WP.POST_COUNT).map(normalizePost);

    // Xóa skeleton loading
    container.innerHTML = '';

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
    container.innerHTML = '';
    container.style.display = 'none';
    showEmptyPostsMessage(statusContainer);
  }
}
