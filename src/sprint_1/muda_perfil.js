// Definir ID do usuário logado (pode ser dinâmico futuramente)
const usuarioLogadoId = 3;
const apiUrl = "http://localhost:3000/usuarios";

// Carregar dados do usuário quando a página abrir
window.onload = function() {
  fetch(`${apiUrl}/${usuarioLogadoId}`)
    .then(res => res.json())
    .then(usuario => {
      document.getElementById("nome").value = usuario.nome;
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
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const foto = document.getElementById("fotoPerfilMain").src;

  fetch(`${apiUrl}/${usuarioLogadoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha, foto })
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

// Ao selecionar uma nova foto, atualiza a visualização
document.getElementById("inputFoto").addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("fotoPerfilHeader").src = e.target.result;
      document.getElementById("fotoPerfilMain").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
