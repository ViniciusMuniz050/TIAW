const informacoes = [
    {
        pontos: 120,
        semanas: 3,

        tarefas: [
            {
                id: 20,
                tipo: 'concluídas',
                itens: [
                    { "id": 1, "tarefa": "Arrumar o carro" },
                    { "id": 2, "tarefa": "Lavar vasilhas" },
                    { "id": 3, "tarefa": "Estudar DIW" },
                    { "id": 4, "tarefa": "Consertar geladeira" },
                    { "id": 5, "tarefa": "Ir para a academia" }
                ]
            },
            {
                id: 30,
                tipo: 'pendentes',
                itens: [
                    { "id": 6, "tarefa": "Lavar o banheiro" },
                    { "id": 7, "tarefa": "Enviar relatório mensal" },
                    { "id": 8, "tarefa": "Comprar ingredientes" },
                    { "id": 9, "tarefa": "Organizar gavetas" },
                    { "id": 10, "tarefa": "Remarcar consulta" }
                ]
            }
        ]
    }
];

// Interação de RETROSPECTO.HTML
window.onload = function () {
    const tela = document.getElementById('tela');

    for (let i = 0; i < informacoes.length; i++) {
        const dado = informacoes[i];  // se refere ao meu JSON 

        tela.innerHTML += `
            <div id="dados" style="text-align:center;">
                <div class="dadosjs">PONTOS: ${dado.pontos}</div><br><br>
                <div class="dadosjs">SEMANA ${dado.semanas}</div><br><br>

                <button class="btn-tarefa" onclick="location.href='detalhes.html?id=${dado.tarefas[0].id}'">
                    TAREFAS CONCLUÍDAS: ${dado.tarefas[0].itens.length}
                </button><br><br>

                <button class="btn-tarefa" onclick="location.href='detalhes.html?id=${dado.tarefas[1].id}'">
                    TAREFAS PENDENTES: ${dado.tarefas[1].itens.length}
                </button><br><br>
            </div>
        `;
    }

    const ultimo = informacoes[informacoes.length - 1];
    const total = ultimo.tarefas[0].itens.length + ultimo.tarefas[1].itens.length;
    const percentual = (ultimo.tarefas[0].itens.length / total) * 100;

    tela.innerHTML += `
    <p id="p-grafico">Porcentagem: ${percentual.toFixed(2)}% das tarefas concluídas</p>
    <div id="grafico" style="max-width: 600px; height: 400px; margin: 40px auto;">
        <canvas id="myChart"></canvas>
    </div>
`;

const ctx = document.getElementById('myChart');


new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
    datasets: [{
      label: 'MENU PRODUTIVIDADE - TAREFAS CONCLUÍDAS',
      data: [11, 38, percentual, 40, 59],
      backgroundColor: ['#129745'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'black' }
      },
      x: {
        ticks: { color: 'black' }
      }
    }
  }
});
};


// Interação da página DETALHES.HTML
const params = new URLSearchParams(location.search);
const id = params.get('id');
const exibicao1 = document.getElementById('exibicao');

const tarefas = informacoes[0].tarefas;  // acessa o array tarefas do meu JSON

const exibicao = tarefas.find(t => t.id == id);

if (exibicao && exibicao1) {
    exibicao1.innerHTML += `<header class="cabecalho"><h1>Tarefas ${exibicao.tipo}</h1></header>`;
    exibicao.itens.forEach(item => {
        exibicao1.innerHTML += `<div id="tarefas-exibidas"><li>${item.tarefa}</li></div><br>`;
    });
} else if (exibicao1) {
    exibicao1.innerHTML = "URL inválida. Tente novamente...";
}


