// ========================================
// MANDACARU - LOCAIS DE APOIO
// OpenStreetMap + Overpass API
// ========================================

// Inicialização do mapa de Pernambuco
const mapa = L.map('mapaPernambuco').setView([-8.3, -37.8], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(mapa);

// Camada dos marcadores
const camadaLocais = L.layerGroup().addTo(mapa);

// Elementos da página
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroMunicipio = document.getElementById('filtroMunicipio');
const statusApoio = document.getElementById('statusApoio');
const listaLocais = document.getElementById('listaLocais');
const quantidadeLocais = document.getElementById('quantidadeLocais');
const btnAtualizar = document.getElementById('btnAtualizarLocais');
const btnLocalizacao = document.getElementById('btnMinhaLocalizacao');

// Lista de locais encontrados
let todosLocais = [];

// Consulta à API Overpass
const consultaOverpass = `
[out:json][timeout:60];

area["name"="Pernambuco"]
["boundary"="administrative"]
["admin_level"="4"]->.estado;

(
  nwr(area.estado)["amenity"="police"]["name"~"mulher|delegacia",i];

  nwr(area.estado)["police"="women"];

  nwr(area.estado)["social_facility"~"women|shelter|outreach",i];

  nwr(area.estado)["name"~"compaz|centro de referência|centro de atendimento à mulher|sala da mulher|secretaria da mulher|delegacia da mulher",i];
);

out center tags;
`;

// Proteção contra conteúdo HTML inesperado
function textoSeguro(valor) {
  return String(valor || '').replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[caractere]);
}

// Obtém latitude e longitude
function obterCoordenadas(elemento) {

  if (elemento.lat != null && elemento.lon != null) {
    return {
      lat: elemento.lat,
      lng: elemento.lon
    };
  }

  if (elemento.center) {
    return {
      lat: elemento.center.lat,
      lng: elemento.center.lon
    };
  }

  return null;
}

// Identifica a categoria do serviço
function classificarLocal(tags) {

  const nome = (tags.name || '').toLowerCase();

  if (
    tags.police === 'women' ||
    /delegacia.*mulher|mulher.*delegacia/.test(nome)
  ) {
    return {
      chave: 'delegacia',
      nome: 'Delegacia da Mulher',
      cor: 'delegacia'
    };
  }

  if (/compaz|sala da mulher/.test(nome)) {
    return {
      chave: 'compaz',
      nome: 'Compaz / Sala da Mulher',
      cor: 'compaz'
    };
  }

  if (
    tags.social_facility ||
    /centro de referência|centro de atendimento|ceam|clarice lispector/.test(nome)
  ) {
    return {
      chave: 'centro',
      nome: 'Centro de Referência / serviço especializado',
      cor: 'centro'
    };
  }

  return {
    chave: 'outro',
    nome: 'Outro serviço mapeado',
    cor: 'outro'
  };
}

// Organiza os dados recebidos da API
function montarLocal(elemento) {

  const tags = elemento.tags || {};
  const coordenadas = obterCoordenadas(elemento);

  if (!coordenadas) {
    return null;
  }

  const categoria = classificarLocal(tags);

  const endereco = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:suburb'],
    tags['addr:city']
  ].filter(Boolean).join(', ');

  return {
    id: `${elemento.type}-${elemento.id}`,
    nome: tags.name || categoria.nome,
    categoria: categoria,

    municipio:
      tags['addr:city'] ||
      tags['addr:municipality'] ||
      tags['is_in:city'] ||
      'Município não informado',

    endereco:
      endereco ||
      'Endereço não informado no OpenStreetMap',

    telefone:
      tags.phone ||
      tags['contact:phone'] ||
      '',

    site:
      tags.website ||
      tags['contact:website'] ||
      '',

    lat: coordenadas.lat,
    lng: coordenadas.lng,

    osm: `https://www.openstreetmap.org/${elemento.type}/${elemento.id}`
  };
}

