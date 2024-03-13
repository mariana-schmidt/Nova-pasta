const numeros = [8, 20, 4, 1];

let maior = numeros[0];

let menor = numeros[0];

for (let i = 0; i < numeros.length; i++) {
    num = numeros[i];
    if (num < menor) {
        menor = num;
    }
    if (num > maior) {
        maior = num;
    }
}

console.log(maior - menor);