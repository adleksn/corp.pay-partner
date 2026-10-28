const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.mobile-menu__close');

const setMenuState = (isOpen) => {
  if (!header || !menuToggle || !mobileMenu || !menuClose) return;
  header.classList.toggle('is-menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.hidden = !isOpen;
  menuClose.hidden = !isOpen;
};

if (header && menuToggle && mobileMenu && menuClose) {
  menuToggle.addEventListener('click', () => setMenuState(!header.classList.contains('is-menu-open')));
  menuClose.addEventListener('click', () => setMenuState(false));
}

const faqTriggers = document.querySelectorAll('[data-faq-trigger]');

faqTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const nextItem = trigger.closest('.faq__item');

    faqTriggers.forEach((itemTrigger) => {
      const item = itemTrigger.closest('.faq__item');
      const answer = document.getElementById(itemTrigger.getAttribute('aria-controls'));
      const isOpen = item === nextItem && !item.classList.contains('is-open');

      item.classList.toggle('is-open', isOpen);
      itemTrigger.setAttribute('aria-expanded', String(isOpen));
      answer.hidden = !isOpen;
    });
  });
});
