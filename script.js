document.addEventListener('DOMContentLoaded', function () {

  function calcularTotal() {

    const checkboxes = document.querySelectorAll('.item-produto');
    const quantidades = document.querySelectorAll('.qtd-produto');

    let total = 0;

    checkboxes.forEach((checkbox, index) => {

      if (checkbox.checked) {

        const preco = parseFloat(checkbox.value) || 0;
        const quantidade = parseInt(quantidades[index].value) || 0;

        total += preco * quantidade;

      }

    });

    document.getElementById('valor-total').textContent =
      new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(total);

  }


  document.querySelectorAll('.item-produto, .qtd-produto')
    .forEach(element => {
      element.addEventListener('change', calcularTotal);
    });


  function adicionarAoCarrinho() {

    const checkboxes = document.querySelectorAll('.item-produto');
    const quantidades = document.querySelectorAll('.qtd-produto');
    const titulos = document.querySelectorAll('.card-title');

    let carrinho = [];

    checkboxes.forEach((checkbox, index) => {

      if (checkbox.checked) {

        const preco = parseFloat(checkbox.value) || 0;
        const quantidade = parseInt(quantidades[index].value) || 0;

        const produto = {
          nome: titulos[index].textContent,
          preco: preco,
          quantidade: quantidade
        };

        carrinho.push(produto);

      }

    });

    if (carrinho.length === 0) {
      alert("Selecione pelo menos um produto!");
      return;
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("Produtos adicionados ao carrinho!");

    window.location.href = "carrinho.html";

  }


  document.getElementById('btn-carrinho')
    .addEventListener('click', adicionarAoCarrinho);

});



async function carregarDepoimentos() {

  try {

    const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

    const depoimentos = await resposta.json();

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

  } catch (erro) {

    console.error("Erro ao carregar depoimentos:", erro);

  }

}

carregarDepoimentos();