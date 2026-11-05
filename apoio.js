
// ==============================================
// MANDACARU - LOCAIS DE APOIO
// Cadastro manual baseado em fontes oficiais
// ==============================================

// Mapa de Pernambuco
const mapa = L.map('mapaPernambuco').setView([-8.3, -37.8], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(mapa);

// Camada para mostrar a localização da pessoa usuária
let marcadorUsuario = null;

// Elementos da página
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroMunicipio = document.getElementById('filtroMunicipio');
const statusApoio = document.getElementById('statusApoio');
const listaLocais = document.getElementById('listaLocais');
const quantidadeLocais = document.getElementById('quantidadeLocais');
const btnAtualizar = document.getElementById('btnAtualizarLocais');
const btnLocalizacao = document.getElementById('btnMinhaLocalizacao');

// ==============================================
// LISTA DE SERVIÇOS CONFIRMADOS EM FONTES OFICIAIS
// Não foram utilizadas coordenadas aproximadas.
// ==============================================

const todosLocais = [

  // DELEGACIAS DA MULHER

  {
    nome: '1ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Recife',
    endereco: 'Rua André Rebouças, 136, Rosarinho, Recife - PE',
    telefone: '(81) 3184-3356 / (81) 3184-3352',
    fonte: 'policia'
  },
  {
    nome: '2ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Jaboatão dos Guararapes',
    endereco: 'Estrada da Batalha, s/n, Prazeres, Jaboatão dos Guararapes - PE',
    telefone: '(81) 3184-3445 / (81) 3184-3446 / (81) 3184-3444',
    fonte: 'policia'
  },
  {
    nome: '3ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Petrolina',
    endereco: 'Rua Castro Alves, 57, Centro, Petrolina - PE',
    telefone: '(87) 3866-6625 / (87) 3866-6627 / (87) 3866-6629',
    fonte: 'policia'
  },
  {
    nome: '4ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Caruaru',
    endereco: 'Avenida Portugal, 155, Universitário, Caruaru - PE',
    telefone: '(81) 3719-9107 / (81) 3719-9108 / (81) 3719-9106',
    fonte: 'policia'
  },
  {
    nome: '5ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Paulista',
    endereco: 'Rua do Cajueiro, s/n, Praça Frederico Lundgren, Centro, Paulista - PE',
    telefone: '(81) 3184-7072 / (81) 3184-7075',
    fonte: 'policia'
  },
  {
    nome: '7ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Surubim',
    endereco: 'Rua Santos Dumont, 65, Centro, Surubim - PE',
    telefone: '(81) 3624-1987 / (81) 3624-1983',
    fonte: 'policia'
  },
  {
    nome: '8ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Goiana',
    endereco: 'Loteamento Carvalho Feitosa, 18, Centro, Goiana - PE',
    telefone: '(81) 3626-8513 / (81) 3626-8514',
    fonte: 'policia'
  },
  {
    nome: '9ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Garanhuns',
    endereco: 'Avenida Frei Caneca, 460, Centro, Garanhuns - PE',
    telefone: '(87) 3761-8510 / (87) 3761-8509',
    fonte: 'policia'
  },
  {
    nome: '10ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Vitória de Santo Antão',
    endereco: 'Rua Ismael de Andrade, 152, Matriz, Vitória de Santo Antão - PE',
    telefone: '(81) 3526-8789 / (81) 3526-8788',
    fonte: 'policia'
  },
  {
    nome: '13ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Afogados da Ingazeira',
    endereco: 'Rua Valdevino José Praxedes, s/n, Manoela Valadares, Afogados da Ingazeira - PE',
    telefone: '(87) 3838-8713',
    fonte: 'policia'
  },
  {
    nome: '14ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Cabo de Santo Agostinho',
    endereco: 'BR-101, s/n, Pontezinha, Cabo de Santo Agostinho - PE',
    telefone: '(81) 3184-3414 / (81) 3184-3413',
    fonte: 'policia'
  },
  {
    nome: '15ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Olinda',
    endereco: 'Avenida Governador Carlos de Lima Cavalcanti, 2405, Casa Caiada, Olinda - PE',
    telefone: '(81) 3182-5402 / (81) 3182-5403',
    fonte: 'policia'
  },
  {
    nome: '16ª Delegacia Especializada de Atendimento à Mulher',
    categoria: 'delegacia',
    municipio: 'Palmares',
    endereco: 'Avenida José Américo de Miranda, s/n, Santa Rosa, Palmares - PE',
    telefone: '(81) 3661-8495 / (81) 3661-8496',
    fonte: 'policia'
  },

  // CENTROS DE REFERÊNCIA / CEAM

  {
    nome: 'Centro de Referência da Mulher Maristela Just',
    categoria: 'centro',
    municipio: 'Jaboatão dos Guararapes',
    endereco: 'Rua Almirante Antônio Farias, 664, Piedade, Jaboatão dos Guararapes - PE',
    telefone: '(81) 9946-46253',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Andrelina Lopes',
    categoria: 'centro',
    municipio: 'Camaragibe',
    endereco: 'Rua Sertanópolis, 138, Timbi, Camaragibe - PE',
    telefone: '(81) 99945-1677 / (81) 99697-3654',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência Brites de Albuquerque',
    categoria: 'centro',
    municipio: 'Igarassu',
    endereco: 'Avenida Joaquim Nabuco, 122, Centro, Igarassu - PE',
    telefone: '(81) 99462-2067 / (81) 99128-8464',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria Purcina',
    categoria: 'centro',
    municipio: 'Cabo de Santo Agostinho',
    endereco: 'Rua Doutor Washington Luís, 27, Centro, Cabo de Santo Agostinho - PE',
    telefone: '(81) 98543-0782 / (81) 98379-8468',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Érica Francisca da Silva',
    categoria: 'centro',
    municipio: 'Cabo de Santo Agostinho',
    endereco: 'Rua Amauri Miranda, 13-65, Praia de Gaibu, Cabo de Santo Agostinho - PE',
    telefone: '(81) 99610-0180 / 0800 281 8187',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria de Lourdes Alves Bernardo',
    categoria: 'centro',
    municipio: 'Moreno',
    endereco: 'Rua Conde da Boa Vista, 103, Centro, Moreno - PE',
    telefone: '(81) 99810-6418 / (81) 98789-1463',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência Eudina Sobral',
    categoria: 'centro',
    municipio: 'Cabo de Santo Agostinho',
    endereco: 'Avenida Nossa Senhora do Bom Conselho, 316, Ponte dos Carvalhos, Cabo de Santo Agostinho - PE',
    telefone: '(81) 98403-6410 / (81) 98710-1527',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Simone Menezes',
    categoria: 'centro',
    municipio: 'Jaboatão dos Guararapes',
    endereco: 'Rua Domingos Sávio, 119, Piedade, Jaboatão dos Guararapes - PE',
    telefone: '(81) 99535-0366',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher CEAM Florescer',
    categoria: 'centro',
    municipio: 'Araçoiaba',
    endereco: 'Avenida João Pessoa Guerra, Centro, Araçoiaba - PE',
    telefone: '(81) 3543-8079 / (81) 9400-9491',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Aqualtune',
    categoria: 'centro',
    municipio: 'Paulista',
    endereco: 'Praça Agamenon Magalhães, s/n, Centro, Paulista - PE',
    telefone: '(81) 99912-0337',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Clarice Lispector',
    categoria: 'centro',
    municipio: 'Recife',
    endereco: 'Rua Doutor Silva Ferreira, 122, Santo Amaro, Recife - PE',
    telefone: '(81) 99488-6138 / (81) 3355-3080',
    fonte: 'governo'
  },
  {
    nome: 'Serviço Especializado da Rede Clarice Lispector',
    categoria: 'centro',
    municipio: 'Recife',
    endereco: 'Avenida Recife, 700, Areias, Recife - PE; Rua Padre Lemos, 675, Casa Amarela, Recife - PE',
    telefone: '(81) 3223-2311 / (81) 99941-7059',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado Márcia Dangremon',
    categoria: 'centro',
    municipio: 'Olinda',
    endereco: 'Rua Maria Ramos, 131, Bairro Novo, Olinda - PE',
    telefone: '(81) 99188-3125 / (81) 99750-4895 / (81) 3429-2707',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado Dona Amarina',
    categoria: 'centro',
    municipio: 'Ipojuca',
    endereco: 'Rua Hilda da Costa Monteiro, 94, Centro, Ipojuca - PE',
    telefone: '(81) 3551-2505 / 0800 081 5434',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher',
    categoria: 'centro',
    municipio: 'São Lourenço da Mata',
    endereco: 'Avenida Prefeito Henrique Mafra, 520, Parque Capibaribe, São Lourenço da Mata - PE',
    telefone: '(81) 98891-1488 / (81) 99885-9138',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência Eliane Brito de Barros',
    categoria: 'centro',
    municipio: 'Nazaré da Mata',
    endereco: 'Rua Dom Carlos Coelho, 39, Nazaré da Mata - PE',
    telefone: '(81) 99925-15773 / (81) 99789-7562',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Malba Lúcia Rabelo de Souza',
    categoria: 'centro',
    municipio: 'Condado',
    endereco: 'Avenida 7 de Setembro, próximo à Matriz, Condado - PE',
    telefone: '(81) 99819-7071',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Eloina Maria da Silva',
    categoria: 'centro',
    municipio: 'Paudalho',
    endereco: 'Rua Doutor Antônio Montenegro, 59, Centro, Paudalho - PE',
    telefone: '(81) 99523-0150 / (81) 99898-0606',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Siméia da Silva Nunes',
    categoria: 'centro',
    municipio: 'Carpina',
    endereco: 'Avenida Rádio Club, 650, Cajá, Carpina - PE',
    telefone: '(81) 99967-6190',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Norma Barbosa Brito de Galvão Cavalcanti',
    categoria: 'centro',
    municipio: 'Timbaúba',
    endereco: 'Rua Maria do Carmo L. de Oliveira, s/n, Timbaúba - PE',
    telefone: '(81) 99263-1704',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher de Vitória de Santo Antão',
    categoria: 'centro',
    municipio: 'Vitória de Santo Antão',
    endereco: 'Praça Padre Félix Barreto, 227, Livramento, Vitória de Santo Antão - PE',
    telefone: '(81) 99596-0575',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher de Palmares',
    categoria: 'centro',
    municipio: 'Palmares',
    endereco: 'Rua Diário de Pernambuco, 334-A, Cohab I, Palmares - PE',
    telefone: '(81) 99605-4957',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Joana Beatriz Lima e Silva',
    categoria: 'centro',
    municipio: 'Sirinhaém',
    endereco: 'Rua Olímpio Machado, 66, Centro, Sirinhaém - PE',
    telefone: '(81) 99247-7641',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Joseane Maria da Silva',
    categoria: 'centro',
    municipio: 'Barreiros',
    endereco: 'Rua Marechal, s/n, Barreiros - PE',
    telefone: '(81) 99252-6182 / (81) 98846-9520',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria Neuma de Silva Lira',
    categoria: 'centro',
    municipio: 'Caruaru',
    endereco: 'Avenida Portugal, 1185, Universitário, Caruaru - PE',
    telefone: '(81) 98384-4310 / (81) 99422-1862',
    fonte: 'governo'
  },
  {
    nome: 'Casa da Mulher',
    categoria: 'centro',
    municipio: 'Bezerros',
    endereco: 'Rua Doutor Puço Viana, 61, São Sebastião, Bezerros - PE',
    telefone: '(81) 99494-8075 / (81) 99458-0909',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Atendimento à Mulher Ana Lúcia Pereira Beserra',
    categoria: 'centro',
    municipio: 'Gravatá',
    endereco: 'Rua Coronel Estevam Câmara, 241, Centro, Gravatá - PE',
    telefone: '(81) 3299-1899 / (81) 99548-1318',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Atendimento à Mulher Quitéria Celestino Pontes',
    categoria: 'centro',
    municipio: 'Agrestina',
    endereco: 'Rua Cônego Júlio Cabral, 126, Centro, Agrestina - PE',
    telefone: '(81) 99822-5090',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher Maze Lopes',
    categoria: 'centro',
    municipio: 'Pesqueira',
    endereco: 'Rua Laércio Valença, 26, Centro, Pesqueira - PE',
    telefone: '(87) 98153-0958',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher Nena Marinho',
    categoria: 'centro',
    municipio: 'Belo Jardim',
    endereco: 'Rua Coronel Adjar Maciel, 26, Centro, Belo Jardim - PE',
    telefone: '(81) 99433-9337',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Joana Beatriz Lima e Silva',
    categoria: 'centro',
    municipio: 'Garanhuns',
    endereco: 'Avenida Simoa Gomes, 16, Heliópolis, Garanhuns - PE',
    telefone: '(87) 92000-9193',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Dayana Guerra Moreira',
    categoria: 'centro',
    municipio: 'Buíque',
    endereco: 'Praça Nanô Correia, 83, Centro, Buíque - PE',
    telefone: '(87) 99212-9538',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Josefa Bezerra de Lima',
    categoria: 'centro',
    municipio: 'Custódia',
    endereco: 'Travessa Heleno Aleixo, 007, Custódia - PE',
    telefone: '(81) 99653-8252 / (87) 99936-1673',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Ellen Suzanne',
    categoria: 'centro',
    municipio: 'Arcoverde',
    endereco: 'Rua Padre Roma, 202, Arcoverde - PE',
    telefone: '(87) 99155-4106 / (87) 99154-8872',
    fonte: 'governo'
  },
  {
    nome: 'CEAM Francisquinha Godoy',
    categoria: 'centro',
    municipio: 'Serra Talhada',
    endereco: 'Rua Vila Ferroviária, 1702, São Cristóvão, Serra Talhada - PE',
    telefone: '(87) 99610-5152',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Liliane dos Santos',
    categoria: 'centro',
    municipio: 'Afogados da Ingazeira',
    endereco: 'Avenida Artur Padilha, 767, Centro, Afogados da Ingazeira - PE',
    telefone: '(87) 99610-5152 / (87) 99921-0108',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria José Pereira de Brito',
    categoria: 'centro',
    municipio: 'Tabira',
    endereco: 'Rua Albertina Pires Xavier, 281, Tabira - PE',
    telefone: '0800 281 8187 / (81) 98494-0530',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Mércia Roriz',
    categoria: 'centro',
    municipio: 'Belém do São Francisco',
    endereco: 'Rua Capitão João Alves, 49, Centro, Belém do São Francisco - PE',
    telefone: '(81) 98866-5657',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria de Lima Ramos',
    categoria: 'centro',
    municipio: 'Salgueiro',
    endereco: 'Avenida Aurora de Carvalho Rosa, 1820, Granja Aurora, Salgueiro - PE',
    telefone: '(87) 98149-2583 / (87) 98874-1399',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Cícera Leal',
    categoria: 'centro',
    municipio: 'Serrita',
    endereco: 'Avenida Maviael de França Sampaio, Conjunto Habitacional Cecílio, Serrita - PE',
    telefone: '(87) 99626-5484 / (87) 93882-1156',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Aucirlene Lacerda Carlos',
    categoria: 'centro',
    municipio: 'Araripina',
    endereco: 'Rua Eduardo Rodovalho, 55, Centro, Araripina - PE',
    telefone: '(87) 99139-2107 / (87) 99136-6656',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Neli Alzira de Araújo Miroro',
    categoria: 'centro',
    municipio: 'Trindade',
    endereco: 'Rua Presidente Dutra, 414, Trindade - PE',
    telefone: '(87) 99957-2457 / (87) 99632-7452',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher de Granito',
    categoria: 'centro',
    municipio: 'Granito',
    endereco: 'Avenida José Saraiva Xavier, 90, Centro, Granito - PE',
    telefone: '(87) 3880-1156 / (87) 99634-8727',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher Valdete Cézar',
    categoria: 'centro',
    municipio: 'Petrolina',
    endereco: 'Rua Projetada, s/n, Vila Mocó, Petrolina - PE',
    telefone: '(87) 99165-1803 / (87) 3867-3516',
    fonte: 'governo'
  },
  {
    nome: 'Centro Especializado de Atendimento à Mulher de Lagoa Grande',
    categoria: 'centro',
    municipio: 'Lagoa Grande',
    endereco: 'Rua Agamenon Magalhães, s/n, Chafariz, Lagoa Grande - PE',
    telefone: '(87) 98828-4735',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Fernanda Cavalcante',
    categoria: 'centro',
    municipio: 'Dormentes',
    endereco: 'Rodovia PE-635, s/n, Dormentes - PE',
    telefone: '(87) 98141-4603',
    fonte: 'governo'
  },
  {
    nome: 'Centro de Referência da Mulher Maria Cariri',
    categoria: 'centro',
    municipio: 'Santa Maria da Boa Vista',
    endereco: 'Rua Doutor Souza Filho, 206, Santa Maria da Boa Vista - PE',
    telefone: '(87) 99999-9448',
    fonte: 'governo'
  }
];

// ==============================================
// FUNÇÕES AUXILIARES
// ==============================================

function textoSeguro(valor) {
  return String(valor || '').replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[caractere]);
}

