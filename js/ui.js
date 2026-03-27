const temaSalvo = localStorage.getItem("tema");

if (temaSalvo) {
  document.documentElement.setAttribute("data-bs-theme", temaSalvo);
}

export function renderizarDepoimentos(depoimentos) {
  const lista = document.getElementById("lista-depoimentos");

  if (!lista) return;

  depoimentos.forEach((depoimento) => {
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

const botaoTema = document.getElementById("toggle-tema");

botaoTema.addEventListener("click", alternarTema);

function alternarTema() {
  const html = document.documentElement;
  const temaAtual = html.getAttribute("data-bs-theme");

  if (temaAtual === "dark") {
    html.setAttribute("data-bs-theme", "light");
    localStorage.setItem("tema", "light");
  } else {
    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("tema", "dark");
  }
}
