const numeros = [3, 4, 7, 8, 1, 6, 5, 10];

let somaPares = 0;

for (let i = 0; i < numeros.length; i++) {
    num = numeros[i];
    if (num % 2 == 0) {
        somaPares += num;
    }
}

console.log(somaPares);