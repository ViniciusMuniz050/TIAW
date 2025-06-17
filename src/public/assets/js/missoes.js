
  document.addEventListener('DOMContentLoaded', () => {
    const missaoCaminhoContainer = document.getElementById('missao-caminho-container');
    const missaoCaminho = document.getElementById('missao-caminho');
    const currentMonthYearHeader = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const detalhesTarefasDia = document.getElementById('detalhes-tarefas-dia');
    const dataSelecionadaSpan = document.getElementById('data-selecionada');
    const listaTarefasDia = document.getElementById('lista-tarefas-dia');

    let dadosServidorCache = [];
    let currentDisplayDate = new Date(); 
    let ultimoCirculoClicado = null; 

    const nomesDiasSemanaCurto = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    async function fetchTarefas() {
        try {
            const response = await fetch('http://localhost:3000/dados');
            dadosServidorCache = await response.json();
        } catch (error) {
            dadosServidorCache = [];
        }
    }

    function formatarDataParaChave(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function renderizarCaminhoDeMissoes(dateToRender) {
        missaoCaminho.innerHTML = ''; 
        detalhesTarefasDia.style.display = 'none'; 

        const ano = dateToRender.getFullYear();
        const mes = dateToRender.getMonth();
        currentMonthYearHeader.textContent = `${nomesMeses[mes]} de ${ano}`;

        const tarefasPorData = {};
        dadosServidorCache.forEach(itemDia => {
            // const dataChave = itemDia.DataListada;
            // if (itemDia.itens && itemDia.itens.length > 0) {
            //     tarefasPorData[dataChave] = itemDia.itens;
            // }
            const dataChave = itemDia.DataListada;
            if (itemDia.itens && itemDia.itens.length > 0) {
                if(tarefasPorData[dataChave] == null)
                  tarefasPorData[dataChave] = itemDia.itens;
                else
                  tarefasPorData[dataChave].push(...itemDia.itens); //concatenar listas
            }
        });

        const hoje = new Date();
        const hojeChave = formatarDataParaChave(hoje);

        const numDiasMes = new Date(ano, mes + 1, 0).getDate();

        let targetElementParaScroll = null; 

        for (let i = 1; i <= numDiasMes; i++) {
            const diaAtualLoop = new Date(ano, mes, i);
            const diaChave = formatarDataParaChave(diaAtualLoop);
            const hasTarefas = tarefasPorData.hasOwnProperty(diaChave) && tarefasPorData[diaChave].length > 0;

            const circuloWrapper = document.createElement('div');
            circuloWrapper.classList.add('circulo-dia-wrapper');

            const circuloDia = document.createElement('div');
            circuloDia.classList.add('circulo-dia');
            circuloDia.dataset.fullDate = diaChave;

            const labelDiaSemana = document.createElement('span');
            labelDiaSemana.classList.add('dia-semana-label');
            labelDiaSemana.textContent = nomesDiasSemanaCurto[diaAtualLoop.getDay()];
            circuloDia.appendChild(labelDiaSemana);

            const labelDiaNumero = document.createElement('span');
            labelDiaNumero.classList.add('dia-numero-label');
            labelDiaNumero.textContent = i;
            circuloDia.appendChild(labelDiaNumero);

            if (hasTarefas) {
                circuloDia.classList.add('com-tarefas');
            }

            if (diaChave === hojeChave) {
                circuloDia.classList.add('dia-atual');
            }
            
            if (hasTarefas && diaAtualLoop >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) && !targetElementParaScroll) {
                targetElementParaScroll = circuloDia;
            } else if (diaChave === hojeChave && !targetElementParaScroll) { 
                targetElementParaScroll = circuloDia;
            }

            circuloDia.addEventListener('click', () => {
                if (ultimoCirculoClicado) {
                    ultimoCirculoClicado.classList.remove('selecionado');
                }
                circuloDia.classList.add('selecionado');
                ultimoCirculoClicado = circuloDia;

                exibirTarefasDoDia(diaChave, tarefasPorData[diaChave] || [], circuloDia);
            });

            circuloWrapper.appendChild(circuloDia);
            missaoCaminho.appendChild(circuloWrapper);

            if (i < numDiasMes) {
              const linha = document.createElement('div');
              linha.classList.add('linha-caminho');
              missaoCaminho.appendChild(linha);
            }
        }

        setTimeout(() => {
          if (targetElementParaScroll) {
            targetElementParaScroll.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            missaoCaminhoContainer.scrollTop = 0;
          }
        }, 300); 
      }

    function exibirTarefasDoDia(dataChave, tarefas, circuloElement) {
        dataSelecionadaSpan.textContent = new Date(dataChave + "T00:00:00").toLocaleDateString('pt-BR');
        listaTarefasDia.innerHTML = '';

        if (tarefas.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Dia de descansar, aproveite para adiantar futuras tarefas ou curtir o dia!\n( ˶ˆ ᗜ ˆ˵ )';
            listaTarefasDia.appendChild(li);
        } else {
            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.textContent = tarefa.TarefasListada;
                if (tarefa.nivelImportancia) {
                    li.classList.add(`imp-${tarefa.nivelImportancia.toLowerCase()}`);
                }
                listaTarefasDia.appendChild(li);
            });
        }
        detalhesTarefasDia.style.display = 'block';
      }

      prevMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
        renderizarCaminhoDeMissoes(currentDisplayDate);
      });
  
      nextMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
        renderizarCaminhoDeMissoes(currentDisplayDate);
      });
  
      fetchTarefas().then(() => {
        renderizarCaminhoDeMissoes(currentDisplayDate);

        const hojeChave = formatarDataParaChave(new Date());
        const tarefasHoje = dadosServidorCache.find(d => d.DataListada === hojeChave);
        if (tarefasHoje) {
          const circuloHoje = missaoCaminho.querySelector(`[data-full-date="${hojeChave}"] .circulo-dia`);
          if (circuloHoje) {
              circuloHoje.classList.add('selecionado'); 
              ultimoCirculoClicado = circuloHoje;
              exibirTarefasDoDia(hojeChave, tarefasHoje.itens || [], circuloHoje);
          } else {
             exibirTarefasDoDia(hojeChave, []); 
          }
        } 
        else {
          exibirTarefasDoDia(hojeChave, []); 
        }
  });
});


