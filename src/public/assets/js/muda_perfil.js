// Obter ID do usuário logado dinamicamente
const usuarioLogadoId = localStorage.getItem("usuarios.Id");
const apiUrl = "http://localhost:3000/usuarios";

// Verifica se há usuário logado
if (!usuarios.Id) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "login.html";
}

// Carregar dados do usuário quando a página abrir
window.onload = function () {
  fetch(`${apiUrl}/${usuarioLogadoId}`)
    .then(res => res.json())
    .then(usuario => {
      document.getElementById("login").value = usuario.login;
      document.getElementById("email").value = usuario.email;
      document.getElementById("senha").value = usuario.senha;
      document.getElementById("fotoPerfilHeader").src = usuario.foto;
      document.getElementById("fotoPerfilMain").src = usuario.foto;
    })
    .catch(err => {
      console.error("Erro ao carregar dados do usuário:", err);
      alert("Erro ao carregar dados do usuário.");
    });
};

// Salvar as alterações no perfil
function salvarPerfil() {
  const login = document.getElementById("login").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const foto = document.getElementById("fotoPerfilMain").src;

  fetch(`${apiUrl}/${usuarioLogadoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, email, senha, foto })
  })
    .then(res => res.json())
    .then(() => {
      alert("Perfil atualizado com sucesso!");
    })
    .catch(err => {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil.");
    });
}

// Função para trocar foto de perfil
function editarFoto() {
  document.getElementById("inputFoto").click();
}

// Atualiza visualização da nova imagem
document.getElementById("inputFoto").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("fotoPerfilHeader").src = e.target.result;
      document.getElementById("fotoPerfilMain").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
