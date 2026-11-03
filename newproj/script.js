/* =========================================================
   Os dados vêm de dados.json (carregados com fetch)
   ========================================================= */

const ARQUIVO_DADOS = 'dados.json';

/* Começam vazios e são preenchidos por carregarDados() */
let dadosFeminicidios = [];
let dadosProcessos = [];
let dadosDenuncias = [];
let fonteDados = '';

/* ---------- Elementos da página ---------- */
const selAnoIni = document.getElementById('anoInicio');
const selAnoFim = document.getElementById('anoFim');
const btnLimpar = document.getElementById('btnLimpar');
const msgVazio  = document.getElementById('msgVazio');

/* =========================================================
   FILTROS (todos por ano)
   ========================================================= */
function anosDisponiveis() {
  const todos = [...dadosFeminicidios, ...dadosProcessos, ...dadosDenuncias];
  return [...new Set(todos.map(d => d.ano))].sort((a, b) => a - b);
}

function preencherSelect(select, valores) {
  select.innerHTML = valores
    .map(v => `<option value="${v}">${v}</option>`)
    .join('');
}

function preencherFiltros() {
  const anos = anosDisponiveis();
  preencherSelect(selAnoIni, anos);
  preencherSelect(selAnoFim, anos);
  limparFiltros(false);
}

function limparFiltros(atualizarTela = true) {
  const anos = anosDisponiveis();
  selAnoIni.value = anos[0];
  selAnoFim.value = anos[anos.length - 1];
  if (atualizarTela) atualizar();
}

function noPeriodo(d) {
  return d.ano >= Number(selAnoIni.value) && d.ano <= Number(selAnoFim.value);
}

/* Soma um campo numérico agrupando por outro campo. */
function somarPor(lista, campoGrupo, campoValor) {
  const soma = {};
  lista.forEach(d => {
    soma[d[campoGrupo]] = (soma[d[campoGrupo]] || 0) + d[campoValor];
  });
  return soma;
}

/* Cor da fatia da pizza: cada ano mantém sempre a mesma cor */
function corDoAno(indice) {
  return `hsl(${(indice * 47) % 360}, 70%, 60%)`;
}

/* =========================================================
   GRÁFICOS (criados uma vez, atualizados depois)
   ========================================================= */

/* Gráfico 1: colunas - feminicídios no Brasil por ano */
const grafico1 = new Chart(document.getElementById('grafico1'), {
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
      title: { display: true, text: 'Feminicídios no Brasil por ano (nº de feminicídios)' }
    },
    scales: {
      x: { title: { display: true, text: 'Ano' } },
      y: { beginAtZero: true, title: { display: true, text: 'Número de feminicídios' } }
    }
  }
});

/* Gráfico 2: pizza - processos de violência doméstica no Judiciário */
const grafico2 = new Chart(document.getElementById('grafico2'), {
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
        text: 'Processos de violência doméstica registrados no Judiciário (nº de processos, por ano)'
      },
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: ctx => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total ? ((ctx.parsed / total) * 100).toFixed(1).replace('.', ',') : '0';
            return `${ctx.label}: ${ctx.parsed.toLocaleString('pt-BR')} processos (${pct}%)`;
          }
        }
      }
    }
  }
});

/* Gráfico 3: linha - denúncias no Brasil por ano */
const grafico3 = new Chart(document.getElementById('grafico3'), {
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
      title: { display: true, text: 'Denúncias no Brasil por ano (nº de denúncias)' }
    },
    scales: {
      x: { title: { display: true, text: 'Ano' } },
      y: { beginAtZero: true, title: { display: true, text: 'Número de denúncias' } }
    }
  }
});

/* =========================================================
   ATUALIZAÇÃO
   ========================================================= */
function atualizar() {
  // Se o ano inicial passar do final, iguala os dois
  if (Number(selAnoIni.value) > Number(selAnoFim.value)) {
    selAnoFim.value = selAnoIni.value;
  }

  const feminicidios = dadosFeminicidios.filter(noPeriodo);
  const processos    = dadosProcessos.filter(noPeriodo);
  const denuncias    = dadosDenuncias.filter(noPeriodo);

  msgVazio.textContent = 'Nenhum dado para os filtros escolhidos.';
  msgVazio.hidden = (feminicidios.length + processos.length + denuncias.length) > 0;

  /* Gráfico 1: feminicídios por ano */
  const femPorAno = somarPor(feminicidios, 'ano', 'feminicidios');
  const anosFem = Object.keys(femPorAno).sort((a, b) => a - b);
  grafico1.data.labels = anosFem;
  grafico1.data.datasets[0].data = anosFem.map(a => femPorAno[a]);

  /* Gráfico 2: processos no Judiciário (cada fatia é um ano) */
  const procPorAno = somarPor(processos, 'ano', 'processos');
  const anosProc = Object.keys(procPorAno).sort((a, b) => a - b);
  const todosAnos = anosDisponiveis();
  grafico2.data.labels = anosProc;
  grafico2.data.datasets[0].data = anosProc.map(a => procPorAno[a]);
  grafico2.data.datasets[0].backgroundColor =
    anosProc.map(a => corDoAno(todosAnos.indexOf(Number(a))));

  /* Gráfico 3: denúncias por ano */
  const denPorAno = somarPor(denuncias, 'ano', 'denuncias');
  const anosDen = Object.keys(denPorAno).sort((a, b) => a - b);
  grafico3.data.labels = anosDen;
  grafico3.data.datasets[0].data = anosDen.map(a => denPorAno[a]);

  grafico1.update();
  grafico2.update();
  grafico3.update();
}

/* =========================================================
   CARREGAR O JSON
   ========================================================= */
async function carregarDados() {
  try {
    const resp = await fetch(ARQUIVO_DADOS);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const json = await resp.json();

    dadosFeminicidios = json.feminicidios        || [];
    dadosProcessos    = json.processosJudiciario || [];
    dadosDenuncias    = json.denuncias           || [];
    fonteDados        = json.fonte               || '';

    document.getElementById('fonteDados').textContent =
      fonteDados ? 'Fonte dos dados: ' + fonteDados : '';

    preencherFiltros();
    atualizar();
  } catch (erro) {
    console.error('Erro ao carregar dados:', erro);
    msgVazio.textContent =
      'Não foi possível carregar dados.json. Abra a página pelo Live Server e confira o arquivo.';
    msgVazio.hidden = false;
  }
}

/* =========================================================
   EVENTOS E INÍCIO
   ========================================================= */
[selAnoIni, selAnoFim].forEach(sel => {
  sel.addEventListener('change', atualizar);
});
btnLimpar.addEventListener('click', () => limparFiltros());

carregarDados();