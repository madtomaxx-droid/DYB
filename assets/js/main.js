(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  document.querySelectorAll('[data-year]').forEach((item) => { item.textContent = new Date().getFullYear(); });
  const setHeader = () => header?.classList.toggle('is-sticky', window.scrollY > 8);
  setHeader(); window.addEventListener('scroll', setHeader, { passive: true });
  toggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
  document.querySelectorAll('.lead-form').forEach((form) => form.addEventListener('submit', async (event) => {
    event.preventDefault(); const message = form.querySelector('.form-message'); const button = form.querySelector('[type="submit"]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.dataset.submitting) return; form.dataset.submitting = 'true'; button.disabled = true; message.textContent = 'Отправляем заявку…';
    try { const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || 'Не удалось отправить заявку.'); form.reset(); message.textContent = 'Спасибо! Заявка принята. Мы свяжемся с вами.'; message.className = 'form-message success'; }
    catch (error) { message.textContent = error.message || 'Проверьте соединение и попробуйте ещё раз.'; message.className = 'form-message'; button.disabled = false; delete form.dataset.submitting; }
  }));
})();
