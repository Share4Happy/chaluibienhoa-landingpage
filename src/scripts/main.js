/**
 * ENTRY POINT (main.js)
 */

import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/sections/header.css';
import '../styles/sections/hero.css';
import '../styles/sections/top-quan.css';
import '../styles/sections/vi-ngon.css';
import '../styles/sections/cach-an.css';
import '../styles/sections/danh-gia.css';
import '../styles/sections/reviews-form.css';
import '../styles/sections/faq.css';
import '../styles/sections/posts-carousel.css';
import '../styles/sections/footer.css';

import { initMenu } from './menu.js';
import { initTabs } from './tabs.js';
import { initPosts } from './posts.js';
import { initFormAndInteractions } from './form.js';
import { getImage } from './images.js';

document.addEventListener('DOMContentLoaded', () => {
  // Áp dụng ảnh nếu đã có trong assets/images/
  applyImages();

  // Khởi tạo các modules
  initMenu();
  initTabs();
  initPosts();
  initFormAndInteractions();
});

/**
 * Gắn ảnh thật khi người dùng bổ sung ảnh đúng tên file vào src/assets/images/
 */
function applyImages() {
  const imageHolders = document.querySelectorAll('[data-image-key]');
  imageHolders.forEach(holder => {
    const key = holder.getAttribute('data-image-key');
    const imgData = getImage(key);

    if (imgData && imgData.isAvailable && imgData.url) {
      const img = document.createElement('img');
      img.src = imgData.url;
      img.alt = imgData.alt;
      img.width = imgData.width;
      img.height = imgData.height;
      img.loading = key === 'hero' ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.className = 'applied-image';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = 'inherit';

      // Thay thế nội dung placeholder
      holder.innerHTML = '';
      holder.classList.remove('img-placeholder');
      holder.appendChild(img);
    }
  });
}

