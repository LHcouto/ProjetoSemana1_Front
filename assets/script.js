const baseURL = "http://localhost:3000/computadores";

async function findAllComputadores() {
  const response = await fetch(`${baseURL}/todos-computadores`);

  const computadores = await response.json();

  computadores.forEach(function (computador) {
    document.querySelector("#computadorList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="ComputadorListaItem" id="ComputadorListaItem_${computador.id}">
        <div>
            <div class="ComputadorListaItem__nome">${computador.nome}</div>
            <div class="ComputadorListaItem__preco">R$ ${computador.preco}</div>
            <div class="ComputadorListaItem__descricao">${computador.descricao}</div>

            <div class="ComputadorListaItem__acoes Acoes">
              <button class="Acoes__editar btn" onclick="abrirModal(${computador.id})">Editar</button> 
              <button class="Acoes__apagar btn" onclick="abrirModalDelete(${computador.id})">Apagar</button> 
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
  <div class="ComputadorCardItem" id="ComputadorListaItem_${computador.id}">
  <div>
      <div class="ComputadorCardItem__nome">${computador.nome}</div>
      <div class="ComputadorCardItem__preco">R$ ${computador.preco}</div>
      <div class="ComputadorCardItem__descricao">${computador.descricao}</div>
      
      <div class="ComputadorListaItem__acoes Acoes">
          
      </div>
  </div>
  <img class="ComputadorCardItem__foto" src="${computador.foto}" alt="Computador ${computador.nome}" />
</div>`;
}

findAllComputadores();

async function abrirModal(id = null) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText =
      "Atualizar um Computador";
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
      "Cadastrar um Computador";
    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }

  document.querySelector("#overlay").style.display = "flex";
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#id").value = "";
  document.querySelector("#nome").value = "";
  document.querySelector("#preco").value = "";
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
  console.log(novoComputador);
  const html = `
  <div class="ComputadorListaItem" id="ComputadorListaItem_${novoComputador.id}">
    <div>
        <div class="ComputadorListaItem__nome">${novoComputador.nome}</div>
        <div class="ComputadorListaItem__preco">R$ ${novoComputador.preco}</div>
        <div class="ComputadorListaItem__descricao">${novoComputador.descricao}</div>

        <div class="ComputadorListaItem__acoes Acoes">
          <button class="Acoes__editar btn" onclick="abrirModal(${novoComputador.id})">Editar</button> 
          <button class="Acoes__apagar btn" onclick="abrirModalDelete(${novoComputador.id})">Apagar</button> 
        </div>
    </div>
    <img class="ComputadorListaItem__foto" src="${novoComputador.foto}" alt="Computador ${novoComputador.nome}" />
  </div>`;

  if (modoEdicaoAtivado) {
    document.querySelector(`#ComputadorListaItem_${id}`).outerHTML = html;
  } else {
    document
      .querySelector("#computadorList")
      .insertAdjacentHTML("beforeend", html);
  }

  fecharModal();
}

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn_delete_yes");

  btnSim.addEventListener("click", function () {
    deleteComputador(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function deleteComputador(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById("computadorList").innerHTML = "";

  fecharModalDelete();
  findAllComputadores();
}
