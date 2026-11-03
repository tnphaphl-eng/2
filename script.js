document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (!toggle || !nav) return;
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'เปิดเมนู');
  }
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!toggle.contains(event.target) && !nav.contains(event.target)) closeMenu();
  });
});

// Page-specific enhancements: search/filter and image lightbox.
document.addEventListener('DOMContentLoaded', () => {
 const search = document.getElementById('place-search');
 const items = Array.from(document.querySelectorAll('#place-results .extended-card'));
 const buttons = Array.from(document.querySelectorAll('.filter-btn'));
 let active = 'all';
 const update = () => {
   const query = (search?.value || '').trim().toLocaleLowerCase('th');
   let shown = 0;
   items.forEach(item => {
     const categoryMatch = active === 'all' || item.dataset.category === active;
     const textMatch = (item.dataset.search || '').toLocaleLowerCase('th').includes(query);
     const visible = categoryMatch && textMatch;
     item.hidden = !visible;
     if (visible) shown++;
   });
   const empty = document.getElementById('empty-results');
   if (empty) empty.hidden = shown !== 0;
 };
 if (search) search.addEventListener('input', update);
 buttons.forEach(button => button.addEventListener('click', () => {
   active = button.dataset.filter || 'all';
   buttons.forEach(b => b.classList.toggle('active', b === button));
   update();
 }));
 const dialog = document.getElementById('gallery-dialog');
 if (dialog && typeof dialog.showModal === 'function') {
   document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
     const img = dialog.querySelector('img');
     img.src = button.dataset.full;
     img.alt = button.dataset.caption || '';
     dialog.querySelector('p').textContent = button.dataset.caption || '';
     dialog.showModal();
   }));
   dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
   dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
 }
});
