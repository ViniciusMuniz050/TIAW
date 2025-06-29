// Define variáveis globais do mês e ano
let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

// Simulação de dados do usuário logado
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

// Cria o calendário dinamicamente
function criarCalendario() {
  const container = document.getElementById("calendario");
  container.innerHTML = "";

  const data = new Date(anoAtual, mesAtual, 1);
  const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = data.getDay();

  const mesDiv = document.createElement("div");
  mesDiv.className = "calendario-mes";
  mesDiv.innerHTML = `<h3>${nomesMeses[mesAtual]} de ${anoAtual}</h3>`;

  const gridSemana = document.createElement("div");
  gridSemana.className = "grid-semana";
  diasSemana.forEach(dia => {
    const cell = document.createElement("div");
    cell.textContent = dia;
    gridSemana.appendChild(cell);
  });

  const gridDias = document.createElement("div");
  gridDias.className = "grid-dias";

  // Preenche dias em branco até o início do mês
  for (let i = 0; i < primeiroDiaSemana; i++) {
    const vazio = document.createElement("div");
    gridDias.appendChild(vazio);
  }

  // Preenche os dias do mês
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const diaDiv = document.createElement("div");
    diaDiv.className = "dia";

    const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    // Marca se tem meta
    if (metasPorData[dataStr]) {
      diaDiv.classList.add("meta-dia");
      diaDiv.innerHTML = "✔";
      diaDiv.title = metasPorData[dataStr];
    } else {
      diaDiv.textContent = dia;
    }

    // Destaca o dia de hoje
    const hoje = new Date();
    if (
      dia === hoje.getDate() &&
      mesAtual === hoje.getMonth() &&
      anoAtual === hoje.getFullYear()
    ) {
      diaDiv.style.border = "2px solid #2e7d32";
    }

    gridDias.appendChild(diaDiv);
  }

  mesDiv.appendChild(gridSemana);
  mesDiv.appendChild(gridDias);
  container.appendChild(mesDiv);
}

// Navega para o próximo mês
function irParaProximoMes() {
  if (mesAtual === 11) {
    mesAtual = 0;
    anoAtual++;
  } else {
    mesAtual++;
  }
  criarCalendario();
}

// Navega para o mês anterior
function irParaMesAnterior() {
  if (mesAtual === 0) {
    mesAtual = 11;
    anoAtual--;
  } else {
    mesAtual--;
  }
  criarCalendario();
}

// Inicializa o calendário quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
  const usuarioId = sessionStorage.getItem('usuario');
  if (!usuarioId) {
    alert('Sessão expirada. Faça login novamente.');
    window.location.href = "/modulos/login/login.html";
    return;
  }

  criarCalendario();

  document.getElementById("proximo-mes").addEventListener("click", irParaProximoMes);
  document.getElementById("voltar-mes").addEventListener("click", irParaMesAnterior);

  document.getElementById("btn-sair").addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
});
