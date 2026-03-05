document.addEventListener('DOMContentLoaded', function () {

  function calcularTotal() {

    const checkboxes = document.querySelectorAll('.item-produto');
    const quantidades = document.querySelectorAll('.qtd-produto');

    let total = 0;

    checkboxes.forEach((checkbox, index) => {

      if (checkbox.checked) {

        const preco = parseFloat(checkbox.value);
        const quantidade = parseInt(quantidades[index].value);

        total += preco * quantidade;

      }

    });

    document.getElementById('valor-total').textContent =
      total.toFixed(2).replace('.', ',');

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

        const produto = {

          nome: titulos[index].textContent,
          preco: parseFloat(checkbox.value),
          quantidade: parseInt(quantidades[index].value)

        };

        carrinho.push(produto);

      }

    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("Produtos adicionados ao carrinho!");

    window.location.href = "carrinho.html";

  }

  document.getElementById('btn-carrinho')
    .addEventListener('click', adicionarAoCarrinho);

});