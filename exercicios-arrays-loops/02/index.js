const letras = ["A", "a", "B", "C", "E", "e"];

var soma = 0;

for (let letra of letras) {
    if (letra === "E" || letra === "e") {
        soma++;
    }
}

if (soma == 0) {
    console.log('Nenhuma letra "E" ou "e" foi encontrada.');
} else {
    console.log(`Foram encontradas ${soma} letras "E" ou "e".`);
}