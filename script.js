const prevButton = document.querySelector(".seta-anterior");
const nextButton = document.querySelector(".seta-proxima");
const dataElement = document.querySelector(".data");
const diasElement = document.querySelector(".dias");
var agendamentos = localStorage.getItem('agendamentos');

if(!agendamentos || agendamentos.length == 0){
  const arrayVazio = [];
  localStorage.setItem('agendamentos',  JSON.stringify(arrayVazio))
}

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

let dataAtual = new Date();
let diaSelecionado = null;

function atualizarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const dia = dataAtual.getDate();

  dataElement.querySelector("h1").textContent = meses[mes];
  dataElement.querySelector("p").textContent = `${getDiaSemana(
    dataAtual
  )}, ${dia} ${meses[mes]}, ${ano}`;

  const primeiroDiaMes = new Date(ano, mes, 1);
  const ultimoDiaMes = new Date(ano, mes + 1, 0);

  const primeiroDiaSemana = primeiroDiaMes.getDay();
  const ultimoDiaMesDia = ultimoDiaMes.getDate();

  diasElement.innerHTML = "";

  for (let i = 0; i < primeiroDiaSemana; i++) {
    const diaElement = document.createElement("div");
    diaElement.classList.add("dia-mes-anterior");
    diaElement.textContent = ultimoDiaMesDia - (primeiroDiaSemana - i) + 1;
    diasElement.appendChild(diaElement);
  }

  for (let i = 1; i <= ultimoDiaMesDia; i++) {
    const diaElement = document.createElement("div");
    diaElement.textContent = i;
    diaElement.addEventListener("click", () => {
      if (diaSelecionado) {
        diaSelecionado.classList.remove("destacado");
      }
      diaSelecionado = diaElement;
      diaSelecionado.classList.add("destacado");
      labelDia = diaSelecionado.innerHTML + "/" + (mes + 1) + "/" + ano;
      dataSelecionada = new Date(ano, mes + 1, diaSelecionado.innerHTML);
      dataElement.querySelector("p").textContent = `${getDiaSemana(
        dataSelecionada
      )}, ${diaSelecionado.innerHTML} ${meses[mes]}, ${ano}`;

      document.getElementById("myModal").style.display = "block";

      const diaForm = String(dataSelecionada.getDate()).padStart(2, "0");
      const mesForm = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
      const anoForm = dataSelecionada.getFullYear();

      const dataFormatada = `${diaForm}/${mesForm}/${anoForm}`;

      console.log(dataFormatada);

      document.getElementById("data_input").value = dataFormatada;
    });
    diasElement.appendChild(diaElement);
  }
  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const data = document.getElementById("data_input").value;

    console.log("Nome: " + nome);
    console.log("Mensagem: " + mensagem);

    let informacoes = {
      data: data,
      nome: nome,
      mensagem: mensagem,
    };

    const informacoesString = JSON.stringify(informacoes);

    localStorage.setItem("informacoes", informacoesString);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("data_input").value = "";
    document.getElementById("myModal").style.display = "none";
    const tbody = document.querySelector("table tbody");

  });
  // Itera sobre os dados e cria uma linha para cada objeto
  const dados = localStorage.getItem('agendamentos');
  dados.forEach((item) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = item.nome;

    const tdData = document.createElement("td");
    tdData.textContent = item.data;

    const tdMensagem = document.createElement("td");
    tdMensagem.textContent = item.mensagem;

    // Adiciona as células à linha
    tr.appendChild(tdNome);
    tr.appendChild(tdData);
    tr.appendChild(tdMensagem);

    // Adiciona a linha ao corpo da tabela
    tbody.appendChild(tr);
  });

  const diasRestantes = 7 - (diasElement.children.length % 7);
  for (let i = 1; i <= diasRestantes; i++) {
    const diaElement = document.createElement("div");
    diaElement.classList.add("dia-proximo-mes");
    diaElement.textContent = i;
    diasElement.appendChild(diaElement);
  }
}

function getDiaSemana(data) {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return diasSemana[data.getDay()];
}

atualizarCalendario();

prevButton.addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  atualizarCalendario();
});

nextButton.addEventListener("click", () => {
  console.log(localStorage.getItem("teste"));
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  atualizarCalendario();
});
