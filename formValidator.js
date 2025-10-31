export function attachValidation(form){
  if(!form) return;

  const showError = (el, msg)=>{
    el.classList.add('invalid');
    let e = el.nextElementSibling;
    if(!e || !e.classList.contains('field-error')){
      e = document.createElement('div');
      e.className = 'field-error';
      el.parentNode.insertBefore(e, el.nextSibling);
    }
    e.textContent = msg;
  }

  const clearError = el=>{
    el.classList.remove('invalid');
    const e = el.nextElementSibling;
    if(e && e.classList.contains('field-error')) e.remove();
  }

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const requireds = Array.from(form.querySelectorAll('[required]'));
    let valid = true;
    requireds.forEach(input=>{
      clearError(input);
      if(!input.value || !input.value.trim()){
        showError(input, 'Campo obrigatório');
        valid = false;
      } else if(input.type==='email'){
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!re.test(input.value)){
          showError(input, 'Email inválido');
          valid = false;
        }
      } else if(input.minLength && input.value.length < input.minLength){
        showError(input, `Mínimo ${input.minLength} caracteres`);
        valid = false;
      }
    });

    if(valid){
      const data = Object.fromEntries(new FormData(form));
      const submissions = JSON.parse(localStorage.getItem('submissions')||'[]');
      submissions.push({...data, createdAt:new Date().toISOString()});
      localStorage.setItem('submissions', JSON.stringify(submissions));
      alert('Formulário enviado com sucesso (simulação)');
      form.reset();
      window.dispatchEvent(new CustomEvent('data:submitted'));
    }
  });
}