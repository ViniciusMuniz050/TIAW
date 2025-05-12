// Simulando banco de dados em memória
const dados = {
    usuarios: [
      {
        id: 1,
        login: "admin",
        senha: "123",
        nome: "Administrador do Sistema",
        email: "admin@abc.com"
      },
      {
        id: 2,
        login: "user",
        senha: "123",
        nome: "Usuario Comum",
        email: "user@abc.com"
      },
      {
        id: 3,
        login: "rommel",
        senha: "123",
        nome: "Rommel",
        email: "rommel@gmail.com"
      }
    ]
  };
  
  // Simulando usuário logado
  const usuarioLogadoId = 3;
  
  // Carregar dados do usuário no formulário
  window.onload = function() {
    const usuario = dados.usuarios.find(u => u.id === usuarioLogadoId);
    if (usuario) {
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("email").value = usuario.email;
      document.getElementById("senha").value = usuario.senha;
    }
  };
  
  // Atualizar JSON em memória ao salvar
  function salvarPerfil() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    const usuario = dados.usuarios.find(u => u.id === usuarioLogadoId);
    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.senha = senha;
  
      console.log("Usuário atualizado:", usuario);
      alert("Perfil atualizado com sucesso!");
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
        document.getElementById("fotoPerfil").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  