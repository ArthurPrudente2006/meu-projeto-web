export function renderizarDepoimentos(depoimentos) {

    const lista = document.getElementById("lista-depoimentos");

    if (!lista) return;

    depoimentos.forEach(depoimento => {

        const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${depoimento.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
            <p class="card-text">${depoimento.body}</p>
          </div>
        </div>
      </div>
    `;

        lista.innerHTML += card;

    });

}


export function mostrarAlerta(tipo, mensagem) {

    const area = document.getElementById("mensagem-retorno");

    if (!area) return;

    area.innerHTML = `
    <div class="alert alert-${tipo} mt-3">
      ${mensagem}
    </div>
  `;

}