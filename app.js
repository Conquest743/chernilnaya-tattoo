'use strict';

document.documentElement.classList.add('enhanced');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  nav.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    menu.focus();
  }
});

const filters = document.querySelector('.work-filters');
const cards = [...document.querySelectorAll('.work-card')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const selected = button.dataset.filter;
  for (const item of filters.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
  for (const card of cards) card.hidden = selected !== 'all' && card.dataset.work !== selected;
});

const dialog = document.querySelector('.work-dialog');
const photo = new Image();
photo.className = 'dialog-photo';
const source = dialog.querySelector('.dialog-source');
source.before(photo);
const title = dialog.querySelector('#work-title');
let previousCard;
if (typeof dialog.showModal === 'function') {
  for (const card of cards) {
    card.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = card.querySelector('img');
      photo.src = image.src;
      photo.alt = image.alt;
      source.href = card.href;
      title.textContent = card.querySelector('.work-caption').textContent.trim();
      previousCard = card;
      dialog.showModal();
    });
  }
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => previousCard?.focus({ preventScroll: true }));
}

