
const button = document.getElementById("calculate");

button.addEventListener("click", function () {
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;
    const x = document.getElementById("x").value;

    const result = document.getElementById("result");
    const answer = document.getElementById("answer");

    if (a === "" || b === "" || x === "") {
        alert("Preencha todos os campos da equação!");
        return;
    }

    const coefficientA = Number(a);
    const coefficientB = Number(b);
    const valueX = Number(x);

    const calculation = coefficientA * valueX + coefficientB;

    answer.textContent = `f(${valueX}) = ${calculation}`;

    result.hidden = false;
});
