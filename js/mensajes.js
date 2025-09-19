const chats = document.querySelector(".chats")
var cont = 1
fetch("/php/verChats.php")
    .then(a => a.json())
    .then(lista => {
        chats.innerHTML = ''
        lista.forEach(nombre => {
            var agregar = document.createElement('li')
            agregar.dataset.chat = `chat${cont}`
            agregar.className = "cha"
            var text
            text = `
                <span>${nombre.nombre}</span>
            `
            agregar.innerHTML += text
            chats.appendChild(agregar)
            cont++
        })
        const inputBuscar = document.getElementById("buscarPersona")
        inputBuscar.addEventListener("keyup", () => {
            const listaChats = document.querySelectorAll(".chats li")
            const texto = inputBuscar.value.toLowerCase()
            listaChats.forEach(li => {
                const nombre = li.innerText.toLowerCase()
                if (nombre.includes(texto)) {
                    li.classList.remove("oculto")
                }
                else {
                    li.classList.add("oculto")
                }
            })
        })
        const busChat = document.querySelector('.chats')
        const mensajes = document.querySelector(".chat")
        busChat.addEventListener("click", (e) => {
            var elChat = e.target.closest(".cha")
            n = elChat.textContent

            mensajes.innerHTML = `
            <div class="chat-header">
              <span class="nombre-chat">${n}</span>
            </div>
            <div class="chat-mensajes" id="chat1"></div>
    
            <div class="chat-input">
              <button class="btn-emoji"><i class="fa-regular fa-face-smile"></i></button>
              <input type="text" id="inputMensaje" placeholder="Escribe un mensaje...">
              <button id="btnEnviar"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
    
            <div class="emoji-panel oculto" id="emojiPanel">
              😀 😁 😂 🤣 😍 😎 😢 😡 👍 👎 🙌 👀 ❤️ 🔥
            </div>
            `
            quitarActivo()
            elChat.classList.add("activo")
            const btnEmoji = mensajes.querySelector(".btn-emoji")
            const panelEmoji = mensajes.querySelector(".emoji-panel")
            btnEmoji.addEventListener("click", () => {
                panelEmoji.classList.toggle("oculto")
            })
        })


    })

function quitarActivo() {
    var chats = document.querySelectorAll(".chats li")
    chats.forEach(chat => {
        chat.classList.remove("activo")
    })
}

