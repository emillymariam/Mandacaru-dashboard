
/* =========================================================
   MANDACARU - DASHBOARD
   Os dados são carregados do arquivo dados.json
   ========================================================= */

const ARQUIVO_DADOS = 'dados.json';

// Dados do dashboard
let dadosFeminicidios = [];
let dadosProcessos = [];
let dadosDenuncias = [];
let fonteDados = '';

// Elementos da página
const selAnoIni = document.getElementById('anoInicio');
const selAnoFim = document.getElementById('anoFim');
const btnLimpar = document.getElementById('btnLimpar');
const msgVazio = document.getElementById('msgVazio');

// Verifica se os elementos necessários existem
if (!selAnoIni || !selAnoFim || !btnLimpar || !msgVazio) {
  console.error('Erro: não foi possível encontrar os elementos dos filtros no HTML.');
}

/* =========================================================
   FILTROS
   ========================================================= */

function anosDisponiveis() {
  const todos = [
    ...dadosFeminicidios,
    ...dadosProcessos,
    ...dadosDenuncias
  ];

  return [...new Set(todos.map(d => Number(d.ano)))]
    .sort((a, b) => a - b);
}

function preencherSelect(select, valores) {
  select.innerHTML = valores
    .map(ano => `<option value="${ano}">${ano}</option>`)
    .join('');
}

function preencherFiltros() {
  const anos = anosDisponiveis();

  if (anos.length === 0) {
    msgVazio.textContent = 'Nenhum dado disponível para exibição.';
    msgVazio.hidden = false;
    return;
  }

  preencherSelect(selAnoIni, anos);
  preencherSelect(selAnoFim, anos);

  limparFiltros(false);
}

function limparFiltros(atualizarTela = true) {
  const anos = anosDisponiveis();

  if (anos.length === 0) return;

  selAnoIni.value = anos[0];
  selAnoFim.value = anos[anos.length - 1];

  if (atualizarTela) {
    atualizar();
  }
}

function noPeriodo(d) {
  const anoInicial = Number(selAnoIni.value);
  const anoFinal = Number(selAnoFim.value);

  return Number(d.ano) >= anoInicial &&
         Number(d.ano) <= anoFinal;
}

/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

function somarPor(lista, campoGrupo, campoValor) {
  const soma = {};

  lista.forEach(d => {
    const grupo = d[campoGrupo];
    const valor = Number(d[campoValor]) || 0;

    soma[grupo] = (soma[grupo] || 0) + valor;
  });

  return soma;
}

function corDoAno(indice) {
  return `hsl(${(indice * 47) % 360}, 70%, 60%)`;
}

/* =========================================================
   GRÁFICO 1 - FEMINICÍDIOS
   Tipo: barras
   ========================================================= */

const grafico1 = new Chart(
  document.getElementById('grafico1'),
  {
    type: 'bar',

    data: {
      labels: [],
      datasets: [{
        label: 'Feminicídios',
        data: [],
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'pink'
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Feminicídios no Brasil por ano'
        }
      },

      scales: {
        x: {
          title: {
            display: true,
            text: 'Ano'
          }
        },

        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de feminicídios'
          }
        }
      }
    }
  }
);

/* =========================================================
   GRÁFICO 2 - PROCESSOS JUDICIAIS
   Tipo: pizza
   ========================================================= */

const grafico2 = new Chart(
  document.getElementById('grafico2'),
  {
    type: 'pie',

    data: {
      labels: [],
      datasets: [{
        label: 'Processos',
        data: [],
        backgroundColor: [],
        hoverOffset: 4
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Processos de violência doméstica registrados no Judiciário'
        },

        legend: {
          position: 'bottom'
        },

        tooltip: {
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce(
                (a, b) => a + b, 0
              );

              const pct = total
                ? ((ctx.parsed / total) * 100)
                    .toFixed(1)
                    .replace('.', ',')
                : '0';

              return `${ctx.label}: ${
                ctx.parsed.toLocaleString('pt-BR')
              } processos (${pct}%)`;
            }
          }
        }
      }
    }
  }
);

/* =========================================================
   GRÁFICO 3 - DENÚNCIAS
   Tipo: linha
   ========================================================= */

