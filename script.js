let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;
let nomeJogador = "";

function iniciarJogo() {
  const nomeJogador = document.getElementById("nome").value.trim();
  const escola = document.getElementById("escola").value.trim();
  const cidade = document.getElementById("cidade").value.trim();

  if ( nomeJogador == "" || escola == "" || cidade == ""){
    mostrarAlerta("Por favor, preencha todas as informações antes de começar.");
    return;
  }

  pontos = 0;
  perguntaAtual = 0;

  perguntas = embaralharPerguntas([...perguntasOriginais]);

  document.getElementById("telaInicial").classList.add("oculto");
  document.getElementById("telaFinal").classList.add("oculto");
  document.getElementById("telaPergunta").classList.remove("oculto");

  mostrarPergunta();
}

function mostrarPergunta() {
  const perguntaSelecionada = perguntas[perguntaAtual];

  document.getElementById("numeroPergunta").textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
  document.getElementById("textoPergunta").textContent = perguntaSelecionada.pergunta;
  document.getElementById("mensagemResposta").textContent = "";
  document.getElementById("botaoProxima").classList.add("oculto");

  const areaOpcoes = document.getElementById("opcoes");
  areaOpcoes.innerHTML = "";

  const opcoesMisturadas = embaralharPerguntas([...perguntaSelecionada.opcoes]);

  opcoesMisturadas.forEach(opcao => {
    const botao = document.createElement("button");
    botao.classList.add("opcao");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(botao, opcao);
    areaOpcoes.appendChild(botao);
  });
}

function verificarResposta(botaoClicado, respostaEscolhida) {
  const perguntaSelecionada = perguntas[perguntaAtual];
  const botoes = document.querySelectorAll(".opcao");

  botoes.forEach(botao => {
    botao.disabled = true;

    if (botao.textContent === perguntaSelecionada.correta) {
      botao.classList.add("correta");
    }
  });

  if (respostaEscolhida === perguntaSelecionada.correta) {
    pontos += 10;
    document.getElementById("mensagemResposta").textContent = "Muito bem! Você acertou!";
  } else {
    botaoClicado.classList.add("errada");
    document.getElementById("mensagemResposta").textContent =
      "Ops! Essa não era a resposta correta.";
  }

  document.getElementById("pontuacao").textContent = `Pontos: ${pontos}`;
  document.getElementById("botaoProxima").classList.remove("oculto");
}

function proximaPergunta() {
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() {
  document.getElementById("telaPergunta").classList.add("oculto");
  document.getElementById("telaFinal").classList.remove("oculto");

  document.getElementById("resultadoPontos").textContent = `${pontos} pontos`;

  let mensagem = "";

  if (pontos >= 120) {
    mensagem = `Parabéns, ${nomeJogador}! Você conhece muito bem a cidade!`;
  } else if (pontos >= 80) {
    mensagem = `Muito bem, ${nomeJogador}! Você aprendeu bastante sobre a cidade!`;
  } else if (pontos >= 40) {
    mensagem = `Boa tentativa, ${nomeJogador}! Continue explorando e aprendendo sobre a cidade.`;
  } else {
    mensagem = `Não desista, ${nomeJogador}! Jogando novamente você aprende ainda mais.`;
  }

  document.getElementById("mensagemFinal").textContent = mensagem;
}

function reiniciarJogo() {
  document.getElementById("telaFinal").classList.add("oculto");
  document.getElementById("telaInicial").classList.remove("oculto");

  document.getElementById("nome").value = "";
  document.getElementById("escola").value = "";
  document.getElementById("cidade").value = "";
}

function embaralharPerguntas(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }

  return lista;
}

function mostrarAlerta(mensagem) {
  document.getElementById("alertaMensagem").textContent = mensagem;
  document.getElementById("alertaPersonalizado").classList.remove("oculto");
}

function fecharAlerta() {
  document.getElementById("alertaPersonalizado").classList.add("oculto");
}