/* =========================================================
   Os dados vêm de data/dados.json (carregados com fetch)
   ========================================================= */

/* Medida usada na pizza: 'feminicidios' ou 'mortes' */
const MEDIDA_PIZZA = 'feminicidios';

const ARQUIVO_DADOS = 'dados.json';

/* Começam vazios e são preenchidos por carregarDados() */
let dadosMortes = [];
let dadosFaixaEtaria = [];
let dadosDenuncias = [];
let fonteDados = '';

/* ---------- Elementos da página ---------- */
const selRegiao = document.getElementById('filtroRegiao');
const boxFaixas = document.getElementById('filtroFaixas');
const selAnoIni = document.getElementById('anoInicio');
const selAnoFim = document.getElementById('anoFim');
const btnLimpar = document.getElementById('btnLimpar');
const msgVazio  = document.getElementById('msgVazio');

/* =========================================================
   FILTROS
   ========================================================= */
function anosDisponiveis() {
  const todos = [...dadosMortes, ...dadosFaixaEtaria, ...dadosDenuncias];
  return [...new Set(todos.map(d => d.ano))].sort((a, b) => a - b);
}

function regioesDisponiveis() {
  return [...new Set([...dadosMortes, ...dadosDenuncias].map(d => d.regiao))].sort();
}

/* Faixas na ordem em que aparecem no JSON */
function faixasDisponiveis() {
  return [...new Set(dadosFaixaEtaria.map(d => d.faixa))];
}

function preencherSelect(select, valores, textoTodos) {
  select.innerHTML = textoTodos ? `<option value="">${textoTodos}</option>` : '';
  valores.forEach(v => {
    select.innerHTML += `<option value="${v}">${v}</option>`;
  });
}

function preencherFaixas() {
  boxFaixas.innerHTML = faixasDisponiveis()
    .map(f => `<label class="check"><input type="checkbox" value="${f}" checked> ${f}</label>`)
    .join('');
}

function faixasMarcadas() {
  return [...boxFaixas.querySelectorAll('input:checked')].map(i => i.value);
}

function preencherFiltros() {
  const anos = anosDisponiveis();
  preencherSelect(selRegiao, regioesDisponiveis(), 'Todas as regiões');
  preencherSelect(selAnoIni, anos);
  preencherSelect(selAnoFim, anos);
  preencherFaixas();
  limparFiltros(false);
}

function limparFiltros(atualizarTela = true) {
  const anos = anosDisponiveis();
  selRegiao.value = '';
  selAnoIni.value = anos[0];
  selAnoFim.value = anos[anos.length - 1];
  boxFaixas.querySelectorAll('input').forEach(i => (i.checked = true));
  if (atualizarTela) atualizar();
}

function noPeriodo(d) {
  return d.ano >= Number(selAnoIni.value) && d.ano <= Number(selAnoFim.value);
}

function naRegiao(d) {
  return !selRegiao.value || d.regiao === selRegiao.value;
}

/* Soma um campo numérico agrupando por outro campo.
   A ordem dos grupos é a ordem em que aparecem nos dados. */
function somarPor(lista, campoGrupo, campoValor) {
  const soma = {};
  lista.forEach(d => {
    soma[d[campoGrupo]] = (soma[d[campoGrupo]] || 0) + d[campoValor];
  });
  return soma;
}

/* =========================================================
   GRÁFICOS (criados uma vez, atualizados depois)
   ========================================================= */
const cores = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
  'rgb(201, 203, 207)'
];

/* Gráfico 1: colunas - mortes por ano */
const grafico1 = new Chart(document.getElementById('grafico1'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Mortes',
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
      title: { display: true, text: 'Mortes por ano (nº de mortes)' }
    },
    scales: {
      x: { title: { display: true, text: 'Ano' } },
      y: { beginAtZero: true, title: { display: true, text: 'Número de mortes' } }
    }
  }
});

/* Gráfico 2: pizza - faixa etária */
const nomeMedida = MEDIDA_PIZZA === 'feminicidios' ? 'feminicídios' : 'mortes';

const grafico2 = new Chart(document.getElementById('grafico2'), {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: nomeMedida,
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
        text: `Faixa etária das vítimas: ${nomeMedida} (nº de ${nomeMedida})`
      },
      legend: { position: 'bottom' }
    }
  }
});

/* Gráfico 3: linha - denúncias por ano */
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
      title: { display: true, text: 'Denúncias por ano (nº de denúncias)' }
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

  const marcadas  = faixasMarcadas();
  const mortes    = dadosMortes.filter(d => noPeriodo(d) && naRegiao(d));
  const denuncias = dadosDenuncias.filter(d => noPeriodo(d) && naRegiao(d));
  const faixas    = dadosFaixaEtaria.filter(d => noPeriodo(d) && marcadas.includes(d.faixa));

  msgVazio.textContent = 'Nenhum dado para os filtros escolhidos.';
  msgVazio.hidden = (mortes.length + denuncias.length + faixas.length) > 0;

  /* Gráfico 1: mortes por ano */
  const mortesPorAno = somarPor(mortes, 'ano', 'mortes');
  const anosMortes = Object.keys(mortesPorAno).sort((a, b) => a - b);
  grafico1.data.labels = anosMortes;
  grafico1.data.datasets[0].data = anosMortes.map(a => mortesPorAno[a]);

  /* Gráfico 2: faixa etária (só as faixas marcadas) */
  const porFaixa = somarPor(faixas, 'faixa', MEDIDA_PIZZA);
  const labelsFaixa = Object.keys(porFaixa);
  const todasFaixas = faixasDisponiveis();
  grafico2.data.labels = labelsFaixa;
  grafico2.data.datasets[0].data = Object.values(porFaixa);
  // cada faixa mantém sempre a mesma cor, mesmo desmarcando outras
  grafico2.data.datasets[0].backgroundColor =
    labelsFaixa.map(f => cores[todasFaixas.indexOf(f) % cores.length]);

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

    dadosMortes      = json.mortes      || [];
    dadosFaixaEtaria = json.faixaEtaria || [];
    dadosDenuncias   = json.denuncias   || [];
    fonteDados       = json.fonte       || '';

    document.getElementById('fonteDados').textContent =
      fonteDados ? 'Fonte dos dados: ' + fonteDados : '';

    preencherFiltros();
    atualizar();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    msgVazio.textContent = 'Não foi possível carregar os dados.';
    msgVazio.hidden = false;
  }
}

/* =========================================================
   EVENTOS E INÍCIO
   ========================================================= */
[selRegiao, selAnoIni, selAnoFim].forEach(sel => {
  sel.addEventListener('change', atualizar);
});
boxFaixas.addEventListener('change', atualizar);
btnLimpar.addEventListener('click', () => limparFiltros());

carregarDados();