function nomeCategoria(categoria) {
  return categoria === 'delegacia'
    ? 'Delegacia da Mulher (DEAM)'
    : 'Centro de Referência / CEAM';
}

function linkMapa(endereco) {
  return 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(endereco);
}

function linkFonte(fonte) {
  if (fonte === 'policia') {
    return 'https://endereco.policiacivil.pe.gov.br/CDT/openform.do?action=openform&formID=21&sys=CDT';
  }

  return 'https://transparencia.pe.gov.br/gestao-estadual/informacao-protecao-e-atendimento-as-mulheres/protecao-e-atendimento-as-mulheres/';
}

// ==============================================
// PREENCHER FILTRO DE MUNICÍPIOS
// ==============================================

function preencherMunicipios() {
  const municipios = [
    ...new Set(todosLocais.map(local => local.municipio))
  ].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  filtroMunicipio.innerHTML =
    '<option value="todos">Todos os municípios</option>';

  municipios.forEach(municipio => {
    const opcao = document.createElement('option');
    opcao.value = municipio;
    opcao.textContent = municipio;
    filtroMunicipio.appendChild(opcao);
  });
}

// ==============================================
// MOSTRAR SERVIÇOS NA LISTA
// ==============================================

function desenharLocais() {
  listaLocais.innerHTML = '';

  const categoriaEscolhida = filtroCategoria.value;
  const municipioEscolhido = filtroMunicipio.value;

  const filtrados = todosLocais.filter(local => {
    const categoriaOk =
      categoriaEscolhida === 'todos' ||
      local.categoria === categoriaEscolhida;

    const municipioOk =
      municipioEscolhido === 'todos' ||
      local.municipio === municipioEscolhido;

    return categoriaOk && municipioOk;
  });

  filtrados.forEach(local => {
    const item = document.createElement('li');

    const categoria = nomeCategoria(local.categoria);
    const mapaUrl = linkMapa(local.endereco);
    const fonteUrl = linkFonte(local.fonte);

    item.innerHTML = `
      <h4>${textoSeguro(local.nome)}</h4>

      <span class="tag-categoria">
        ${textoSeguro(categoria)}
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
          : ''
      }

      <p>
        <a href="${mapaUrl}" target="_blank" rel="noopener">
          Ver no mapa
        </a>
        ·
        <a href="${fonteUrl}" target="_blank" rel="noopener">
          Fonte oficial
        </a>
      </p>
    `;

    listaLocais.appendChild(item);
  });

  quantidadeLocais.textContent =
    `${filtrados.length} ${filtrados.length === 1 ? 'local' : 'locais'}`;

  if (filtrados.length === 0) {
    listaLocais.innerHTML = `
      <li>
        Nenhum serviço encontrado com os filtros selecionados.
      </li>
    `;
  }

  statusApoio.textContent =
    `${filtrados.length} serviços exibidos. Selecione "Ver no mapa" para consultar o endereço de cada unidade.`;
}

