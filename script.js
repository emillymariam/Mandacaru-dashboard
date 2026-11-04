/* =========================================================
   Os dados vêm de dados.json (carregados com fetch)
   ========================================================= */

const ARQUIVO_DADOS = 'dados.json';

/* Começam vazios e são preenchidos por carregarDados() */
let dadosFeminicidios = [];
let dadosProcessos = [];
let dadosDenuncias = [];
let dadosMortes = [];            // NOVO (4a)
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
      y: { beginAtZero: true, title: { display: true, text: 'Número
