/* =========================================================
   API REST do Back4App (Parse) - classe "Meta"
   Cada função é uma operação do CRUD:
   criar (POST), listar (GET), editar (PUT), excluir (DELETE)
   ========================================================= */
const URL_META = `${BACK4APP.url}/classes/Meta`;

function back4appConfigurado() {
  return !BACK4APP.appId.startsWith('COLE_AQUI') &&
         !BACK4APP.restKey.startsWith('COLE_AQUI');
}

async function requisicao(caminho, opcoes = {}) {
  if (!back4appConfigurado()) {
    throw new Error('Preencha o appId e o restKey no arquivo config.js.');
  }

  const resp = await fetch(URL_META + caminho, {
    ...opcoes,
    headers: {
      'X-Parse-Application-Id': BACK4APP.appId,
      'X-Parse-REST-API-Key': BACK4APP.restKey,
      'Content-Type': 'application/json'
    }
  });

  const corpo = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    // O Parse devolve { code, error } quando algo dá errado
    throw new Error(corpo.error || 'Erro HTTP ' + resp.status);
  }
  return corpo;
}

const MetasAPI = {
  // READ: devolve um array de metas
  async listar() {
    const corpo = await requisicao('?order=indicador,ano&limit=1000');
    return corpo.results;
  },

  // CREATE: devolve { objectId, createdAt }
  criar(meta) {
    return requisicao('', { method: 'POST', body: JSON.stringify(meta) });
  },

  // UPDATE: devolve { updatedAt }
  editar(id, meta) {
    return requisicao('/' + id, { method: 'PUT', body: JSON.stringify(meta) });
  },

  // DELETE: devolve {}
  excluir(id) {
    return requisicao('/' + id, { method: 'DELETE' });
  }
};
