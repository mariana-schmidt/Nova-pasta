const arrayA = [5, 32, 3, 44, 1];
const arrayB = [57, 4, 21, 2, 13];

let menor = 0;

for (let i = 0; i < arrayA.length; i++) {
    if (arrayA[i] < arrayB[i]) {
        menor = arrayA[i];
        console.log(menor);
    } else {
        menor = arrayB[i];
        console.log(menor);
    }
}