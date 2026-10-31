
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const mensagemResultado = document.getElementById("mensagemResultado");
const passos = document.getElementById("passos");

const limpar = document.getElementById("limpar");
const usarExemplo = document.getElementById("usarExemplo");

// Lê os valores dos campos
function obterValor(id) {
    return Number(document.getElementById(id).value);
}

// Formata números para exibição
function formatar(numero) {
    if (Math.abs(numero) < 0.000000001) {
        numero = 0;
    }

    return Number(numero.toFixed(6)).toLocaleString("pt-BR", {
        maximumFractionDigits: 6
    });
}

// Monta uma equação para mostrar na resolução
function montarEquacao(a, b, c) {
    const sinal = b < 0 ? " - " : " + ";

    return `${formatar(a)}x${sinal}${formatar(Math.abs(b))}y = ${formatar(c)}`;
}

// Resolve quando o formulário é enviado
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Coeficientes da primeira equação
    const a = obterValor("sinalA") * obterValor("a");
    const b = obterValor("sinalB") * obterValor("b");
    const c = obterValor("c");

    // Coeficientes da segunda equação
    const d = obterValor("sinalD") * obterValor("d");
    const e = obterValor("sinalE") * obterValor("e");
    const f = obterValor("f");

    // Determinante principal
    const D = a * e - b * d;

    // Determinantes de X e Y
    const Dx = c * e - b * f;
    const Dy = a * f - c * d;

    resultado.hidden = false;

    // Exibe as equações informadas
    const equacao1 = montarEquacao(a, b, c);
    const equacao2 = montarEquacao(d, e, f);

    let conteudoPassos = `
        <h3 class="passos-titulo">Sistema informado</h3>
        <div class="passo">${equacao1}</div>
        <div class="passo">${equacao2}</div>
    `;

    // Verifica se o determinante é zero
    if (Math.abs(D) < 0.000000001) {

        if (
            Math.abs(Dx) < 0.000000001 &&
            Math.abs(Dy) < 0.000000001
        ) {
            mensagemResultado.innerHTML = `
                <div class="erro">
                    <strong>Sistema possível e indeterminado.</strong>
                    <p>As equações representam a mesma reta e possuem infinitas soluções.</p>
                </div>
            `;

            conteudoPassos += `
                <h3 class="passos-titulo">Análise</h3>
                <div class="passo">D = ${formatar(D)}</div>
                <div class="passo">Dx = ${formatar(Dx)}</div>
                <div class="passo">Dy = ${formatar(Dy)}</div>
                <div class="passo">
                    Como os três determinantes são zero, o sistema possui
                    infinitas soluções.
                </div>
            `;
        } else {
            mensagemResultado.innerHTML = `
                <div class="erro">
                    <strong>Sistema impossível.</strong>
                    <p>As equações não possuem um ponto em comum. Portanto, não existe solução.</p>
                </div>
            `;

            conteudoPassos += `
                <h3 class="passos-titulo">Análise</h3>
                <div class="passo">D = ${formatar(D)}</div>
                <div class="passo">Dx = ${formatar(Dx)}</div>
                <div class="passo">Dy = ${formatar(Dy)}</div>
                <div class="passo">
                    Como o determinante principal é zero e pelo menos um
                    dos outros determinantes é diferente de zero,
                    o sistema não possui solução.
                </div>
            `;
        }

        passos.innerHTML = conteudoPassos;
        return;
    }

    // Regra de Cramer
    const x = Dx / D;
    const y = Dy / D;

    mensagemResultado.innerHTML = `
        <div class="resultado-principal">
            <p>Valor de X: ${formatar(x)}</p>
            <p>Valor de Y: ${formatar(y)}</p>
            <p class="interpretacao">
                O sistema possui uma solução única.
            </p>
        </div>
    `;

    conteudoPassos += `
        <h3 class="passos-titulo">Resolução passo a passo</h3>

        <div class="passo">
            <strong>1. Determinante principal (D)</strong><br>
            D = (a × e) − (b × d)<br>
            D = (${formatar(a)} × ${formatar(e)}) −
            (${formatar(b)} × ${formatar(d)})<br>
            D = ${formatar(D)}
        </div>

        <div class="passo">
            <strong>2. Determinante de X (Dx)</strong><br>
            Dx = (c × e) − (b × f)<br>
            Dx = (${formatar(c)} × ${formatar(e)}) −
            (${formatar(b)} × ${formatar(f)})<br>
            Dx = ${formatar(Dx)}
        </div>

        <div class="passo">
            <strong>3. Determinante de Y (Dy)</strong><br>
            Dy = (a × f) − (c × d)<br>
            Dy = (${formatar(a)} × ${formatar(f)}) −
            (${formatar(c)} × ${formatar(d)})<br>
            Dy = ${formatar(Dy)}
        </div>

        <div class="passo">
            <strong>4. Encontrando os valores</strong><br>
            X = Dx ÷ D = ${formatar(Dx)} ÷ ${formatar(D)}
            = <strong>${formatar(x)}</strong><br>
            Y = Dy ÷ D = ${formatar(Dy)} ÷ ${formatar(D)}
            = <strong>${formatar(y)}</strong>
        </div>

        <div class="passo">
            <strong>5. Interpretação</strong><br>
            A solução encontrada é X = ${formatar(x)} e
            Y = ${formatar(y)}. Esses valores satisfazem as duas
            equações do sistema.
        </div>
    `;

    passos.innerHTML = conteudoPassos;
});

// Limpa os campos e o resultado
limpar.addEventListener("click", function() {
    formulario.reset();
    resultado.hidden = true;
    mensagemResultado.innerHTML = "";
    passos.innerHTML = "";
});

// Preenche os campos com o exemplo do fazendeiro Daniel
usarExemplo.addEventListener("click", function() {
    document.getElementById("sinalA").value = "1";
    document.getElementById("a").value = 1;

    document.getElementById("sinalB").value = "1";
    document.getElementById("b").value = 1;

    document.getElementById("c").value = 10;

    document.getElementById("sinalD").value = "1";
    document.getElementById("d").value = 10;

    document.getElementById("sinalE").value = "1";
    document.getElementById("e").value = 5;

    document.getElementById("f").value = 80;

    resultado.hidden = true;
    mensagemResultado.innerHTML = "";
    passos.innerHTML = "";
});
