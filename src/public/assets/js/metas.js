const metasPorData = {
  "2025-01-03": "Ler 2 livros",
  "2025-01-10": "Exercício físico",
  "2025-01-15": "Estudar JS",
  "2025-05-01": "Fazer curso",
  "2025-02-04": "Ler artigo",
  "2025-05-19": "Apresentar projeto",
  "2025-05-10": "Viajar"
};

const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

let mesAtual = new Date().getMonth();

function criarCalendario() {
  const container = document.getElementById("calendario");
  container.innerHTML = "";

  const data = new Date(2025, mesAtual, 1);
  const ultimoDia = new Date(2025, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = data.getDay();

  const mesDiv = document.createElement("div");
  mesDiv.className = "calendario-mes";
  mesDiv.innerHTML = `<h3>${nomesMeses[mesAtual]}</h3>`;

  const gridSemana = document.createElement("div");
  gridSemana.className = "grid-semana";
  diasSemana.forEach(dia => {
    const cell = document.createElement("div");
    cell.textContent = dia;
    gridSemana.appendChild(cell);
  });

  const gridDias = document.createElement("div");
  gridDias.className = "grid-dias";

  for (let i = 0; i < primeiroDiaSemana; i++) {
    const vazio = document.createElement("div");
    gridDias.appendChild(vazio);
  }

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const diaDiv = document.createElement("div");
    diaDiv.className = "dia";

    const dataStr = `2025-${(mesAtual + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    if (metasPorData[dataStr]) {
      diaDiv.classList.add("meta-dia");
      diaDiv.innerHTML = "✔";
      diaDiv.title = metasPorData[dataStr];
    } else {
      diaDiv.textContent = dia;
    }

    gridDias.appendChild(diaDiv);
  }

  mesDiv.appendChild(gridSemana);
  mesDiv.appendChild(gridDias);
  container.appendChild(mesDiv);
}

function irParaProximoMes() {
  mesAtual = (mesAtual + 1) % 12;
  criarCalendario();
}

function voltarAoMesAtual() {
  mesAtual = new Date().getMonth();
  criarCalendario();
}

document.addEventListener("DOMContentLoaded", () => {
  const usuarioId = sessionStorage.getItem('usuarioLogadoId');

  if (!usuarioId) {
    alert('Sessão expirada. Faça login novamente.');
    window.location.href = "/modulos/login/login.html";
    return;
  }

  criarCalendario();
  document.getElementById("proximo-mes").addEventListener("click", irParaProximoMes);
  document.getElementById("voltar-mes").addEventListener("click", voltarAoMesAtual);
});

document.getElementById('btn3').addEventListener('click', () => {
  window.location.href = 'login.html';
});
