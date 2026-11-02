/**
 * CẤU HÌNH DỰ ÁN TẬP TRUNG (config.js)
 */

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const CONFIG = {
  // Production URL
  SITE_URL: env.VITE_SITE_URL || 'https://chaluilachong.share4happy.com',

  // WordPress REST API Posts (Category 220: Chả lụi Biên Hoà)
  WP: {
    API_URL: env.VITE_WP_API_URL || 'https://share4happy.com/wp-json/wp/v2/posts?categories=220&per_page=4&_embed',
    CATEGORY_ID: 220,
    POST_COUNT: 4,
    FALLBACK_IMAGE: '/favicon.svg'
  },

  // Review Form Webhook
  FORM: {
    WEBHOOK_URL: env.VITE_REVIEW_WEBHOOK_URL || '',
    STORAGE_KEY: 'chaluilachong_user_reviews',
    FAVORITE_STORAGE_KEY: 'chaluilachong_likes_count'
  }
};
