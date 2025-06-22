
        let nivelImportancia = null; 

        function scrollCarrosselLeft() {
            const criaCardElement = document.getElementById('criaCard');
            if (criaCardElement) { 
                criaCardElement.scrollBy({ left: -270, behavior: 'smooth' });
            }
        }

        function scrollCarrosselRight() {
            const criaCardElement = document.getElementById('criaCard');
            if (criaCardElement) { 
                criaCardElement.scrollBy({ left: 270, behavior: 'smooth' });
            }
        }

        function handleDeleteClick() {
            const idData = this.getAttribute('data-id-data'); 
            const indexTarefa = parseInt(this.getAttribute('data-index-tarefa')); 

            if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
                return; 
            }

            fetch(`http://localhost:3000/dados/${idData}`) 
                .then(res => {
                    return res.json();
                })
                .then(diaParaAtualizar => {
                    if (diaParaAtualizar && Array.isArray(diaParaAtualizar.itens)) {
                        diaParaAtualizar.itens.splice(indexTarefa, 1); 
                        
                        if (diaParaAtualizar.itens.length === 0) {
                            return fetch(`http://localhost:3000/dados/${idData}`, { method: 'DELETE' });
                        } else {
                            return fetch(`http://localhost:3000/dados/${idData}`, {
                                method: 'PUT', 
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(diaParaAtualizar)
                            });
                        }
                    }
                    return Promise.resolve(); 
                })
                .then(() => {
                    exibirTarefas(); 
                    alert('Tarefa deletada com sucesso!');
                })
        }

        function exibirTarefas() {
            const container = document.getElementById('criaCard');
            container.innerHTML = ''; 

            fetch("http://localhost:3000/dados") 
                .then(res => {
                    return res.json();
                })
                .then(dadosDoServidor => {
                    dadosDoServidor.sort((a, b) => new Date(a.DataListada) - new Date(b.DataListada));

                    dadosDoServidor.forEach(dia => { 
                        let itens = dia.itens;

                        itens.forEach((tarefa, indexTarefa) => { 
                            const card = document.createElement('div');
                            card.classList.add('card-tarefa'); 

                            if (tarefa.nivelImportancia === 'Alta') { 
                                card.classList.add('imp-alta');
                            } else if (tarefa.nivelImportancia === 'Media') {
                                card.classList.add('imp-media');
                            } else if (tarefa.nivelImportancia === 'Baixa') {
                                card.classList.add('imp-baixa');
                            }
                            
                            const dataFormatada = new Date(dia.DataListada + "T00:00:00").toLocaleDateString('pt-BR');
                        
                            card.innerHTML = `
                                <div class="CardCarrossel">
                                    <h3>${tarefa.TarefasListada}</h3>
                                    <p>Data: ${dataFormatada}</p>
                                    <p>Importância: ${tarefa.nivelImportancia}</p> 
                                    <button class="btn-deletar" data-id-data="${dia.id}" data-index-tarefa="${indexTarefa}">Deletar</button>
                                </div>
                            `;
                            
                            container.appendChild(card);
                        });
                    });

                    const anteriorBtn = document.getElementById('anterior');
                    const proximoBtn = document.getElementById('proximo');

                    if (anteriorBtn) {
                        anteriorBtn.removeEventListener('click', scrollCarrosselLeft); 
                        anteriorBtn.addEventListener('click', scrollCarrosselLeft);
                    }
                    if (proximoBtn) {
                        proximoBtn.removeEventListener('click', scrollCarrosselRight); 
                        proximoBtn.addEventListener('click', scrollCarrosselRight);
                    }

                    const botoesDeletar = document.querySelectorAll('.btn-deletar');
                    botoesDeletar.forEach(button => {
                        button.removeEventListener('click', handleDeleteClick); 
                        button.addEventListener('click', handleDeleteClick);
                    });

                })
                .catch(error => {
                    alert('dê npm start.');
                });
        }

        document.addEventListener('DOMContentLoaded', () => {
            exibirTarefas(); 
            
            const inputsContainer = document.querySelector('.inputs-importancia');
            if (inputsContainer) {
                inputsContainer.addEventListener('change', (event) => {
                    if (event.target.tagName === 'INPUT' && event.target.type === 'radio' && event.target.checked) {
                        nivelImportancia = event.target.value;
                    }
                });
            }

            const addTarefasForm = document.getElementById('AddTarefas');
            if (addTarefasForm) {
                addTarefasForm.addEventListener('submit', function(event) {
                    event.preventDefault(); 

                    const tarefa = document.getElementById("Entrada").value;
                    const data = document.getElementById("EntradaData").value;

                    if (!tarefa || !data || !nivelImportancia) {
                        alert('Por favor, preencha todos os campos e selecione a importância.');
                        return; 
                    }

                    const dadosParaEnviar = {
                        DataListada: data,
                        itens:[{
                            TarefasListada: tarefa,
                            nivelImportancia: nivelImportancia, 
                            concluida: false
                        }]
                    };

                    fetch('http://localhost:3000/dados', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dadosParaEnviar)
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        alert('Tarefa adicionada com sucesso!');
                        this.reset(); 
                        nivelImportancia = null; 
                        document.querySelectorAll('.inputs-importancia input[type="radio"]').forEach(radio => radio.checked = false);
                        exibirTarefas(); 
                    })
                });
            }

            const btnCancelar = document.getElementById('btnCancelar'); 
            if (btnCancelar) {
                btnCancelar.addEventListener('click', function () {
                    const addTarefasFormToReset = document.getElementById('AddTarefas');
                    if (addTarefasFormToReset) {
                        addTarefasFormToReset.reset();
                    }
                    nivelImportancia = null;
                    document.querySelectorAll('.inputs-importancia input[type="radio"]').forEach(radio => radio.checked = false);
                });
            }
        }); 