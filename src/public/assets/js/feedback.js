const estrelas = document.querySelectorAll('.star');
const botaoEnviar = document.getElementById('enviar');
const campoComentario = document.getElementById('comentario');
const mensagem = document.getElementById('mensagem');

let nota = 0;

// Selecionar estrelas
estrelas.forEach((estrela) => {
    estrela.addEventListener('click', () => {
        nota = parseInt(estrela.getAttribute('data-value'));
        atualizarEstrelas(nota);
    });
});

function atualizarEstrelas(notaSelecionada) {
    estrelas.forEach((estrela) => {
        if (parseInt(estrela.getAttribute('data-value')) <= notaSelecionada) {
            estrela.classList.add('selecionada');
        } else {
            estrela.classList.remove('selecionada');
        }
    });
}

// Evento de envio
botaoEnviar.addEventListener('click', () => {
    const comentario = campoComentario.value.trim();

    if (nota === 0) {
        mensagem.textContent = 'Por favor, selecione uma nota.';
        return;
    }

    if (comentario === '') {
        mensagem.textContent = 'Por favor, escreva um comentário.';
        return;
    }

    console.log('Nota:', nota);
    console.log('Comentário:', comentario);

    mensagem.textContent = 'Obrigado pelo seu feedback!';

    // Limpar campos após enviar
    nota = 0;
    atualizarEstrelas(nota);
    campoComentario.value = '';
});
