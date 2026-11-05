// ============================================
// MANDACARU - LOCAIS DE APOIO
// Cadastro fixo com informações de fontes oficiais
// Sem consulta automática à Overpass API
// ============================================

// 1. SERVIÇOS CADASTRADOS
// Os endereços foram conferidos nas fontes oficiais.
// Não foram incluídas casas-abrigo com endereço sigiloso.

const todosLocais = [
  // DELEGACIAS DA MULHER
  {
    nome: "1ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Recife",
    endereco: "Rua André Rebouças, 136, Rosarinho, Recife - PE",
    telefone: "(81) 3184-3356"
  },
  {
    nome: "2ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Jaboatão dos Guararapes",
    endereco: "Estrada da Batalha, s/n, Prazeres, Jaboatão dos Guararapes - PE",
    telefone: "(81) 3184-3444"
  },
  {
    nome: "3ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Petrolina",
    endereco: "Rua Castro Alves, 57, Centro, Petrolina - PE",
    telefone: "(87) 3866-6625"
  },
  {
    nome: "4ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Caruaru",
    endereco: "Avenida Portugal, 155, Universitário, Caruaru - PE",
    telefone: "(81) 3719-9107"
  },
  {
    nome: "5ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Paulista",
    endereco: "Rua do Cajueiro, s/n, Praça Frederico Lundgren, Centro, Paulista - PE",
    telefone: "(81) 3184-7075"
  },
  {
    nome: "7ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Surubim",
    endereco: "Rua Santos Dumont, 65, Centro, Surubim - PE",
    telefone: "(81) 3624-1983"
  },
  {
    nome: "8ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Goiana",
    endereco: "Loteamento Carvalho Feitosa, 18, Centro, Goiana - PE",
    telefone: "(81) 3626-8513"
  },
  {
    nome: "9ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Garanhuns",
    endereco: "Avenida Frei Caneca, 460, Centro, Garanhuns - PE",
    telefone: "(87) 3761-8510"
  },
  {
    nome: "10ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Vitória de Santo Antão",
    endereco: "Rua Ismael de Andrade, 152, Matriz, Vitória de Santo Antão - PE",
    telefone: "(81) 3526-8789"
  },
  {
    nome: "13ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Afogados da Ingazeira",
    endereco: "Rua Valdevino José Praxedes, s/n, Manoela Valadares, Afogados da Ingazeira - PE",
    telefone: "(87) 3838-8713"
  },
  {
    nome: "14ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Cabo de Santo Agostinho",
    endereco: "BR-101, s/n, Pontezinha, Cabo de Santo Agostinho - PE",
    telefone: "(81) 3184-3414"
  },
  {
    nome: "15ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Olinda",
    endereco: "Avenida Governador Carlos de Lima Cavalcanti, Olinda - PE",
    telefone: "(81) 3182-5402"
  },
  {
    nome: "16ª Delegacia Especializada de Atendimento à Mulher",
    categoria: "delegacia",
    municipio: "Palmares",
    endereco: "Avenida José Américo de Miranda, s/n, Santa Rosa, Palmares - PE",
    telefone: "(81) 3661-8495"
  },

  // CENTROS DE REFERÊNCIA / CEAMS
  {
    nome: "Centro de Referência da Mulher Maristela Just",
    categoria: "centro",
    municipio: "Jaboatão dos Guararapes",
    endereco: "Rua Almirante Antônio Farias, 664, Piedade, Jaboatão dos Guararapes - PE",
    telefone: "(81) 9946-46253"
  },
  {
    nome: "Centro de Referência da Mulher Andrelina Lopes",
    categoria: "centro",
    municipio: "Camaragibe",
    endereco: "Rua Sertanópolis, 138, Timbi, Camaragibe - PE",
    telefone: "(81) 99945-1677"
  },
  {
    nome: "Centro de Referência Brites de Albuquerque",
    categoria: "centro",
    municipio: "Igarassu",
    endereco: "Avenida Joaquim Nabuco, 122, Centro, Igarassu - PE",
    telefone: "(81) 99462-2067"
  },
  {
    nome: "Centro de Referência Maria Purcina",
    categoria: "centro",
    municipio: "Cabo de Santo Agostinho",
    endereco: "Rua Dr. Washington Luiz, 27, Centro, Cabo de Santo Agostinho - PE",
    telefone: "(81) 98543-0782"
  },
  {
    nome: "Centro de Referência Eudina Sobral",
    categoria: "centro",
    municipio: "Cabo de Santo Agostinho",
    endereco: "Avenida Prefeito Diomedes, 461, Ponte dos Carvalhos, Cabo de Santo Agostinho - PE",
    telefone: "(81) 98403-6410"
  },
  {
    nome: "Centro de Referência Aqualtune",
    categoria: "centro",
    municipio: "Paulista",
    endereco: "Praça João Pessoa, s/n, Centro, Paulista - PE",
    telefone: "(81) 99912-0337"
  },
  {
    nome: "Centro de Referência Clarice Lispector",
    categoria: "centro",
    municipio: "Recife",
    endereco: "Rua Dr. Silva Ferreira, 122, Santo Amaro, Recife - PE",
    telefone: "(81) 99488-6138"
  },
  {
    nome: "Centro de Referência Eliane Brito de Barros",
    categoria: "centro",
    municipio: "Nazaré da Mata",
    endereco: "Rua Dom Carlos Coelho, 39, Nazaré da Mata - PE",
    telefone: "(81) 99925-15773"
  },
  {
    nome: "CEAM Casa Lisbela - Professora Eunice Xavier",
    categoria: "centro",
    municipio: "Vitória de Santo Antão",
    endereco: "Rua Ismael de Andrade, 152A, Matriz, Vitória de Santo Antão - PE",
    telefone: "(81) 99596-0575"
  },
  {
    nome: "CEAM Maria do Carmo Costa Bezerra",
    categoria: "centro",
    municipio: "Palmares",
    endereco: "Rua Gerôncio Borba, 187, Cohab, Palmares - PE",
    telefone: "(81) 99605-4957"
  },
  {
    nome: "CEAM Izabel Oliveira Cravo",
    categoria: "centro",
    municipio: "Ribeirão",
    endereco: "Rua Maria Beatriz M. Pontes, 1343, SESI, Ribeirão - PE",
    telefone: "(81) 98304-0603"
  },
  {
    nome: "CEAM de Sirinhaém",
    categoria: "centro",
    municipio: "Sirinhaém",
    endereco: "Rua Sebastião Chaves, 63, Centro, Sirinhaém - PE",
    telefone: "(81) 99247-7641"
  },
  {
    nome: "Centro de Referência da Mulher Maria Neuma de Lira",
    categoria: "centro",
    municipio: "Caruaru",
    endereco: "Avenida Portugal, 168, Universitário, Caruaru - PE",
    telefone: "(81) 98384-4310"
  },
  {
    nome: "Centro de Referência da Mulher Ana Lúcia Beserra Pereira",
    categoria: "centro",
    municipio: "Gravatá",
    endereco: "Rua Estevam Câmara, 241, Centro, Gravatá - PE",
    telefone: "(81) 3299-1899"
  },
  {
    nome: "Centro de Atendimento à Mulher Quitéria Celestino Pontes",
    categoria: "centro",
    municipio: "Agrestina",
    endereco: "Rua Cônego Júlio Cabral, 126, Centro, Agrestina - PE",
    telefone: "(81) 99822-5090"
  },
  {
    nome: "Centro de Atendimento à Mulher Maze Lopes",
    categoria: "centro",
    municipio: "Pesqueira",
    endereco: "Rua Laércio Valença, 26, Centro, Pesqueira - PE",
    telefone: "(87) 98153-0958"
  },
  {
    nome: "CEAM Nena Marinho",
    categoria: "centro",
    municipio: "Belo Jardim",
    endereco: "Avenida Adjar Maciel, s/n, Centro, Belo Jardim - PE",
    telefone: "(81) 99433-9337"
  },
  {
    nome: "Centro de Referência Joana Beatriz de Lima Silva",
    categoria: "centro",
    municipio: "Garanhuns",
    endereco: "Avenida Simoa Gomes, 16, Heliópolis, Garanhuns - PE",
    telefone: "(87) 92000-9193"
  },
  {
    nome: "Centro de Referência da Mulher de Buíque",
    categoria: "centro",
    municipio: "Buíque",
    endereco: "Praça Nanô Camelo, 89, Centro, Buíque - PE",
    telefone: "(87) 99212-9538"
  },
  {
    nome: "Centro Especializado de Atendimento à Mulher Lucila Medeiros",
    categoria: "centro",
    municipio: "Surubim",
    endereco: "Rua Manoel Aureliano Mateus, 203, Cabaceira, Surubim - PE",
    telefone: "(81) 99472-5157"
  },
  {
    nome: "Casa Josefa Mendes de Barros",
    categoria: "centro",
    municipio: "Santa Cruz do Capibaribe",
    endereco: "Avenida José Moraes da Silva, 230, Centro, Santa Cruz do Capibaribe - PE",
    telefone: "(81) 97343-9299"
  },
  {
    nome: "CEAM Paula Maria do Paraíso",
    categoria: "centro",
    municipio: "Toritama",
    endereco: "Rua João Chagas, 65, Centro, Toritama - PE",
    telefone: "(81) 99130-9834"
  },
  {
    nome: "CEAM Dona Liquinha",
    categoria: "centro",
    municipio: "Vertente do Lério",
    endereco: "Avenida Capitão Luiz de França, 115, Vertente do Lério - PE",
    telefone: ""
  },
  {
    nome: "CEAM Francisquinha Godoy",
    categoria: "centro",
    municipio: "Serra Talhada",
    endereco: "Vila Ferroviária, 1702, São Cristóvão, Serra Talhada - PE",
    telefone: "(87) 99610-5152"
  },
  {
    nome: "Centro Especializado de Atendimento à Mulher Valdete Cézar",
    categoria: "centro",
    municipio: "Petrolina",
    endereco: "Avenida Gilberto Freire, s/n, Vila Mocó, Petrolina - PE",
    telefone: "(87) 99165-1803"
  },
  {
    nome: "Centro Especializado de Atendimento à Mulher de Lagoa Grande",
    categoria: "centro",
    municipio: "Lagoa Grande",
    endereco: "Rua Agamenon Magalhães, Bairro Chafariz, Lagoa Grande - PE",
    telefone: "(87) 98828-4735"
  }
];

