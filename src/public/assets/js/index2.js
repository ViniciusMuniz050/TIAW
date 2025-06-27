
let usuarios = null;

function loginUser (login, password){
    const usuarioObj = dados.usuarios.find(elem => (elem.login === login) && (elem.senha === password))

    if(!usuarioObj)
        return false;
    else{
        sessionStorage.setItem(`usuarioLogadoId`, JSON.stringify(usuarioObj))
        return true;
    }
} 

function logoutUser(){
    sessionStorage.clear()
    location.href = "login.html"
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarioId = sessionStorage.getItem('usuarioLogadoId');
    
    if (!usuarioId) {
      alert('Sessão expirada. Faça login novamente.');
      window.location.href = "/modulos/login/login.html";
      return;
    }
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


const informacoes = {
  "Carrossel": [
    {
      "id": 1,
      "pagina": "Missões",
      "imagem": "assets/images/missoes.png",
      "detalhes": "Aqui você acessa suas missões diárias sendo necessário conclui-las para receber pontos",
      "link": "missoes.html"
    },
    {
      "id": 2,
      "pagina": "calendário",
      "imagem": "assets/images/calendario.png",
      "detalhes": "Aqui no calendário você poderá acompanhar quais dias você interagiu e completou as tarefas do site, além de marcar datas, compromissos, ou relatar algo que ocorreu no dia, dentre outros...",
      "link": "metas.html"
    },
    {
      "id": 3,
      "pagina": "Progresso",
      "imagem": "assets/images/progresso.png",
      "detalhes": "Aqui você pode avaliar como tem percorrido os dias dentro do desafio e as estatísticas acerca desse progresso.",
      "link": "retrospecto.html"
    },
    {
      "id": 4,
      "pagina": "Configurações",
      "imagem": "assets/images/configuracoes.jpg",
      "detalhes": "Aqui você acessa as configurações do site, para deixar sua experiência a melhor possível.",
      "link": "muda_perfil.html"
    },
    {
      "id": 5,
      "pagina": "Saiba mais",
      "imagem": "assets/images/SaibaMais.png",
      "detalhes": "Aqui você fica informado sobre como funciona a procastinação e como ela afeta diretamente a sua vida",
      "link": "sobre.html"
    }
  ]
};

const carrossel = document.getElementById("carrossel");

informacoes.Carrossel.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.imagem}" alt="${item.pagina}" />
    <h2>${item.pagina}</h2>
    <p>${item.detalhes}</p>
    ${item.link ? `<a href="${item.link}">Acessar</a>` : ""}
  `;
  carrossel.appendChild(card);
});

let index = 0;

const updateCarousel = () => {
  carrossel.style.transform = `translateX(-${index * 100}%)`;
};

document.getElementById("nextBtn").addEventListener("click", () => {
  if (index < informacoes.Carrossel.length - 1) {
    index++;
    updateCarousel();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});


setInterval(() => {
  index = (index + 1) % informacoes.Carrossel.length;
  updateCarousel();
}, 5000); 


