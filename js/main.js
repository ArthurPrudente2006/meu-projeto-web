import { buscarDepoimentos, enviarContato } from "./api.js";
import { renderizarDepoimentos, mostrarAlerta } from "./ui.js";

document.addEventListener("DOMContentLoaded", async function () {

    // CALCULAR TOTAL
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

        const totalElemento = document.getElementById('valor-total');

        if (totalElemento) {

            totalElemento.textContent =
                new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(total);

        }

    }


    document.querySelectorAll('.item-produto, .qtd-produto')
        .forEach(element => {
            element.addEventListener('change', calcularTotal);
        });


    // ADICIONAR AO CARRINHO
    const btnCarrinho = document.getElementById('btn-carrinho');

    if (btnCarrinho) {

        btnCarrinho.addEventListener('click', function () {

            const checkboxes = document.querySelectorAll('.item-produto');
            const quantidades = document.querySelectorAll('.qtd-produto');
            const titulos = document.querySelectorAll('.card-title');

            let carrinho = [];

            checkboxes.forEach((checkbox, index) => {

                if (checkbox.checked) {

                    const preco = parseFloat(checkbox.value) || 0;
                    const quantidade = parseInt(quantidades[index].value) || 0;

                    carrinho.push({
                        nome: titulos[index].textContent,
                        preco: preco,
                        quantidade: quantidade
                    });

                }

            });

            if (carrinho.length === 0) {
                alert("Selecione pelo menos um produto!");
                return;
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            alert("Produtos adicionados ao carrinho!");

            window.location.href = "carrinho.html";

        });

    }


    // CARREGAR DEPOIMENTOS
    try {

        const depoimentos = await buscarDepoimentos();

        renderizarDepoimentos(depoimentos);

    } catch (erro) {

        console.error("Erro ao carregar depoimentos");

    }


    // FORMULÁRIO DE CONTATO
    const formulario = document.getElementById("form-contato");

    if (formulario) {

        formulario.addEventListener("submit", async function (event) {

            event.preventDefault();

            const dados = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                mensagem: document.getElementById("mensagem").value
            };

            try {

                const resposta = await enviarContato(dados);

                if (resposta.status === 201) {

                    mostrarAlerta("success", "Mensagem enviada com sucesso!");

                    formulario.reset();

                } else {

                    mostrarAlerta("danger", "Erro ao enviar mensagem.");

                }

            } catch {

                mostrarAlerta("danger", "Falha na conexão com o servidor.");

            }

        });

    }

});