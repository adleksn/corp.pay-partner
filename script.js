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

const partnerForm = document.querySelector('.partner-application__content');

if (partnerForm) {
  const contactField = partnerForm.querySelector('.partner-application__field--contact');
  const contactInput = contactField?.querySelector('input');
  const submitButton = partnerForm.querySelector('button[type="submit"]');
  const successState = partnerForm.querySelector('.partner-application__success');
  const formInputs = partnerForm.querySelectorAll('.partner-application__fields input');

  const clearContactError = () => {
    if (!contactField || !contactInput) return;
    contactField.classList.remove('has-error');
    contactInput.removeAttribute('aria-invalid');
  };

  contactInput?.addEventListener('input', clearContactError);

  partnerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactInput || !contactField || !submitButton || !successState) return;

    if (!contactInput.value.trim()) {
      contactField.classList.add('has-error');
      contactInput.setAttribute('aria-invalid', 'true');
      contactInput.focus();
      return;
    }

    clearContactError();
    partnerForm.style.minHeight = `${partnerForm.offsetHeight}px`;
    partnerForm.classList.add('is-loading');
    submitButton.disabled = true;
    formInputs.forEach((input) => { input.disabled = true; });

    window.setTimeout(() => {
      partnerForm.classList.remove('is-loading');
      partnerForm.classList.add('is-success');
      successState.hidden = false;
    }, 900);
  });
}
