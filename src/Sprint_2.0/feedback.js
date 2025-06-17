const url = "http://localhost:3000/avaliacoes";

// Contar notas para gerar gráfico
async function contarNotas() {
  const resposta = await fetch(url);
  const avaliacoes = await resposta.json();

  const contagem = [0, 0, 0, 0, 0];
  avaliacoes.forEach(avaliacao => {
    if (avaliacao.nota >= 1 && avaliacao.nota <= 5) {
      contagem[avaliacao.nota - 1]++;
    }
  });
  return contagem;
}

// Atualizar gráfico de pizza
async function atualizarGraficoPizza() {
  const ctx = document.getElementById("graficoNotas").getContext("2d");
  const dados = await contarNotas();

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

// Exibir comentários na tabela
async function exibirComentarios() {
  const resposta = await fetch(url);
  const comentarios = await resposta.json();

  const lista = document.getElementById('comentarios-lista');
  lista.innerHTML = '';

  comentarios.forEach(comentario => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><img src="img/preguica.png" class="icon" alt="ícone" /></td>
      <td>${comentario.comentario}</td>
      <td class="data">${comentario.data}</td>
      <td><button onclick="excluirComentario(${comentario.id})">Excluir</button></td>
    `;

    lista.appendChild(row);
  });
}

// Adicionar novo comentário
async function adicionarComentario() {
  const input = document.getElementById("novo-comentario");
  const texto = input.value.trim();
  const nota = parseInt(document.getElementById("nota-comentario").value);

  if (texto && nota >= 1 && nota <= 5) {
    const hoje = new Date();
    const data = hoje.toLocaleDateString("pt-BR");

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nota, comentario: texto, data })
    });

    input.value = "";
    document.getElementById("nota-comentario").value = "";

    await exibirComentarios();
    await atualizarGraficoPizza();
  } else {
    alert("Digite um comentário e selecione uma nota entre 1 e 5.");
  }
}

// Excluir comentário
async function excluirComentario(id) {
  await fetch(`${url}/${id}`, {
    method: "DELETE"
  });

  await exibirComentarios();
  await atualizarGraficoPizza();
}

// Carregar na inicialização
document.addEventListener("DOMContentLoaded", async () => {
  await atualizarGraficoPizza();
  await exibirComentarios();

  // Garante que os inputs estão no HTML
  if (!document.getElementById("novo-comentario")) {
    const inputComentario = document.createElement("input");
    inputComentario.type = "text";
    inputComentario.id = "novo-comentario";
    inputComentario.placeholder = "Digite seu comentário...";
    inputComentario.style.marginRight = "10px";

    const inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.id = "nota-comentario";
    inputNota.placeholder = "Nota (1 a 5)";
    inputNota.min = 1;
    inputNota.max = 5;
    inputNota.style.marginRight = "10px";
    inputNota.style.width = "100px";

    const botao = document.createElement("button");
    botao.textContent = "Adicionar Comentário";
    botao.onclick = adicionarComentario;

    const container = document.querySelector(".comentarios");
    container.appendChild(document.createElement("br"));
    container.appendChild(inputComentario);
    container.appendChild(inputNota);
    container.appendChild(botao);
  }
});
