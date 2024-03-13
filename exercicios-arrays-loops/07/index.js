const nomes = ["Ana", "Joana", "Carlos", "amanda"];

let nomeA = [];

for (let i = 0; i < nomes.length; i++) {
    if (nomes[i][0] === 'A' || nomes[i][0] === 'a') {
        nomeA.push(nomes[i]);
    }
}

console.log(nomeA);