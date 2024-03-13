const numeros = [54, 22, 14, 87, 10, 284];

for (let i = 0; i < numeros.length; i++) {
    let numero = numeros[i];
    if (numero === 10) {
        console.log(i);
        break;
    } else {
        console.log('-1');
    }
}