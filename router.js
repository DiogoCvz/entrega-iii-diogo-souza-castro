import { renderTemplate } from './templates.js';

const routes = {
  '/': () => renderTemplate('tpl-home'),
  '/projects': () => renderTemplate('tpl-projects'),
  '/contact': () => renderTemplate('tpl-contact')
};

export function navigate(){
  const path = location.hash.replace('#','') || '/';
  const view = routes[path] ? routes[path]() : routes['/']();
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view);
  window.dispatchEvent(new CustomEvent('view:changed', {detail:{path}}));
}

export function initRouter(){
  window.addEventListener('hashchange', navigate);
  navigate();
}