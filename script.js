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
  const todos = [...dadosFeminicidios, ...dadosProcessos, ...dadosDenuncias, ...metas];
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
/* Padrão de listras diagonais para a barra de meta (sem preenchimento sólido) */
function padraoRiscado(cor) {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 8;
  const ctx = c.getContext('2d');
  ctx.strokeStyle = cor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(8, 0);
  ctx.moveTo(-2, 2);
  ctx.lineTo(2, -2);
  ctx.moveTo(6, 10);
  ctx.lineTo(10, 6);
  ctx.stroke();
  return ctx.createPattern(c, 'repeat');
}

/* Gráfico 1: colunas - feminicídios no Brasil por ano, com meta como barra riscada */
const grafico1 = new Chart(document.getElementById('grafico1'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Feminicídios',
      order: 1,
      grouped: false,
      data: [],
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: 'pink'
    }, {
      type: 'bar',
      label: 'Meta',
      order: 0,
      grouped: false,
      data: [],
      backgroundColor: padraoRiscado('#76172C'),
      borderColor: '#76172C',
      borderWidth: 2
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


const corPontoDenuncias = ctx => {
  if (ctx.dataIndex === undefined) return '#0070c0';  
  const real = ctx.chart.data.datasets[0].data[ctx.dataIndex];
  const meta = ctx.chart.data.datasets[1].data[ctx.dataIndex];
  return real != null && meta != null && real < meta ? '#e00000' : '#0070c0';
};

/* Gráfico 3: linha - denúncias no Brasil por ano */
const grafico3 = new Chart(document.getElementById('grafico3'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Denúncias',
      order: 1,
      data: [],
      borderColor: '#0070c0',
      backgroundColor: '#0070c0',
      borderWidth: 3,
      tension: 0,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: corPontoDenuncias,
      pointBorderColor: corPontoDenuncias
    }, {
      label: 'Meta',
      order: 0,
      data: [],
      borderColor: '#00b050',
      backgroundColor: '#00b050',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
      showLine: true,
      spanGaps: true,
      tension: 0
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
  const anosFem = anosDoIndicador('feminicidios', feminicidios, 'feminicidios');
  grafico1.data.labels = anosFem;
  grafico1.data.datasets[0].data = anosFem.map(a => femPorAno[a] ?? null);
  grafico1.data.datasets[1].data = anosFem.map(a => valorMeta('feminicidios', a));

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
  const anosDen = anosDoIndicador('denuncias', denuncias, 'denuncias');
  grafico3.data.labels = anosDen;
  grafico3.data.datasets[0].data = anosDen.map(a => denPorAno[a] ?? null);
  grafico3.data.datasets[1].data = anosDen.map(a => valorMeta('denuncias', a));

  grafico1.update();
  grafico2.update();
  grafico3.update();

  renderizarMetas();
}

/* =========================================================
   METAS - CRUD com Back4App (as chamadas ficam em api.js)
   ========================================================= */
const INDICADORES = {
  feminicidios: { nome: 'Feminicídios', lista: () => dadosFeminicidios, campo: 'feminicidios' },
  denuncias:    { nome: 'Denúncias',    lista: () => dadosDenuncias,    campo: 'denuncias' }
};

let metas = [];

const formMeta     = document.getElementById('formMeta');
const metaId       = document.getElementById('metaId');
const metaIndic    = document.getElementById('metaIndicador');
const metaAno      = document.getElementById('metaAno');
const metaValor    = document.getElementById('metaValor');
const metaObs      = document.getElementById('metaObs');
const btnSalvar    = document.getElementById('btnSalvarMeta');
const btnCancelar  = document.getElementById('btnCancelarMeta');
const msgMetas     = document.getElementById('msgMetas');
const listaMetas   = document.getElementById('listaMetas');

function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function mostrarMsgMeta(texto, erro = false) {
  msgMetas.textContent = texto;
  msgMetas.classList.toggle('erro', erro);
}

function formatar(n) {
  return Number(n).toLocaleString('pt-BR');
}

/* Valor da meta cadastrada para um indicador/ano (ou null) */
function valorMeta(indicador, ano) {
  const m = metas.find(x => x.indicador === indicador && x.ano === Number(ano));
  return m ? m.valor : null;
}

/* Anos do gráfico de um indicador: anos com dado real + anos com meta cadastrada no período */
function anosDoIndicador(indicador, lista, campo) {
  const anos = new Set(Object.keys(somarPor(lista, 'ano', campo)).map(Number));
  metas.filter(m => m.indicador === indicador && noPeriodo(m))
       .forEach(m => anos.add(m.ano));
  return [...anos].sort((a, b) => a - b);
}

/* Valor real (do dados.json) para um indicador/ano (ou null) */
function realizadoDe(indicador, ano) {
  const ind = INDICADORES[indicador];
  if (!ind) return null;
  const itens = ind.lista().filter(d => d.ano === Number(ano));
  if (!itens.length) return null;
  return itens.reduce((soma, d) => soma + d[ind.campo], 0);
}

function textoDiferenca(realizado, meta) {
  if (realizado === null) return '—';
  const dif = realizado - meta;
  if (dif === 0) return 'Na meta';
  return dif > 0
    ? `${formatar(dif)} acima da meta`
    : `${formatar(-dif)} abaixo da meta`;
}

/* ----- READ: desenha a tabela ----- */
function renderizarMetas() {
  if (!metas.length) {
    listaMetas.innerHTML =
      '<tr><td colspan="7" class="tabela-vazia">Nenhuma meta cadastrada ainda.</td></tr>';
    return;
  }

  const ordenadas = [...metas].sort((a, b) =>
    a.indicador.localeCompare(b.indicador) || a.ano - b.ano);

  listaMetas.innerHTML = ordenadas.map(m => {
    const realizado = realizadoDe(m.indicador, m.ano);
    const nome = INDICADORES[m.indicador] ? INDICADORES[m.indicador].nome : m.indicador;
    return `
      <tr>
        <td>${escapar(nome)}</td>
        <td>${m.ano}</td>
        <td>${formatar(m.valor)}</td>
        <td>${realizado === null ? '—' : formatar(realizado)}</td>
        <td>${textoDiferenca(realizado, m.valor)}</td>
        <td>${escapar(m.observacao || '')}</td>
        <td class="acoes">
          <button type="button" data-acao="editar" data-id="${m.objectId}">Editar</button>
          <button type="button" data-acao="excluir" data-id="${m.objectId}" class="btn-perigo">Excluir</button>
        </td>
      </tr>`;
  }).join('');
}

async function carregarMetas() {
  try {
    metas = await MetasAPI.listar();
    mostrarMsgMeta('');
  } catch (erro) {
    console.error('Erro ao carregar metas:', erro);
    mostrarMsgMeta('Não foi possível carregar as metas: ' + erro.message, true);
  }
}

/* ----- Modo edição do formulário ----- */
function entrarEmEdicao(meta) {
  metaId.value = meta.objectId;
  metaIndic.value = meta.indicador;
  metaAno.value = meta.ano;
  metaValor.value = meta.valor;
  metaObs.value = meta.observacao || '';
  btnSalvar.textContent = 'Salvar alterações';
  btnCancelar.hidden = false;
  formMeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function sairDaEdicao() {
  formMeta.reset();
  metaId.value = '';
  btnSalvar.textContent = 'Cadastrar meta';
  btnCancelar.hidden = true;
}

function setOcupado(ocupado) {
  btnSalvar.disabled = ocupado;
  listaMetas.querySelectorAll('button').forEach(b => { b.disabled = ocupado; });
}

/* ----- CREATE e UPDATE: envio do formulário ----- */
formMeta.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    indicador: metaIndic.value,
    ano: Number(metaAno.value),
    valor: Number(metaValor.value),
    observacao: metaObs.value.trim()
  };
  const id = metaId.value;

  const duplicada = metas.find(m =>
    m.indicador === dados.indicador && m.ano === dados.ano && m.objectId !== id);
  if (duplicada) {
    mostrarMsgMeta('Já existe uma meta para esse indicador e ano. Edite a existente.', true);
    return;
  }

  setOcupado(true);
  try {
    if (id) {
      await MetasAPI.editar(id, dados);
      const existente = metas.find(m => m.objectId === id);
      Object.assign(existente, dados);
      mostrarMsgMeta('Meta atualizada.');
    } else {
      const criada = await MetasAPI.criar(dados);
      metas.push({ objectId: criada.objectId, ...dados });
      mostrarMsgMeta('Meta cadastrada.');
    }
    sairDaEdicao();
    atualizar();
  } catch (erro) {
    console.error(erro);
    mostrarMsgMeta('Erro ao salvar: ' + erro.message, true);
  } finally {
    setOcupado(false);
  }
});

btnCancelar.addEventListener('click', () => {
  sairDaEdicao();
  mostrarMsgMeta('');
});

/* ----- Botões Editar / Excluir da tabela ----- */
listaMetas.addEventListener('click', async (e) => {
  const botao = e.target.closest('button[data-acao]');
  if (!botao) return;

  const meta = metas.find(m => m.objectId === botao.dataset.id);
  if (!meta) return;

  if (botao.dataset.acao === 'editar') {
    entrarEmEdicao(meta);
    return;
  }

  /* DELETE */
  if (!confirm(`Excluir a meta de ${meta.ano}?`)) return;

  setOcupado(true);
  try {
    await MetasAPI.excluir(meta.objectId);
    metas = metas.filter(m => m.objectId !== meta.objectId);
    if (metaId.value === meta.objectId) sairDaEdicao();
    mostrarMsgMeta('Meta excluída.');
    atualizar();
  } catch (erro) {
    console.error(erro);
    mostrarMsgMeta('Erro ao excluir: ' + erro.message, true);
  } finally {
    setOcupado(false);
  }
});

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

    await carregarMetas();   /* metas antes dos filtros, para o período incluir anos só com meta */
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