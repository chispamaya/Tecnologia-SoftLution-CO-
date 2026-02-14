// CHATS Y DRAFTS
const chats = {
  chat1: [],
  chat2: [],
  chat3: []
};
const drafts = {
  chat1: '',
  chat2: '',
  chat3: ''
};

const listaChats = document.querySelectorAll(".lista-conversaciones ul li");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");
const chatMensajes = document.querySelector(".chat-mensajes");
let chatActivoId = "chat1";

// FILTRAR CHATS POR NOMBRE
const inputBuscar = document.getElementById("buscarPersona");
inputBuscar.addEventListener("keyup", () => {
  const texto = inputBuscar.value.toLowerCase();
  listaChats.forEach(li => {
    const nombre = li.innerText.toLowerCase();
    li.style.display = nombre.includes(texto) ? "flex" : "none";
  });
});

// FUNCIONES
function renderChat(id) {
  chatMensajes.innerHTML = '';
  chats[id].forEach(msg => {
    const div = document.createElement('div');
    div.className = `mensaje ${msg.tipo}`;
    div.textContent = msg.texto;
    chatMensajes.appendChild(div);
  });
  inputMensaje.value = drafts[id] || '';
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// CAMBIAR CHAT
listaChats.forEach(li => {
  li.addEventListener("click", () => {
    drafts[chatActivoId] = inputMensaje.value;
    listaChats.forEach(l => l.classList.remove("activo"));
    li.classList.add("activo");
    chatActivoId = li.dataset.chat;
    renderChat(chatActivoId);
    document.querySelector(".chat-header .nombre-chat").textContent = li.innerText;
  });
});

// ENVIAR MENSAJE
btnEnviar.addEventListener("click", () => {
  const texto = inputMensaje.value.trim();
  if (!texto) return;
  chats[chatActivoId].push({tipo:'enviado', texto});
  drafts[chatActivoId] = '';
  renderChat(chatActivoId);
});

// GUARDAR DRAFT MIENTRAS ESCRIBO
inputMensaje.addEventListener("input", () => {
  drafts[chatActivoId] = inputMensaje.value;
});

// INICIAL
renderChat(chatActivoId);
