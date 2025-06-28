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
      "pagina": "Calendário",
      "imagem": "assets/images/calendario.png",
      "detalhes": "Acompanhe quais dias você interagiu e completou tarefas, marque datas e compromissos.",
      "link": "metas.html"
    },
    {
      "id": 3,
      "pagina": "Progresso",
      "imagem": "assets/images/progresso.png",
      "detalhes": "Veja suas estatísticas e acompanhe sua evolução ao longo dos dias.",
      "link": "retrospecto.html"
    },
    {
      "id": 4,
      "pagina": "Configurações",
      "imagem": "assets/images/configuracoes.jpg",
      "detalhes": "Personalize sua experiência ajustando preferências e dados de perfil.",
      "link": "muda_perfil.html"
    },
    {
      "id": 5,
      "pagina": "Saiba mais",
      "imagem": "assets/images/SaibaMais.png",
      "detalhes": "Entenda como a procrastinação afeta sua produtividade e como combatê-la.",
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

// Login/Logout controle
document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(sessionStorage.getItem('usuario'));
  const loginSection = document.getElementById('loginSection');
  const logoutSection = document.getElementById('logoutSection');
  const logoutBtn = document.getElementById('logoutBtn');
  const nomeUsuario = document.getElementById('nomeUsuario');

  if (usuarioLogado) {
    loginSection.style.display = 'none';
    logoutSection.style.display = 'flex';
    nomeUsuario.textContent = `Olá, ${usuarioLogado.login || usuarioLogado.nome || 'usuário'}`;
  } else {
    loginSection.style.display = 'flex';
    logoutSection.style.display = 'none';
  }

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('usuario');
    window.location.reload();
  });
});