// 2. ELEMENTOS DA PÁGINA

const filtroCategoria = document.getElementById("filtroCategoria");
const filtroMunicipio = document.getElementById("filtroMunicipio");
const statusApoio = document.getElementById("statusApoio");
const listaLocais = document.getElementById("listaLocais");
const quantidadeLocais = document.getElementById("quantidadeLocais");
const btnAtualizar = document.getElementById("btnAtualizarLocais");
const btnLocalizacao = document.getElementById("btnMinhaLocalizacao");

// 3. MAPA

let mapa = null;
let marcadorUsuario = null;

if (document.getElementById("mapaPernambuco") && typeof L !== "undefined") {
  mapa = L.map("mapaPernambuco").setView([-8.3, -37.8], 7);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapa);
}

// 4. PROTEÇÃO DE TEXTO

function textoSeguro(valor) {
  return String(valor || "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caractere]);
}

// 5. PREENCHER AUTOMATICAMENTE OS MUNICÍPIOS

function preencherMunicipios() {
  if (!filtroMunicipio) return;

  const municipioSelecionado = filtroMunicipio.value;

  const municipios = [...new Set(
    todosLocais.map(local => local.municipio)
  )].sort((a, b) => a.localeCompare(b, "pt-BR"));

  filtroMunicipio.innerHTML =
    '<option value="todos">Todos os municípios</option>';

  municipios.forEach(municipio => {
    const opcao = document.createElement("option");
    opcao.value = municipio;
    opcao.textContent = municipio;
    filtroMunicipio.appendChild(opcao);
  });

  if (municipios.includes(municipioSelecionado)) {
    filtroMunicipio.value = municipioSelecionado;
  }
}

// 6. FILTRAR E MOSTRAR OS SERVIÇOS

function desenharLocais() {
  if (!listaLocais || !quantidadeLocais) return;

  const categoriaEscolhida = filtroCategoria
    ? filtroCategoria.value
    : "todos";

  const municipioEscolhido = filtroMunicipio
    ? filtroMunicipio.value
    : "todos";

  const filtrados = todosLocais.filter(local => {
    const categoriaOk =
      categoriaEscolhida === "todos" ||
      local.categoria === categoriaEscolhida;

    const municipioOk =
      municipioEscolhido === "todos" ||
      local.municipio === municipioEscolhido;

    return categoriaOk && municipioOk;
  });

  listaLocais.innerHTML = "";

  filtrados.forEach(local => {
    const item = document.createElement("li");

    const enderecoBusca = encodeURIComponent(
      `${local.endereco}, Brasil`
    );

    const linkMapa =
      `https://www.google.com/maps/search/?api=1&query=${enderecoBusca}`;

    const nomeCategoria =
      local.categoria === "delegacia"
        ? "Delegacia da Mulher"
        : "Centro de Referência / CEAM";

    item.innerHTML = `
      <h4>${textoSeguro(local.nome)}</h4>

      <span class="tag-categoria">
        ${nomeCategoria}
      </span>

      <p>
        <strong>Município:</strong>
        ${textoSeguro(local.municipio)}
      </p>

      <p>
        <strong>Endereço:</strong>
        ${textoSeguro(local.endereco)}
      </p>

      ${
        local.telefone
          ? `<p><strong>Telefone:</strong> ${textoSeguro(local.telefone)}</p>`
          : ""
      }

      <p>
        <a href="${linkMapa}" target="_blank" rel="noopener noreferrer">
          Abrir endereço no Google Maps
        </a>
      </p>
    `;

    listaLocais.appendChild(item);
  });

  quantidadeLocais.textContent =
    `${filtrados.length} ${filtrados.length === 1 ? "local" : "locais"}`;

  if (filtrados.length === 0) {
    listaLocais.innerHTML = `
      <li>
        Nenhum serviço encontrado para os filtros selecionados.
      </li>
    `;
  }

  if (statusApoio) {
    statusApoio.textContent =
      `${filtrados.length} serviços exibidos.`;
  }
}

// 7. FILTROS

if (filtroCategoria) {
  filtroCategoria.addEventListener("change", desenharLocais);
}

if (filtroMunicipio) {
  filtroMunicipio.addEventListener("change", desenharLocais);
}

// 8. BOTÃO ATUALIZAR

if (btnAtualizar) {
  btnAtualizar.addEventListener("click", desenharLocais);
}

// 9. USAR MINHA LOCALIZAÇÃO

if (btnLocalizacao) {
  btnLocalizacao.addEventListener("click", () => {
    if (!navigator.geolocation) {
      if (statusApoio) {
        statusApoio.textContent =
          "Seu navegador não permite obter a localização.";
      }
      return;
    }

    if (statusApoio) {
      statusApoio.textContent =
        "Solicitando sua localização...";
    }

    navigator.geolocation.getCurrentPosition(
      posicao => {
        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;

        if (mapa) {
          mapa.setView([latitude, longitude], 13);

          if (marcadorUsuario) {
            mapa.removeLayer(marcadorUsuario);
          }

          marcadorUsuario = L.circleMarker(
            [latitude, longitude],
            {
              radius: 8,
              color: "#ffffff",
              weight: 2,
              fillColor: "#1a73e8",
              fillOpacity: 1
            }
          ).addTo(mapa);

          marcadorUsuario.bindPopup("Você está aqui").openPopup();
        }

        if (statusApoio) {
          statusApoio.textContent =
            "Mapa centralizado na sua localização.";
        }
      },
      () => {
        if (statusApoio) {
          statusApoio.textContent =
            "Não foi possível obter sua localização. Verifique a permissão do navegador.";
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

// 10. INICIALIZAÇÃO

preencherMunicipios();
desenharLocais();

if (statusApoio) {
  statusApoio.textContent =
    `${todosLocais.length} serviços cadastrados em Pernambuco.`;
}

// 11. RODAPÉ COM FONTES E REFERÊNCIAS

function inserirFontesMapa() {
  if (document.getElementById("fontesMapaApoio")) return;

  const rodape = document.createElement("footer");

  rodape.id = "fontesMapaApoio";
  rodape.className = "rodape rodape-apoio";

  rodape.innerHTML = `
    <div class="container-rodape">

      <div class="info-copyright">
        <h3>Mandacaru</h3>

        <p>
          &copy; 2026 Mandacaru.
          Todos os direitos reservados.
        </p>

        <p class="texto-rodape">
          Apoio e proteção ao alcance de um toque.
        </p>
      </div>

      <div class="integrantes">
        <h3>Integrantes do Projeto</h3>

        <ul class="lista-integrantes">
          <li>Emilly Maria</li>
          <li>Marcelo José</li>
          <li>Sidney Barroso</li>
        </ul>
      </div>

      <div class="fontes-rodape">
        <h3>Fontes e referências</h3>

        <p>
          Os dados dos pontos de atendimento foram reunidos
          a partir de fontes públicas e oficiais.
        </p>

        <ul>
          <li>
            <a href="https://www.openstreetmap.org/"
               target="_blank"
               rel="noopener noreferrer">
              OpenStreetMap
            </a>
            — dados cartográficos.
          </li>

          <li>
            <a href="https://nominatim.org/"
               target="_blank"
               rel="noopener noreferrer">
              Nominatim
            </a>
            — localização dos endereços.
          </li>

          <li>
            <a href="https://transparencia.pe.gov.br/gestao-estadual/informacao-protecao-e-atendimento-as-mulheres/protecao-e-atendimento-as-mulheres/"
               target="_blank"
               rel="noopener noreferrer">
              Portal da Transparência de Pernambuco
            </a>
            — centros e serviços de atendimento.
          </li>

          <li>
            <a href="https://endereco.policiacivil.pe.gov.br/CDT/openform.do?action=openform&formID=21&sys=CDT"
               target="_blank"
               rel="noopener noreferrer">
              Polícia Civil de Pernambuco
            </a>
            — endereços e telefones das delegacias.
          </li>

          <li>
            <a href="https://www.openstreetmap.org/copyright"
               target="_blank"
               rel="noopener noreferrer">
              Créditos do OpenStreetMap
            </a>
            — direitos autorais e atribuição.
          </li>
        </ul>
      </div>

    </div>

    <div class="aviso-fontes-rodape">
      <strong>Importante:</strong>
      alguns pinos podem indicar apenas uma localização aproximada
      dentro do município, quando o endereço completo não é encontrado.
      Nesses casos, o pino não representa necessariamente o endereço
      exato do atendimento.

      O status de funcionamento é calculado com base nos horários
      cadastrados. Quando a fonte não informa os dias da semana,
      segunda a sexta são usados como referência; o funcionamento
      aos fins de semana aparece como não informado.
      Serviços sem horário cadastrado não recebem status de aberto
      ou fechado.
    </div>
  `;

  document.body.appendChild(rodape);
}
