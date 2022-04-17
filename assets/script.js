const baseURL = "http://localhost:3000/computadores";

async function findAllComputadores() {
  const response = await fetch(`${baseURL}/todos-computadores`);

  const computadores = await response.json();

  computares.forEach(function (computador) {
    document.querySelector("#computadorList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="ComputadorListaItem">
        <div>
            <div class="ComputadorListaItem__sabor">${computador.nome}</div>
            <div class="ComputadorListaItem__preco">R$ ${computador.preco}</div>
            <div class="ComputadorListaItem__descricao">${computador.descricao}</div>
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
  <div class="ComputadorCardItem">
  <div>
      <div class="ComputadorCardItem__sabor">${computador.nome}</div>
      <div class="ComputadorCardItem__preco">R$ ${computador.preco}</div>
      <div class="ComputadorCardItem__descricao">${computador.descricao}</div>
  </div>
  <img class="ComputadorCardItem__foto" src="${computador.foto}" alt="Computador ${computador.nome}" />
</div>`;
}

findAllComputadores();

function abrirModalCadastro() {
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
  const nome = document.querySelector("#nome").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const foto = document.querySelector("#foto").value;

  const computador = {
    nome,
    preco,
    descricao,
    foto,
  };

  const response = await fetch(`${baseURL}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(computador),
  });

  const novoComputador = await response.json();

  const html = `
  <div class="ComputadorListaItem">
    <div>
        <div class="ComputadorListaItem__sabor">${novoComputador.nome}</div>
        <div class="ComputadorListaItem__preco">R$ ${novoComputador.preco}</div>
        <div class="ComputadorListaItem__descricao">${novoComputador.descricao}</div>
    </div>
    <img class="ComputadorListaItem__foto" src="${novoComputador.foto}" alt="Computador ${novoComputador.nome}" />
  </div>`;

  document.querySelector("#computadorList").insertAdjacentHTML("beforeend", html);

  fecharModalCadastro();
}