// Cambiar entre chats
const listaChats = document.querySelectorAll(".lista-conversaciones li");
const chats = document.querySelectorAll(".chat-mensajes");
const nombreChat = document.querySelector(".nombre-chat");

listaChats.forEach(item => {
  item.addEventListener("click", () => {
    listaChats.forEach(li => li.classList.remove("activo"));
    item.classList.add("activo");

    chats.forEach(c => c.classList.add("oculto"));
    const chatId = item.getAttribute("data-chat");
    document.getElementById(chatId).classList.remove("oculto");

    nombreChat.textContent = item.querySelector("span").textContent;
  });
});

// Enviar mensajes
const btnEnviar = document.getElementById("btnEnviar");
const inputMensaje = document.getElementById("inputMensaje");

btnEnviar.addEventListener("click", () => {
  if (inputMensaje.value.trim() !== "") {
    const activo = document.querySelector(".lista-conversaciones li.activo").getAttribute("data-chat");
    const chatActivo = document.getElementById(activo);

    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.classList.add("mensaje", "enviado");
    nuevoMensaje.textContent = inputMensaje.value;

    chatActivo.appendChild(nuevoMensaje);
    chatActivo.scrollTop = chatActivo.scrollHeight;

    inputMensaje.value = "";
  }
});

// Emojis
const btnEmoji = document.querySelector(".btn-emoji");
const emojiPanel = document.getElementById("emojiPanel");

btnEmoji.addEventListener("click", () => {
  emojiPanel.classList.toggle("oculto");
});

// Insertar emoji en input
emojiPanel.addEventListener("click", (e) => {
  if (e.target.textContent) {
    inputMensaje.value += e.target.textContent;
  }
});
