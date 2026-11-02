/**
 * FORM HANDLING & USER INTERACTIONS (form.js)
 */

import { CONFIG } from './config.js';

export function initFormAndInteractions() {
  initReviewForm();
  initLikeButton();
  initBookmarkButtons();
  initShareCopyButton();
}

/**
 * Hiển thị Toast thông báo nhanh
 */
export function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/**
 * Xử lý Form Gửi Đánh Giá
 */
function initReviewForm() {
  const form = document.getElementById('review-form');
  const reviewsList = document.querySelector('.reviews-list');

  if (!form) return;

  // Load existing reviews from localStorage
  const savedReviews = JSON.parse(localStorage.getItem(CONFIG.FORM.STORAGE_KEY) || '[]');
  if (reviewsList && savedReviews.length > 0) {
    savedReviews.forEach(rev => {
      renderReviewItem(rev, reviewsList, false);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('review-name');
    const restaurantSelect = document.getElementById('review-restaurant');
    const ratingSelect = document.getElementById('review-rating');
    const commentInput = document.getElementById('review-comment');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const restaurant = restaurantSelect.value;
    const rating = ratingSelect.value;
    const comment = commentInput.value.trim();

    // Validation
    if (!name) {
      showToast('Vui lòng nhập tên hoặc biệt danh của bạn.');
      nameInput.focus();
      return;
    }

    if (!comment) {
      showToast('Vui lòng chia sẻ đôi dòng nhận xét chi tiết.');
      commentInput.focus();
      return;
    }

    // Submit state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang gửi đánh giá...';

    const newReview = {
      id: Date.now(),
      name,
      restaurant,
      rating,
      comment,
      time: 'Vừa xong',
      initials: getInitials(name)
    };

    try {
      // Nếu có webhook url thì gửi dữ liệu
      if (CONFIG.FORM.WEBHOOK_URL) {
        await fetch(CONFIG.FORM.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        });
      }

      // Lưu localStorage
      const reviews = JSON.parse(localStorage.getItem(CONFIG.FORM.STORAGE_KEY) || '[]');
      reviews.unshift(newReview);
      localStorage.setItem(CONFIG.FORM.STORAGE_KEY, JSON.stringify(reviews));

      // Hiển thị ngay lên danh sách
      if (reviewsList) {
        renderReviewItem(newReview, reviewsList, true);
      }

      form.reset();
      showToast('Cảm ơn bạn! Đánh giá đã được ghi nhận thành công.');
    } catch (err) {
      console.warn('Lỗi khi gửi đánh giá:', err);
      showToast('Đã ghi nhận đánh giá tại trình duyệt của bạn!');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function getInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function renderReviewItem(data, container, prepend = true) {
  const card = document.createElement('div');
  card.className = 'community-review-card';

  const avatar = document.createElement('div');
  avatar.className = 'review-avatar';
  avatar.textContent = data.initials || 'KH';

  const content = document.createElement('div');
  content.className = 'review-content';

  const topRow = document.createElement('div');
  topRow.className = 'review-top-row';

  const author = document.createElement('div');
  author.className = 'review-author-info';
  author.innerHTML = `<strong>${escapeHtml(data.name)}</strong><span>Đã ăn tại ${escapeHtml(data.restaurant)} • ${data.time}</span>`;

  const stars = document.createElement('div');
  stars.className = 'review-stars';
  stars.textContent = '★'.repeat(5);

  topRow.appendChild(author);
  topRow.appendChild(stars);

  const text = document.createElement('p');
  text.className = 'review-text';
  text.textContent = `"${data.comment}"`;

  content.appendChild(topRow);
  content.appendChild(text);

  card.appendChild(avatar);
  card.appendChild(content);

  if (prepend && container.firstChild) {
    container.insertBefore(card, container.firstChild);
  } else {
    container.appendChild(card);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

/**
 * Nút Yêu Thích Header
 */
function initLikeButton() {
  const likeBtn = document.querySelector('.header-like-btn');
  const countSpan = document.getElementById('like-count');

  if (!likeBtn || !countSpan) return;

  const initialCount = 1842;
  const isLiked = localStorage.getItem('chaluilachong_has_liked') === 'true';

  if (isLiked) {
    likeBtn.classList.add('liked');
    countSpan.textContent = (initialCount + 1).toLocaleString('vi-VN');
  }

  likeBtn.addEventListener('click', () => {
    const currentlyLiked = likeBtn.classList.contains('liked');
    if (currentlyLiked) {
      likeBtn.classList.remove('liked');
      countSpan.textContent = initialCount.toLocaleString('vi-VN');
      localStorage.removeItem('chaluilachong_has_liked');
      showToast('Đã bỏ yêu thích.');
    } else {
      likeBtn.classList.add('liked');
      countSpan.textContent = (initialCount + 1).toLocaleString('vi-VN');
      localStorage.setItem('chaluilachong_has_liked', 'true');
      showToast('Cảm ơn bạn đã thả tim ủng hộ Lạc Hồng Hub!');
    }
  });
}

/**
 * Bookmark quán ăn
 */
function initBookmarkButtons() {
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

  bookmarkBtns.forEach(btn => {
    const id = btn.getAttribute('data-id');
    const isSaved = localStorage.getItem(`chaluilachong_saved_${id}`) === 'true';
    if (isSaved) btn.classList.add('saved');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const saved = btn.classList.contains('saved');
      if (saved) {
        btn.classList.remove('saved');
        localStorage.removeItem(`chaluilachong_saved_${id}`);
        showToast('Đã xóa khỏi danh sách quán lưu.');
      } else {
        btn.classList.add('saved');
        localStorage.setItem(`chaluilachong_saved_${id}`, 'true');
        showToast('Đã lưu quán vào danh sách yêu thích!');
      }
    });
  });
}

/**
 * Nút Sao Chép Liên Kết Trang Footer
 */
function initShareCopyButton() {
  const copyBtn = document.getElementById('copy-page-link-btn');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết trang vào bộ nhớ tạm!');
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('Đã sao chép liên kết trang!');
    }
  });
}

