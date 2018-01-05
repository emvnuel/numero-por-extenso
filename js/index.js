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

function quantidadeCentenasDeTres(numero) {
    const qtdCentenas = Math.trunc(parseInt(numero.toString().length) / 3);
    return qtdCentenas;
}

function isNaoSomenteCentenasDeTres(numero) {
    const qtdNumerosRestantes = parseInt(numero.toString().length) - quantidadeCentenasDeTres(numero)*3;
    return qtdNumerosRestantes === 0 ? false : qtdNumerosRestantes;
}

function isDezenaDez(numero) {
    return numero > 10 && numero < 20;
}

function ordernarEmCentenas(numero) {
    const strNumero = numero.toString();
    let centenas = [];
    for(let i = 0; i < quantidadeCentenasDeTres(numero); i++) {    
        centenas.unshift(parseInt(strNumero.slice(strNumero.length - 3 * (i+1), strNumero.length - 3 * ((i+1) - 1))));
    }

    if(isNaoSomenteCentenasDeTres(numero)) {
        let qtdRestante = isNaoSomenteCentenasDeTres(numero);
        centenas.unshift(parseInt(strNumero.slice(0, qtdRestante))); 
    }   

    return centenas;
}

function centenasExtenso(centenas) {
    const centenasPorExtenso = centenas.map(element => {
        let el = element.toString();
        let porExtenso = '';
        let dezena;

        if (el.length === 3) {
            dezena = el.slice(1);
            porExtenso = numeroExtenso.centenas[el[0] - 1];
    
            if (isDezenaDez(dezena)) {
                porExtenso += ' e '+numeroExtenso.dezenasDez[dezena - 11];
            }
            else {
                porExtenso += el[1] - 1 !== -1 ? ' e '+numeroExtenso.dezenas[el[1] - 1] : '';
                porExtenso += el[2] - 1 !== -1 ? ' e '+numeroExtenso.unidades[el[2] - 1]: '';
            }
        }
        else if (el.length === 2) {
            dezena = element;
        
            if (isDezenaDez(dezena)) {
                porExtenso = numeroExtenso.dezenasDez[dezena - 11];
            }
            else {
                porExtenso += el[0] - 1 !== -1 ? numeroExtenso.dezenas[el[0] - 1] : '';
                porExtenso += el[1] - 1 !== -1 ? ' e '+numeroExtenso.unidades[el[1] - 1]: '';
            }
        }
        else if (el.length === 1) {
            porExtenso = numeroExtenso.unidades[element - 1];
        }

        return porExtenso; 
    });

    return centenasPorExtenso;
}

function numeroPorExtenso(centenas) {
    const numExtenso = centenas.map((item, index) => {
        if (item) {
            let num = centenas.length - index - 1 !== 0 ? 
            item+' '+escalasPlural[centenas.length - index - 2] : item;
        
            return num;
        }     
    }).filter(item => {
        return item !== undefined;
    }).map((item, index, arr)  => {
        if (index < arr.length - 2) {
            item += ', ';
        }
        else if (index === arr.length - 2){
            item += ' e ';
        }
        else {
            item += ' ';
        }
        
        return item;
    });

    return numExtenso.join('');
}

function converterNumeroParaExtenso(numero) {
    return numeroPorExtenso(centenasExtenso(ordernarEmCentenas(numero)))
}

