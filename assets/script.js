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

async function findByIdComputadores(){
    const id = document.querySelector("#idComputador").value

    const response = await fetch(`${baseURL}/computador/${id}`)
    const computador = await response.json();
    
    const computadorEscolhidoDiv = document.querySelector('#computadorEscolhido');

    computadorEscolhidoDiv.innerHTML = `
    <div class="ComputadorCardItem">
    <div>
      <div class="ComputadorCardItem__sabor">${computador.nome}</div>
      <div class="ComputadorCardItem__preco">R$ ${computador.preco}</div>
      <div class="ComputadorCardItem__descricao">${computador.descricao}</div>
    </div>
      <img class="ComputadorCardItem__foto" src="${computador.foto}" alt=Computador ${computador.nome}>
   </div>`
}

findAllComputadores();