document.addEventListener('DOMContentLoaded', () => {
    //MUDANO LOGICA DE LOGIN, buscanco login pelo id salvo no sessionStorage
   fetch(`http://localhost:3000/usuarios/${usuarioId}`)
        .then(res => res.json())
        .then(usuarioLogado => {
            const nomeUsuarioSpan = document.getElementById('nomeUsuario');
            if (nomeUsuarioSpan && usuarioLogado) {
                nomeUsuarioSpan.textContent = `Olá, ${usuarioLogado.login}`;
            }
        })
        .catch(error => console.error("Erro ao buscar dados do usuário:", error));
  });