// Cria marcadores coloridos
function criarIcone(cor) {

  return L.divIcon({
    className: '',
    html: `<span class="pino-mapa pino-${cor}"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
}

// Mostra os locais no mapa e na lista
function desenharLocais() {

  camadaLocais.clearLayers();
  listaLocais.innerHTML = '';

  const categoriaEscolhida = filtroCategoria.value;
  const municipioEscolhido = filtroMunicipio.value;

  const filtrados = todosLocais.filter(local => {

    const categoriaOk =
      categoriaEscolhida === 'todos' ||
      local.categoria.chave === categoriaEscolhida;

    const municipioOk =
      municipioEscolhido === 'todos' ||
      local.municipio === municipioEscolhido;

    return categoriaOk && municipioOk;
  });

  filtrados.forEach(local => {

    const popup = `
      <strong>${textoSeguro(local.nome)}</strong><br>
      ${textoSeguro(local.categoria.nome)}<br>
      ${textoSeguro(local.municipio)}<br>
      ${textoSeguro(local.endereco)}

      ${local.telefone
        ? `<br>Telefone: ${textoSeguro(local.telefone)}`
        : ''
      }

      <br>
      <a href="${local.osm}" target="_blank" rel="noopener">
        Ver registro no OpenStreetMap
      </a>

      <br>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lng}"
         target="_blank" rel="noopener">
        Como chegar
      </a>
    `;

    L.marker(
      [local.lat, local.lng],
      { icon: criarIcone(local.categoria.cor) }
    )
      .addTo(camadaLocais)
      .bindPopup(popup);

    const item = document.createElement('li');

    item.innerHTML = `
      <h4>${textoSeguro(local.nome)}</h4>

      <span class="tag-categoria">
        ${textoSeguro(local.categoria.nome)}
      </span>

      <p>
        <strong>Município:</strong>
        ${textoSeguro(local.municipio)}
      </p>

      <p>
        <strong>Endereço:</strong>
        ${textoSeguro(local.endereco)}
      </p>

      ${local.telefone
        ? `<p><strong>Telefone:</strong> ${textoSeguro(local.telefone)}</p>`
        : ''
      }

      <p>
        <a href="${local.osm}" target="_blank" rel="noopener">
          Ver registro
        </a>

        ·

        <a href="https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lng}"
           target="_blank" rel="noopener">
          Como chegar
        </a>
      </p>
    `;

    item.addEventListener('click', () => {
      mapa.setView([local.lat, local.lng], 15);
    });

    listaLocais.appendChild(item);
  });

  quantidadeLocais.textContent =
    `${filtrados.length} ${filtrados.length === 1 ? 'local' : 'locais'}`;

  if (filtrados.length === 0) {
    listaLocais.innerHTML = `
      <li>
        Nenhum registro encontrado para os filtros selecionados.
        Tente outra categoria ou município.
      </li>
    `;
  }
}

// Preenche o filtro de municípios
function preencherMunicipios() {

  const selecionado = filtroMunicipio.value;

  const municipios = [
    ...new Set(
      todosLocais.map(local => local.municipio)
    )
  ]
    .filter(nome => nome !== 'Município não informado')
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  filtroMunicipio.innerHTML = `
    <option value="todos">Todos os municípios</option>
  `;

  municipios.forEach(municipio => {

    const opcao = document.createElement('option');

    opcao.value = municipio;
    opcao.textContent = municipio;

    filtroMunicipio.appendChild(opcao);
  });

  if (municipios.includes(selecionado)) {
    filtroMunicipio.value = selecionado;
  }
}

// Consulta a API do OpenStreetMap
async function carregarLocais() {

  btnAtualizar.disabled = true;

  statusApoio.textContent =
    'Consultando os registros do OpenStreetMap para Pernambuco. Isso pode levar alguns segundos...';

  try {

    const resposta = await fetch(
      'https://overpass-api.de/api/interpreter',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },

        body: 'data=' + encodeURIComponent(consultaOverpass)
      }
    );

    if (!resposta.ok) {
      throw new Error(`Erro na consulta: ${resposta.status}`);
    }

    const dados = await resposta.json();

    const unicos = new Map();

    (dados.elements || []).forEach(elemento => {

      const local = montarLocal(elemento);

      if (local) {
        unicos.set(local.id, local);
      }

    });

    todosLocais = [...unicos.values()].sort((a, b) =>
      a.municipio.localeCompare(b.municipio, 'pt-BR') ||
      a.nome.localeCompare(b.nome, 'pt-BR')
    );

    preencherMunicipios();
    desenharLocais();

    if (todosLocais.length > 0) {

      const limites = L.latLngBounds(
        todosLocais.map(local => [local.lat, local.lng])
      );

      mapa.fitBounds(
        limites,
        {
          padding: [25, 25],
          maxZoom: 10
        }
      );

      statusApoio.textContent =
        `${todosLocais.length} registros encontrados. A cobertura depende dos dados cadastrados no OpenStreetMap.`;

    } else {

      statusApoio.textContent =
        'A consulta terminou, mas não encontrou registros com esses critérios. Isso não significa que não existam serviços na região.';

    }

  } catch (erro) {

    console.error('Erro ao consultar OpenStreetMap:', erro);

    statusApoio.textContent =
      'Não foi possível consultar o OpenStreetMap agora. Verifique sua conexão e tente novamente.';

    listaLocais.innerHTML = `
      <li>
        Não foi possível carregar os locais.
        Tente novamente mais tarde.
      </li>
    `;

    quantidadeLocais.textContent = 'Consulta indisponível';

  } finally {

    btnAtualizar.disabled = false;

  }
}

// Filtros
filtroCategoria.addEventListener('change', desenharLocais);
filtroMunicipio.addEventListener('change', desenharLocais);

// Botão para atualizar
btnAtualizar.addEventListener('click', carregarLocais);

// Localização da pessoa usuária
btnLocalizacao.addEventListener('click', () => {

  if (!navigator.geolocation) {

    statusApoio.textContent =
      'Seu navegador não oferece recurso de localização.';

    return;
  }

  statusApoio.textContent =
    'Solicitando sua localização...';

  navigator.geolocation.getCurrentPosition(

    posicao => {

      mapa.setView(
        [
          posicao.coords.latitude,
          posicao.coords.longitude
        ],
        12
      );

      L.circleMarker(
        [
          posicao.coords.latitude,
          posicao.coords.longitude
        ],
        {
          radius: 8,
          color: '#fff',
          weight: 2,
          fillColor: '#1a73e8',
          fillOpacity: 1
        }
      )
        .addTo(mapa)
        .bindPopup('Sua localização aproximada')
        .openPopup();

      statusApoio.textContent =
        'Mapa centralizado na sua localização. Os locais exibidos continuam sendo os registros encontrados no OpenStreetMap.';

    },

    () => {

      statusApoio.textContent =
        'Não foi possível obter sua localização. Você ainda pode navegar pelo mapa de Pernambuco.';

    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }

  );

});

// Inicia a consulta ao abrir a página
carregarLocais();
