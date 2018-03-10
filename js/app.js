const conversor = (function(){

  const numeroExtenso = {
    unidades: [
      'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'
    ],
    dezenas: [
      'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ],
    dezenasDez: [
      'onze', 'doze', 'treze', 'quartoze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ],
    centenas: [
      'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
    ]
  };

  const escalasPlural = ['mil', 'milhões', 'bilhões', 'trilhões', 'quatrilhões', 'quintilhões', 'sextilhões', 'septilhões', 'octilhões'];

  function isDezenaDez(numero) {
    return numero > 10 && numero < 20;
  }

  function revertStr(str) {
    return str.split('').reverse().join('');
  }

  function ordernarEmCentenas(numero) {
    const strNumeroReverted = revertStr(numero.toString());
    const regexCentenas = /\d\d?\d?/g;
    return strNumeroReverted.match(regexCentenas).reverse().map(item =>
      parseInt(revertStr(item))
    );
  }

  function centenaPorExtenso(centenaStr) {
    let centenaExtenso = '';
    centenaExtenso += numeroExtenso.centenas[centenaStr[0] - 1];
    centenaExtenso += dezenaPorExtenso(centenaStr, 1);
    return centenaExtenso;
  }

  function dezenaPorExtenso(centenaStr, startIndex) {
    let dezenaExtenso = parseInt(centenaStr.slice(startIndex)[0]) == 0 || centenaStr.length === 2 ? '' : ' e ';

    if (isDezenaDez(centenaStr.slice(startIndex))) {
      dezenaExtenso += numeroExtenso.dezenasDez[centenaStr.slice(startIndex) - 11];
    }
    else {
      dezenaExtenso += centenaStr[0 + startIndex] - 1 !== -1 ? numeroExtenso.dezenas[centenaStr[0 + startIndex] - 1] : '';
      dezenaExtenso += centenaStr[1 + startIndex] - 1 !== -1 ? ' e ' +unidadePorExtenso(centenaStr, 1 + startIndex) : '';
    }
    return dezenaExtenso;
  }

  function unidadePorExtenso(centenaStr, index) {
    return numeroExtenso.unidades[centenaStr[index] - 1];
  }

  function centenasExtenso(centenas) {
   return centenas.map(centena => {
      let centenaStr = centena.toString();

      if (centenaStr.length === 3) {
        return centenaPorExtenso(centenaStr);
      }
      else if (centenaStr.length === 2) {
        return dezenaPorExtenso(centenaStr, 0);
      }
      else if (centenaStr.length === 1) {
        return unidadePorExtenso(centenaStr, 0);
      }
    });
  }

  function numeroPorExtenso(centenas) {
    const numExtenso = centenas.map((item, index) => {
      if (item) {
        let num = centenas.length - index - 1 !== 0 ?
          item + ' ' + escalasPlural[centenas.length - index - 2] : item;

        return num;
      }
    }).filter(item => item !== undefined).map((item, index, arr) => {
      if (index < arr.length - 2) {
        item += ', ';
      }
      else if (index === arr.length - 2) {
        item += ' e ';
      }
      else {
        item += ' ';
      }

      return item;
    }).join('');

    return numExtenso;
  }

  return {
    converterNumeroParaExtenso: function converterNumeroParaExtenso(numero) {
      return numeroPorExtenso(centenasExtenso(ordernarEmCentenas(numero)));
    }
  }
})();
