// Evento principal ao enviar o questionário
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();

            const idade = formulario.idade.value.trim();
            const qnttarefas = formulario.qnttarefas.value;
            const perfil = document.querySelector('input[name="perfil"]:checked');
            const objetivo = document.querySelector('input[name="objetivo"]:checked');
            const distracao = document.querySelector('input[name="distracao"]:checked');

            if (!idade || !qnttarefas || !perfil || !objetivo || !distracao) {
                alert("Dados incompletos. Certifique-se de responder completamente o questionário.");
                return;
            }

            if (idade > 100 || idade <= 0) {
                alert("Sua idade não parece certa... Tente novamente!");
                return;
            }

            const onboarding = {
                idade: idade,
                qnttarefas: qnttarefas,
                perfil: perfil.value,
                objetivo: objetivo.value,
                distracao: distracao.value
            };

            // Recupera o usuário logado do sessionStorage
            const usuarioSalvo = JSON.parse(sessionStorage.getItem('usuario'));
            if (!usuarioSalvo || !usuarioSalvo.id) {
                alert("Erro: Usuário não está logado.");
                return;
            }

            const usuarioLogadoId = usuarioSalvo.id;

            // Envia PATCH com as respostas para o JSON Server
            fetch(`http://localhost:3000/usuarios/${usuarioLogadoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ onboarding })
            })
                .then(res => {
                    if (res.ok) {
                        alert('Respostas salvas com sucesso!');
                        window.location.href = 'onboarding.html';
                    } else {
                        throw new Error('Erro ao salvar respostas');
                    }
                })
                .catch(error => {
                    console.error('Erro ao salvar onboarding:', error);
                    alert('Erro ao salvar as respostas.');
                });
        });
    }
});

// Carrega respostas do usuário logado e exibe na tela
function carrega() {
    const usuarioSalvo = JSON.parse(sessionStorage.getItem('usuario'));
    if (!usuarioSalvo || !usuarioSalvo.id) {
        alert("Erro: Usuário não está logado.");
        return;
    }

    const usuarioLogadoId = usuarioSalvo.id;

    fetch(`http://localhost:3000/usuarios/${usuarioLogadoId}`)
        .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
            return res.json();
        })
        .then(usuario => {
            const onboarding = usuario.onboarding;
            if (!onboarding) {
                alert("Nenhum dado de onboarding encontrado.");
                return;
            }

            const tela = document.getElementById('tela');
            if (!tela) return;

            tela.innerHTML += `
                <div class="bloco">
                    <h2>Questão 01</h2>
                    <p><strong>Sua idade:</strong> ${onboarding.idade}</p>
                </div>

                <div class="bloco">
                    <h2>Questão 02</h2>
                    <p><strong>Quantas tarefas por dia:</strong> ${onboarding.qnttarefas}</p>
                </div>

                <div class="bloco">
                    <h2>Questão 03</h2>
                    <p><strong>Perfil mais identificado:</strong> ${onboarding.perfil}</p>
                </div>

                <div class="bloco">
                    <h2>Questão 04</h2>
                    <p><strong>Principal objetivo:</strong> ${onboarding.objetivo}</p>
                </div>

                <div class="bloco">
                    <h2>Questão 05</h2>
                    <p><strong>Você se distrai facilmente?</strong> ${onboarding.distracao}</p>
                </div>

                <button id="salvarFinal" onclick="finalizarOnboarding()">Ir para página inicial</button>
            `;
        })
        .catch(error => {
            console.error("Erro ao carregar dados do usuário:", error);
            alert("Erro ao carregar as respostas.");
        });
}

// Redireciona para editar o questionário
function editarDados() {
    alert("Você escolheu editar as informações...");
    window.location.href = '/questionario.html';
}

// Finaliza e leva à página inicial
function finalizarOnboarding() {
    window.location.href = '/index.html';
}