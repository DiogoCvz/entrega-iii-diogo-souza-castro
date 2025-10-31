import { initRouter } from './router.js';
import { attachValidation } from './formValidator.js';
import { renderTemplate } from './templates.js';

function initApp(){
  initRouter();

  window.addEventListener('view:changed', (e)=>{
    const path = e.detail.path;
    if(path === '/contact'){
      const form = document.getElementById('contact-form');
      attachValidation(form);
    }
    if(path === '/projects'){
      renderProjects();
    }
  });
}

function renderProjects(){
  const list = document.getElementById('projects-list');
  if(!list) return;
  list.innerHTML = '';
  const projects = [
    {id:1,title:'Projeto A',desc:'Descrição do projeto A'},
    {id:2,title:'Projeto B',desc:'Descrição do projeto B'}
  ];
  projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card project-item';
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><button class="btn" data-id="${p.id}">Ver</button>`;
    list.appendChild(el);
  });
}

initApp();