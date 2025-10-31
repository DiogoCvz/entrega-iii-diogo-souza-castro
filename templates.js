export function renderTemplate(id){
  const tpl = document.getElementById(id);
  if(!tpl) return document.createElement('div');
  return tpl.content.cloneNode(true);
}