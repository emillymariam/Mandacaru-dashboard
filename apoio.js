const todosDias = (a, b) => Array(7).fill([a, b]);

/* lat/lng aproximados: confira no Passo 7 */
const LOCAIS_APOIO = [
  {
    nome: 'Centro de Referência Clarice Lispector',
    endereco: 'Rua Doutor Silva Ferreira, 122, Santo Amaro, Recife',
    horarioTexto: '24 horas', h24: true,
    tel: '(81) 3355-9495',
    lat: -8.0525, lng: -34.8825
  },
  {
    nome: 'SER Clarice Lispector Zona Sul',
    endereco: 'Avenida Recife, 700, Areias, Recife',
    horarioTexto: 'Todos os dias, 7h às 19h',
    faixas: todosDias(7, 19),
    tel: '(81) 3355-9823',
    lat: -8.0870, lng: -34.9130
  },
  {
    nome: 'Centro Marta Almeida (Direitos da Mulher)',
    endereco: 'Rua do Bom Jesus, 147, Bairro do Recife, Recife',
    horarioTexto: 'Ter a sáb 8h–17h; dom 10h–18h',
    faixas: [[10, 18], null, [8, 17], [8, 17], [8, 17], [8, 17], [8, 17]], // dom..sáb
    tel: '(81) 99488-4803',
    lat: -8.0630, lng: -34.8718
  },
  {
    nome: '1ª Delegacia da Mulher do Recife',
    endereco: 'Rua do Pombal, s/n, Praça do Campo, Santo Amaro, Recife',
    horarioTexto: 'Plantão 24 horas', h24: true,
    tel: '(81) 3184-3356',
    lat: -8.0545, lng: -34.8805
  }
];

const btnApoio   = document.getElementById('btnApoio');
const msgApoio   = document.getElementById('msgApoio');
const divMapa    = document.getElementById('mapaApoio');
const listaApoio = document.getElementById('listaApoio');

let mapaApoio = null;
let camadaApoio = null;

function iniciarMapaApoio() {
  divMapa.hidden = false;
  if (!mapaApoio) {
    mapaApoio = L.map('mapaApoio').setView([-8.063, -34.882], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapaApoio);
    camadaApoio = L.layerGroup().addTo(mapaApoio);
  }
  mapaApoio.invalidateSize();
  camadaApoio.clearLayers();
}

/* Distância em km entre dois pontos (fórmula de Haversine) */
function distanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function estaAberto(l) {
  if (l.h24) return true;
  const agora = new Date();
  const faixa = l.faixas[agora.getDay()];
  const h = agora.getHours() + agora.getMinutes() / 60;
  return !!faixa && h >= faixa[0] && h < faixa[1];
}

function linkRota(l) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(l.endereco);
}

function mostrarLocais(usuario) {
  iniciarMapaApoio();

  const locais = LOCAIS_APOIO.map(l => ({
    ...l,
    km: usuario ? distanciaKm(usuario.lat, usuario.lng, l.lat, l.lng) : null
  }));
  if (usuario) locais.sort((a, b) => a.km - b.km);

  const pontos = [];

  if (usuario) {
    L.circleMarker([usuario.lat, usuario.lng], {
      radius: 9, color: 'white', weight: 3, fillColor: '#1a73e8', fillOpacity: 1
    }).addTo(camadaApoio).bindPopup('Você está aqui');
    pontos.push([usuario.lat, usuario.lng]);
  }

  listaApoio.innerHTML = '';
  locais.forEach(l => {
    const aberto = estaAberto(l);
    const dist = l.km !== null ? `${l.km.toFixed(1).replace('.', ',')} km · ` : '';

    L.marker([l.lat, l.lng]).addTo(camadaApoio).bindPopup(
      `<strong>${l.nome}</strong><br>${l.endereco}<br>${l.horarioTexto}<br>` +
      `<a href="${linkRota(l)}" target="_blank" rel="noopener">Como chegar</a>`
    );
    pontos.push([l.lat, l.lng]);

    const li = document.createElement('li');
    li.innerHTML =
      `<strong>${l.nome}</strong><br>` +
      `${dist}<span class="${aberto ? 'aberto' : 'fechado'}">${aberto ? 'Aberto agora' : 'Fechado agora'}</span> · ${l.horarioTexto}<br>` +
      `${l.endereco}<br>` +
      `Tel: ${l.tel} · <a href="${linkRota(l)}" target="_blank" rel="noopener">Como chegar</a>`;
    listaApoio.appendChild(li);
  });

  mapaApoio.fitBounds(pontos, { padding: [40, 40], maxZoom: 15 });
}

btnApoio.addEventListener('click', () => {
  if (!navigator.geolocation) {
    msgApoio.textContent = 'Seu navegador não suporta localização. Mostrando todas as casas de apoio.';
    mostrarLocais(null);
    return;
  }

  msgApoio.textContent = 'Buscando sua localização...';
  btnApoio.disabled = true;

  navigator.geolocation.getCurrentPosition(
    pos => {
      msgApoio.textContent = 'Casas de apoio mais próximas de você:';
      btnApoio.disabled = false;
      mostrarLocais({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    },
    () => {
      msgApoio.textContent =
        'Não foi possível pegar sua localização (permissão negada ou indisponível). Mostrando todas as casas de apoio.';
      btnApoio.disabled = false;
      mostrarLocais(null);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});
