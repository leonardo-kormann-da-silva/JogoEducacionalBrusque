const perguntasOriginais = [
  {
    pergunta: "Em muitas festas típicas de Brusque, o que as pessoas costumam fazer?",
    opcoes: ["Dançar e comer comidas típicas", "Ir ao cinema sozinho", "Dormir o dia todo", "Jogar videogame"],
    correta: "Dançar e comer comidas típicas"
  },
  {
    pergunta: "Qual tipo de roupa é comum em festas tradicionais de origem alemã na região de Brusque?",
    opcoes: ["Traje típico alemão", "Roupa de astronauta", "Uniforme de futebol", "Pijama"],
    correta: "Traje típico alemão"
  },
  {
    pergunta: "Qual comida é muito comum em festas típicas de Brusque e região?",
    opcoes: ["Cuca e linguiça", "Hambúrguer gigante de outro planeta", "Sorvete de pedra", "Pipoca de ouro"],
    correta: "Cuca e linguiça"
  },
  {
    pergunta: "Em festas culturais, o que as bandas costumam tocar em Brusque?",
    opcoes: ["Música alemã e tradicional", "Som de robôs", "Silêncio total", "Latido de cachorro"],
    correta: "Música alemã e tradicional"
  },
  {
    pergunta: "Qual desses é um lugar onde podem acontecer festas típicas em Brusque?",
    opcoes: ["Salões comunitários", "Planeta Marte", "Dentro do mar", "Dentro de um carro"],
    correta: "Salões comunitários"
  },
  {
    pergunta: "O que as crianças podem aprender em festas culturais de Brusque?",
    opcoes: ["História e tradições", "Como voar", "Como virar invisível", "Como viver na lua"],
    correta: "História e tradições"
  },
  {
    pergunta: "Qual desses elementos faz parte de festas típicas alemãs em Brusque?",
    opcoes: ["Chopp e música tradicional", "Foguetes espaciais", "Dragões voadores", "Pizzas de cristal"],
    correta: "Chopp e música tradicional"
  },
  {
    pergunta: "Qual dança pode aparecer em festas culturais de Brusque?",
    opcoes: ["Dança típica alemã", "Dança de robô futurista", "Dança na lua", "Dança invisível"],
    correta: "Dança típica alemã"
  },
  {
    pergunta: "Em festas típicas, o que geralmente enfeita o local em Brusque?",
    opcoes: ["Bandeiras e decorações culturais", "Teias de aranha gigantes", "Gelo no chão o ano todo", "Pedras flutuantes"],
    correta: "Bandeiras e decorações culturais"
  },
  {
    pergunta: "Qual dessas comidas é mais parecida com a cultura alemã em Brusque?",
    opcoes: ["Salsicha e pão", "Algodão doce espacial", "Biscoito de areia", "Suco de nuvem"],
    correta: "Salsicha e pão"
  },
  {
    pergunta: "O que as pessoas fazem para celebrar a cultura em Brusque?",
    opcoes: ["Participam de festas e eventos culturais", "Ficam em silêncio no escuro", "Vão morar na floresta sem falar com ninguém", "Correm sem parar o dia todo"],
    correta: "Participam de festas e eventos culturais"
  },
  {
    pergunta: "Qual é uma tradição importante em cidades como Brusque?",
    opcoes: ["Manter vivas as festas culturais", "Apagar todas as histórias antigas", "Trocar o nome da cidade todo dia", "Esconder os parques"],
    correta: "Manter vivas as festas culturais"
  },
  {
    pergunta: "Em festas culturais, o que as pessoas costumam compartilhar?",
    opcoes: ["Comida e alegria", "Silêncio absoluto", "Brigas", "Medo"],
    correta: "Comida e alegria"
  },
  {
    pergunta: "Qual desses é um sentimento comum em festas típicas de Brusque?",
    opcoes: ["Felicidade", "Tristeza constante", "Raiva sem motivo", "Sono eterno"],
    correta: "Felicidade"
  },
  {
    pergunta: "O que as festas típicas ajudam a mostrar sobre Brusque?",
    opcoes: ["Sua cultura e história", "Que a cidade é invisível", "Que não existe gente lá", "Que só tem robôs"],
    correta: "Sua cultura e história"
  }
];

let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;
let nomeJogador = "";

function iniciarJogo() {
  nomeJogador = document.getElementById("nome").value.trim();

  if (nomeJogador === "") {
    nomeJogador = "Jogador";
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

  document.getElementById("pontuacao").textContent =
    `Pontos: ${pontos}`;

  document.getElementById("textoPergunta").textContent =
    perguntaSelecionada.pergunta;

  document.getElementById("mensagemResposta").textContent = "";
  document.getElementById("botaoProxima").classList.add("oculto");

  const areaOpcoes = document.getElementById("opcoes");
  areaOpcoes.innerHTML = "";

  const opcoesMisturadas =
    embaralharPerguntas([...perguntaSelecionada.opcoes]);

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

    document.getElementById("mensagemResposta").textContent =
      "Muito bem! Você acertou!";
  } else {
    botaoClicado.classList.add("errada");

    document.getElementById("mensagemResposta").textContent =
      "Ops! Essa não era a resposta correta.";
  }

  document.getElementById("pontuacao").textContent =
    `Pontos: ${pontos}`;

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

  document.getElementById("resultadoPontos").textContent =
    `${pontos} pontos`;

  let mensagem = "";

  if (pontos >= 120) {
    mensagem = `Parabéns, ${nomeJogador}! Você conhece muito bem a cultura de Brusque!`;
  } else if (pontos >= 80) {
    mensagem = `Muito bem, ${nomeJogador}! Você aprendeu bastante sobre Brusque!`;
  } else if (pontos >= 40) {
    mensagem = `Boa tentativa, ${nomeJogador}! Continue aprendendo sobre a cidade.`;
  } else {
    mensagem = `Não desista, ${nomeJogador}! Você pode aprender ainda mais jogando novamente.`;
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
