const usuarioLogadoId = 3;
const url = "http://localhost:3000/usuarios";

// Carregar dados do usuário no formulário
window.onload = async function() {
  try {
    const resposta = await fetch(`${url}/${usuarioLogadoId}`);
    const usuario = await resposta.json();

    if (usuario) {
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("email").value = usuario.email;
      document.getElementById("senha").value = usuario.senha;
      document.getElementById("inputFoto").value = usuario.foto;
    }
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
  }
};

// Atualizar dados no JSON Server ao salvar
async function salvarPerfil() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const foto = document.getElementById("inputFoto").value;

  const dadosAtualizados = {
    nome,
    email,
    senha,
    foto
  };

  try {
    const resposta = await fetch(`${url}/${usuarioLogadoId}`, {
      method: "PATCH", // PATCH atualiza apenas os campos enviados
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosAtualizados)
    });

    if (resposta.ok) {
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar perfil.");
    }
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
  }
}

// Trocar imagem de perfil
function editarFoto() {
  document.getElementById("inputFoto").click();
}

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
