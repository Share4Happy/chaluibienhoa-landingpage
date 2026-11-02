/**
 * WORDPRESS POSTS API & CAROUSEL (posts.js)
 * Mục 2B: Lấy 5 bài viết từ REST API và hiển thị dạng carousel trôi chậm vô hạn (marquee).
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
  let categoryName = 'ẨM THỰC ĐỊA PHƯƠNG';
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
  
  const ctaText = document.createElement('span');
  ctaText.textContent = 'Đọc bài viết';
  
  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'post-cta-icon';
  ctaIcon.textContent = '▶';

  ctaRow.appendChild(ctaIcon);
  ctaRow.appendChild(ctaText);
  link.appendChild(ctaRow);

  card.appendChild(link);
  return card;
}

/**
 * Khởi tạo Posts Carousel
 */
export async function initPosts() {
  const container = document.getElementById('posts-track');
  const statusContainer = document.getElementById('posts-status');
  const togglePlayBtn = document.getElementById('posts-toggle-btn');
  const wrapper = document.querySelector('.posts-carousel-wrapper');

  if (!container) return;

  try {
    const res = await fetch(CONFIG.WP.API_URL);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const rawPosts = await res.json();
    if (!Array.isArray(rawPosts) || rawPosts.length === 0) {
      if (statusContainer) {
        statusContainer.textContent = 'Chưa có bài viết mới nào.';
        statusContainer.style.display = 'block';
      }
      return;
    }

    // Chuẩn hóa đúng 5 bài
    const posts = rawPosts.slice(0, CONFIG.WP.POST_COUNT).map(normalizePost);

    // Xóa skeleton loading
    container.innerHTML = '';
    if (statusContainer) statusContainer.style.display = 'none';

    // Tạo track card gốc
    const originalCards = posts.map(p => createPostCardElement(p, false));
    originalCards.forEach(card => container.appendChild(card));

    // Duplicate đủ số lần để track phủ kín viewport lớn và chạy marquee vô hạn
    // Mỗi vòng nhân 2 lần (tổng 15 cards)
    for (let r = 0; r < 2; r++) {
      posts.forEach(p => {
        const dupCard = createPostCardElement(p, true);
        container.appendChild(dupCard);
      });
    }

    // Bật hiệu ứng CSS marquee
    container.classList.add('is-running');

    // Controls: Nút Tạm Dừng / Tiếp Tục
    let isPaused = false;
    if (togglePlayBtn) {
      togglePlayBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        if (isPaused) {
          container.classList.add('is-paused');
          togglePlayBtn.setAttribute('aria-label', 'Tiếp tục trôi');
          togglePlayBtn.innerHTML = '▶ Phát';
        } else {
          container.classList.remove('is-paused');
          togglePlayBtn.setAttribute('aria-label', 'Tạm dừng');
          togglePlayBtn.innerHTML = '⏸ Tạm dừng';
        }
      });
    }

    // Touch support cho thiết bị di động
    if (wrapper) {
      let isTouching = false;
      wrapper.addEventListener('touchstart', () => {
        isTouching = true;
        container.classList.add('is-paused');
      }, { passive: true });

      wrapper.addEventListener('touchend', () => {
        isTouching = false;
        if (!isPaused) {
          container.classList.remove('is-paused');
        }
      }, { passive: true });
    }

  } catch (err) {
    console.warn('Không thể nạp bài viết WordPress:', err);
    if (statusContainer) {
      statusContainer.textContent = 'Không thể tải danh sách bài viết. Vui lòng thử lại sau.';
      statusContainer.style.display = 'block';
    }
  }
}

