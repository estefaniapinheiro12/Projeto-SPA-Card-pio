import { listaPratos, valorComanda } from "./pratos.js";


let listaDePratos = [];
let valorAtualComanda = 0;

function renderizarPratos(pratos, secao) {
    secao.innerHTML = '';  

    pratos.forEach((prato, index) => {
        const pratoDiv = document.createElement('div');
        pratoDiv.classList.add('prato');
        
        const titulo = document.createElement('h3');
        titulo.textContent = prato.titulo;
        pratoDiv.appendChild(titulo);
        
        const descricao = document.createElement('p');
        descricao.textContent = prato.descricao;
        pratoDiv.appendChild(descricao);
        
        const preco = document.createElement('p');
        preco.textContent = `R$ ${prato.preco.toFixed(2)}`;
        pratoDiv.appendChild(preco);

        
        const qtdSpan = document.createElement('span');
        qtdSpan.textContent = prato.qtd || 0; 
        pratoDiv.appendChild(qtdSpan);

        const btnMais = document.createElement('button');
        btnMais.textContent = '+';
        btnMais.onclick = () => {
            prato.qtd = (prato.qtd || 0) + 1;  
            qtdSpan.textContent = prato.qtd;  
            atualizarComanda();
        };

        const btnMenos = document.createElement('button');
        btnMenos.textContent = '-';
        btnMenos.onclick = () => {
            if (prato.qtd > 0) prato.qtd -= 1;  
            qtdSpan.textContent = prato.qtd;  
            atualizarComanda();
        };

        
        const btnPedir = document.createElement('button');
        btnPedir.textContent = 'Pedir';
        btnPedir.onclick = () => {
            if (!prato.qtd) return;  
            const pratoExistente = listaDePratos.find(p => p.titulo === prato.titulo);
            if (pratoExistente) {
                pratoExistente.qtd += prato.qtd;
            } else {
                listaDePratos.push({...prato, qtd: prato.qtd});
            }
            atualizarComanda();  
        };

        pratoDiv.appendChild(btnMais);
        pratoDiv.appendChild(btnMenos);
        pratoDiv.appendChild(btnPedir);

        secao.appendChild(pratoDiv);
    });
}


function atualizarComanda() {
    const total = listaDePratos.reduce((acc, prato) => acc + (prato.preco * prato.qtd), 0);
    valorAtualComanda = total;
    document.getElementById('total-comanda').textContent = `R$ ${total.toFixed(2)}`;
}


function cancelarPedido() {
    listaDePratos = [];
    atualizarComanda();
}


function encerrarPedido() {
    if (listaDePratos.length === 0) {
        alert('Não há itens no pedido.');
        return;
    }
    alert(`Pedido realizado! Total: R$ ${valorAtualComanda.toFixed(2)}. Volte sempre!`);
    listaDePratos = [];
    atualizarComanda();
}


async function obterMenu() {
    try {
        const response = await fetch('http://localhost:3001/menu');
        const data = await response.json();

        const secPrincipais = document.getElementById('lista-principais');
        const secSobremesas = document.getElementById('lista-sobremesas');

        renderizarPratos(data.principais, secPrincipais);
        renderizarPratos(data.sobremesas, secSobremesas);

    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
}


function adicionarBotoesComanda() {
    const rodape = document.getElementById('rodape');

    
    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar Pedido';
    btnCancelar.id = 'cancelar-pedido';
    btnCancelar.onclick = cancelarPedido;
    rodape.appendChild(btnCancelar);

    const btnEncerrar = document.createElement('button');
    btnEncerrar.textContent = 'Encerrar Pedido';
    btnEncerrar.id = 'encerrar-pedido';
    btnEncerrar.onclick = encerrarPedido;
    rodape.appendChild(btnEncerrar);
}

document.addEventListener('DOMContentLoaded', () => {
    obterMenu();

    adicionarBotoesComanda();

    document.getElementById('link-principais').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('principais').style.display = 'block';
        document.getElementById('sobremesas').style.display = 'none';
    });

    document.getElementById('link-sobremesas').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('principais').style.display = 'none';
        document.getElementById('sobremesas').style.display = 'block';
    });
});

