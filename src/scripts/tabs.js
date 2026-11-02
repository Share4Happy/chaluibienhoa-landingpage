/**
 * TABS, FILTERS & ACCORDION (tabs.js)
 */

export function initTabs() {
  initTopQuanFilter();
  initStepTabs();
  initFaqAccordion();
}

/**
 * Filter quán ăn tại Section Top Quán
 */
function initTopQuanFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.quan-card');

  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      cards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.classList.remove('hide');
        } else {
          card.style.display = 'none';
          card.classList.add('hide');
        }
      });
    });
  });
}

/**
 * Tab 3 bước cuốn chả tại Section Cách Ăn Chuẩn
 */
function initStepTabs() {
  const stepBtns = document.querySelectorAll('.step-tab-btn');
  const stepPanels = document.querySelectorAll('.step-content-panel');

  if (stepBtns.length === 0 || stepPanels.length === 0) return;

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepIndex = btn.getAttribute('data-step');

      // Active button
      stepBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show panel
      stepPanels.forEach(panel => {
        if (panel.getAttribute('data-step') === stepIndex) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/**
 * Accordion Hỏi Đáp tại Section FAQ
 */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.faq-item');

  if (accordionItems.length === 0) return;

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Đóng các mục khác nếu muốn (dạng single accordion)
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle mục hiện tại
      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

