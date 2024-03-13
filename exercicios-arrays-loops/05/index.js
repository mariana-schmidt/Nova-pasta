const original = [1, 4, 12, 21, 53, 88, 112];

let numPares = [];

for (let i = 0; i < original.length; i++) {
    num = original[i];
    if (num % 2 == 0) {
        numPares.push(num);
    }
}

console.log(numPares);