// ==============================================
// BOTÃO DE LOCALIZAÇÃO
// ==============================================

function usarMinhaLocalizacao() {
  if (!navigator.geolocation) {
    statusApoio.textContent =
      'Seu navegador não oferece suporte à localização.';
    return;
  }

  statusApoio.textContent = 'Obtendo sua localização...';

  navigator.geolocation.getCurrentPosition(
    posicao => {
      const latitude = posicao.coords.latitude;
      const longitude = posicao.coords.longitude;

      if (marcadorUsuario) {
        mapa.removeLayer(marcadorUsuario);
      }

      marcadorUsuario = L.marker([latitude, longitude])
        .addTo(mapa)
        .bindPopup('Você está aqui.')
        .openPopup();

      mapa.setView([latitude, longitude], 14);

      statusApoio.textContent =
        'Sua localização foi exibida no mapa.';
    },

    () => {
      statusApoio.textContent =
        'Não foi possível acessar sua localização. Verifique a permissão do navegador.';
    }
  );
}

// ==============================================
// EVENTOS
// ==============================================

filtroCategoria.addEventListener('change', desenharLocais);
filtroMunicipio.addEventListener('change', desenharLocais);

btnAtualizar.addEventListener('click', desenharLocais);
btnLocalizacao.addEventListener('click', usarMinhaLocalizacao);

// ==============================================
// INICIALIZAÇÃO
// ==============================================

preencherMunicipios();
desenharLocais();

