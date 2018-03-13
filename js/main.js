;(function(){
  'use strict';

  const $ = document.querySelector.bind(document);
  const form = $('[data-js="form-numero"]');
  const numeroExtenso = $('[data-js="numero-por-extenso"]');
  const numero = $('[data-js="numero"]');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    numeroExtenso.textContent = conversor.converterNumeroParaExtenso(numero.value);
  });

})();
