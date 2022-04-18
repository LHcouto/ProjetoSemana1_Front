const baseURL = "http://localhost:3000/computadores";

async function findAllComputadores() {
  const response = await fetch(`${baseURL}/todos-computadores`);

  const computadores = await response.json();

  computadores.forEach(function (computador) {
    document.querySelector("#computadorList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="ComputadorListaItem" id="ComputadorListaItem__${computador.id}">
        <div>
            <div class="ComputadorListaItem__sabor">${computador.nome}</div>
            <div class="ComputadorListaItem__preco">R$ ${computador.preco}</div>
            <div class="ComputadorListaItem__descricao">${computador.descricao}</div>
            
            <div class= "ComputadorListItem__acoes Acoes">
              <button class ="Acoes_editar btn" onclick =" abrirModal(${computador.id})">Editar</button>
              <button class ="Acoes_apagar btn">Apagar</button>
            </div>
        </div>
        
        <img class="ComputadorListaItem__foto" src="${computador.foto}" alt="Computador ${computador.nome}" />
     
        
    
    </div>
    `
    );
  });
}

async function findByIdComputadores() {
  const id = document.querySelector("#idComputador").value;

  const response = await fetch(`${baseURL}/computador/${id}`);
  const computador = await response.json();

  const computadorEscolhidoDiv = document.querySelector("#computadorEscolhido");

  computadorEscolhidoDiv.innerHTML = `
  <div class="ComputadorCardItem" id="ComputadorListaItem__${computador.id}">
  <div>
      <div class="ComputadorCardItem__sabor">${computador.nome}</div>
      <div class="ComputadorCardItem__preco">R$ ${computador.preco}</div>
      <div class="ComputadorCardItem__descricao">${computador.descricao}</div>
      
      <div class= "ComputadorListItem__acoes Acoes">
          <button class ="Acoes_editar btn" onclick =" abrirModal(${computador.id})">Editar</button>
          <button class ="Acoes_apagar btn">Apagar</button>
      </div>
  </div>
  <img class="ComputadorCardItem__foto" src="${computador.foto}" alt="Computador ${computador.nome}" />
</div>`;
}

findAllComputadores();

async function abrirModal(id = null) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um computador";

    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseURL}/computador/${id}`);
    const computador = await response.json();

    document.querySelector("#nome").value = computador.nome;
    document.querySelector("#preco").value = computador.preco;
    document.querySelector("#descricao").value = computador.descricao;
    document.querySelector("#foto").value = computador.foto;
    document.querySelector("#id").value = computador.id;
  } else {
    document.querySelector("#title-header-modal").innerText =
      "Cadastrar um computador";
    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }

  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#nome").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
}

async function createComputador() {
  const id = document.querySelector("#id").value;
  const nome = document.querySelector("#nome").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const foto = document.querySelector("#foto").value;

  const computador = {
    id,
    nome,
    preco,
    descricao,
    foto,
  };

  const modoEdicaoAtivado = id > 0;

  const endpoint = baseURL + (modoEdicaoAtivado ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(computador),
  });

  const novoComputador = await response.json();

  const html = `
  <div class="ComputadorListaItem" id="ComputadorListaItem__${computador.id}">
    <div>
        <div class="ComputadorListaItem__sabor">${novoComputador.nome}</div>
        <div class="ComputadorListaItem__preco">R$ ${novoComputador.preco}</div>
        <div class="ComputadorListaItem__descricao">${novoComputador.descricao}</div>

        <div class= "ComputadorListItem__acoes Acoes">
              <button class ="Acoes_editar btn" onclick =" abrirModal(${computador.id})">Editar</button>
              <button class ="Acoes_apagar btn">Apagar</button>
        </div>
    </div>
    <img class="ComputadorListaItem__foto" src="${novoComputador.foto}" alt="Computador ${novoComputador.nome}" />
  </div>`;

  if (modoEdicaoAtivado) {
    document.querySelector(`#ComputadorListaItem__${id}`).outerHTML = html;
  } else {
    document
      .querySelector("#computadorList")
      .insertAdjacentHTML("beforeend", html);
  }

  fecharModalCadastro();
}
