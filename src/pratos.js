const totalComanda = document.querySelector('#total-comanda');

export const listaPratos = []; 

export function valorComanda() {
    let total = 0;
    listaPratos.forEach(prato => {
        total += prato.subtotal;
    });

    totalComanda.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
