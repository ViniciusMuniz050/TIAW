const usuarioLogadoId = sessionStorage.getItem("usuarioLogadoId");
const apiUrl = "http://localhost:3000/usuarios";

// Verifica se há usuário logado
if (!usuarioLogadoId) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "/login.html";
}

// Carregar dados do usuário quando a página abrir
window.onload = function () {
  fetch(`${apiUrl}/${usuarioLogadoId}`)
    .then(res => res.json())
    .then(usuario => {
      document.getElementById("login").value = usuario.login || "";
      document.getElementById("email").value = usuario.email || "";
      document.getElementById("senha").value = usuario.senha || "";

      const foto = usuarios.foto || "/assets/images/usuario.png";
      document.getElementById("fotoPerfilHeader").src = foto;
      document.getElementById("fotoPerfilMain").src = foto;
    })
    .catch(err => {
      console.error("Erro ao carregar dados do usuário:", err);
      alert("Erro ao carregar dados do usuário.");
    });
};

// Variável global para armazenar temporariamente a imagem em base64
let imagemBase64 = "";

// Atualiza visualização da nova imagem e armazena base64
document.getElementById("inputFoto").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagemBase64 = e.target.result;
      document.getElementById("fotoPerfilHeader").src = imagemBase64;
      document.getElementById("fotoPerfilMain").src = imagemBase64;
    };
    reader.readAsDataURL(file);
  }
});

// Salvar as alterações no perfil
function salvarPerfil() {
  const login = document.getElementById("login").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const fotoAtual = imagemBase64 || document.getElementById("fotoPerfilMain").src;

  const dadosAtualizados = {
    login,
    email,
    senha,
    foto: fotoAtual
  };

  fetch(`${apiUrl}/${usuarioLogadoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro na resposta do servidor");
      return res.json();
    })
    .then(() => {
      alert("Perfil atualizado com sucesso!");
    })
    .catch(err => {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil.");
    });
}

// Função para acionar o input da imagem
function editarFoto() {
  document.getElementById("inputFoto").click();
}