const grafico3 = new Chart(
  document.getElementById('grafico3'),
  {
    type: 'line',

    data: {
      labels: [],
      datasets: [{
        label: 'Denúncias',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        borderWidth: 3,
        tension: 0.3
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Denúncias no Brasil por ano'
        }
      },

      scales: {
        x: {
          title: {
            display: true,
            text: 'Ano'
          }
        },

        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de denúncias'
          }
        }
      }
    }
  }
);

/* =========================================================
   ATUALIZAÇÃO DOS GRÁFICOS
   ========================================================= */

function atualizar() {

  // Evita que o ano inicial seja maior que o final
  if (Number(selAnoIni.value) > Number(selAnoFim.value)) {
    selAnoFim.value = selAnoIni.value;
  }

  // Filtra os dados pelo período selecionado
  const feminicidios = dadosFeminicidios.filter(noPeriodo);
  const processos = dadosProcessos.filter(noPeriodo);
  const denuncias = dadosDenuncias.filter(noPeriodo);

  // Verifica se existem dados no período
  const quantidade =
    feminicidios.length +
    processos.length +
    denuncias.length;

  msgVazio.textContent =
    'Nenhum dado para os filtros escolhidos.';

  msgVazio.hidden = quantidade > 0;

  // GRÁFICO 1: feminicídios por ano
  const femPorAno = somarPor(
    feminicidios,
    'ano',
    'feminicidios'
  );

  const anosFem = Object.keys(femPorAno)
    .sort((a, b) => Number(a) - Number(b));

  grafico1.data.labels = anosFem;

  grafico1.data.datasets[0].data =
    anosFem.map(ano => femPorAno[ano]);

  // GRÁFICO 2: processos por ano
  const procPorAno = somarPor(
    processos,
    'ano',
    'processos'
  );

  const anosProc = Object.keys(procPorAno)
    .sort((a, b) => Number(a) - Number(b));

  const todosAnos = anosDisponiveis();

  grafico2.data.labels = anosProc;

  grafico2.data.datasets[0].data =
    anosProc.map(ano => procPorAno[ano]);

  grafico2.data.datasets[0].backgroundColor =
    anosProc.map(ano =>
      corDoAno(todosAnos.indexOf(Number(ano)))
    );

  // GRÁFICO 3: denúncias por ano
  const denPorAno = somarPor(
    denuncias,
    'ano',
    'denuncias'
  );

  const anosDen = Object.keys(denPorAno)
    .sort((a, b) => Number(a) - Number(b));

  grafico3.data.labels = anosDen;

  grafico3.data.datasets[0].data =
    anosDen.map(ano => denPorAno[ano]);

  // Atualiza os três gráficos
  grafico1.update();
  grafico2.update();
  grafico3.update();
}

/* =========================================================
   CARREGAMENTO DOS DADOS JSON
   ========================================================= */

async function carregarDados() {

  try {
    const resposta = await fetch(ARQUIVO_DADOS);

    if (!resposta.ok) {
      throw new Error('Erro HTTP: ' + resposta.status);
    }

    const json = await resposta.json();

    // Recebe os dados do arquivo dados.json
    dadosFeminicidios = json.feminicidios || [];
    dadosProcessos = json.processosJudiciario || [];
    dadosDenuncias = json.denuncias || [];

    fonteDados = json.fonte || '';

    // Exibe a fonte dos dados na página
    document.getElementById('fonteDados').textContent =
      fonteDados
        ? 'Fonte dos dados: ' + fonteDados
        : '';

    // Preenche os filtros e atualiza os gráficos
    preencherFiltros();
    atualizar();

  } catch (erro) {

    console.error('Erro ao carregar os dados:', erro);

    msgVazio.textContent =
      'Não foi possível carregar os dados. Verifique o arquivo dados.json.';

    msgVazio.hidden = false;
  }
}

/* =========================================================
   EVENTOS E INICIALIZAÇÃO
   ========================================================= */

// Atualiza os gráficos quando os filtros mudam
[selAnoIni, selAnoFim].forEach(select => {
  select.addEventListener('change', atualizar);
});

// Botão para limpar os filtros
btnLimpar.addEventListener('click', () => {
  limparFiltros();
});

// Inicia o dashboard
carregarDados();
