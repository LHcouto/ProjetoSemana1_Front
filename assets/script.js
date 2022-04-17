const baseURL = "http://localhost:3000/computadores"

async function findAllComputadores() {
    const response = await fetch(`${baseURL}/todos-computadores`)

    const computadores = await response.json();

    computadores.forEach(function(computador) {
        document.querySelector('#computadorList').insertAdjacentHTML(
            "beforeend",
         `
         <div class="ComputadorListaItem">
           <div>
             <div class="ComputadorListaItem__sabor">${computador.nome}</div>
             <div class="ComputadorListaItem__preco">R$ ${computador.preco}</div>
             <div class="ComputadorListaItem__descricao">${computador.descricao}</div>
           </div>
             <img class="ComputadorListaItem__foto" src="${computador.foto}" alt=Computador ${computador.nome}>
          </div>
         `
         );
    });
}

findAllComputadores();