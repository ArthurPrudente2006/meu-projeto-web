document.addEventListener("DOMContentLoaded", function () {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const lista = document.getElementById("lista-carrinho");

  let total = 0;

  carrinho.forEach((produto) => {
    const subtotal = produto.preco * produto.quantidade;

    total += subtotal;

    const linha = `
<tr>
<td>${produto.nome}</td>
<td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
<td>${produto.quantidade}</td>
<td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
</tr>
`;

    lista.innerHTML += linha;
  });

  document.getElementById("total-carrinho").textContent = total
    .toFixed(2)
    .replace(".", ",");
});

function limparCarrinho() {
  localStorage.removeItem("carrinho");

  alert("Carrinho esvaziado!");

  location.reload();
}

function finalizarCompra() {
  alert("Compra realizada com sucesso!");

  localStorage.removeItem("carrinho");

  window.location.href = "produtos.html";
}
