const $ = document.querySelector.bind(document);
const form = $('[data-js="form-numero"]');
const nExtenso = $('[data-js="numero-por-extenso"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const numero = $('[data-js="numero"]');
  nExtenso.textContent = conversor.converterNumeroParaExtenso(numero.value);
});
