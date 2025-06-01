const notas = [4, 5, 2, 4, 3, 5, 1, 3, 2, 4,5,5,5,5,5,5];

function contarNotas() {
  const contagem = [0, 0, 0, 0, 0];
  notas.forEach(nota => {
    if (nota >= 1 && nota <= 5) contagem[nota - 1]++;
  });
  return contagem;
}

function atualizarGraficoPizza() {
  const ctx = document.getElementById("graficoNotas").getContext("2d");
  const dados = contarNotas();

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Nota 1', 'Nota 2', 'Nota 3', 'Nota 4', 'Nota 5'],
      datasets: [{
        label: 'Distribuição de Notas',
        data: dados,
        backgroundColor: [
          '#ff4d4d',
          '#ff9933',
          '#ffff66',
          '#66ff66',
          '#3399ff'
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function carregarComentarios() {
  const armazenados = localStorage.getItem('comentarios');
  return armazenados ? JSON.parse(armazenados) : [];
}

function salvarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function exibirComentarios() {
  const lista = document.getElementById('comentarios-lista');
  lista.innerHTML = ''; // limpa antes de renderizar

  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  comentarios.forEach((comentario, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><img src="img/preguica.png" class="icon" alt="ícone" /></td>
      <td>${comentario.texto}</td>
      <td class="data">${comentario.data}</td>
      <td><button onclick="excluirComentario(${index})">Excluir</button></td>
    `;

    lista.appendChild(row);
  });
}

function excluirComentario(index) {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentarios.splice(index, 1); // remove o comentário pelo índice
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
  exibirComentarios(); // atualiza a tabela
}


function adicionarComentario() {
  const input = document.getElementById("novo-comentario");
  const texto = input.value.trim();
  if (texto) {
    const hoje = new Date();
    const data = hoje.toLocaleDateString("pt-BR");
    comentarios.push({ texto, data });
    salvarComentarios();
    exibirComentarios();
    input.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.comentarios = carregarComentarios();

  atualizarGraficoPizza();
  exibirComentarios();

  if (!document.getElementById("novo-comentario")) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "novo-comentario";
    input.placeholder = "Digite seu comentário...";
    input.style.marginRight = "10px";

    const botao = document.createElement("button");
    botao.textContent = "Adicionar Comentário";
    botao.onclick = adicionarComentario;

    const container = document.querySelector(".comentarios");
    container.appendChild(document.createElement("br"));
    container.appendChild(input);
    container.appendChild(botao);
  }
});
