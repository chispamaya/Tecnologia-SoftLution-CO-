const chats = document.querySelector(".chats")
const mensajes = document.querySelector(".chat")
let cont = 1

fetch("/php/verChats.php")
    .then(res => res.json())
    .then(lista => {

        chats.addEventListener("click", (e) => {
            const elChat = e.target.closest(".cha")
            const n = elChat.querySelector("span").textContent

            mensajes.innerHTML = `
            <div class="chat-header">
                <span class="nombre-chat">${n}</span>
            </div>
            <div class="chat-mensajes" id="chat1"></div>
            
            <form class="chat-input">
                <button type="button" class="btn-emoji"><i class="fa-regular fa-face-smile"></i></button>
                <input type="text" name="inputMensaje" placeholder="Escribe un mensaje...">
                <button type="submit" id="btnEnviar"><i class="fa-solid fa-paper-plane"></i></button>
            </form>

            <div class="emoji-panel oculto" id="emojiPanel">
                <span>😀</span>
                <span>😁</span>
                <span>😂</span>
                <span>🤣</span>
                <span>😍</span>
                <span>😎</span>
                <span>😢</span>
                <span>😡</span>
                <span>👍</span>
                <span>👎</span>
                <span>🙌</span>
                <span>👀</span>
                <span>❤️</span>
                <span>🔥</span>
            </div>
        `

            quitarActivo()
            elChat.classList.add("activo")

            const ultimoChat = new FormData()
            ultimoChat.append('actual', elChat.dataset.chat)
            fetch("/php/guardarChatActivo.php", {
                method: 'POST',
                body: ultimoChat
            })

            const btnEmoji = mensajes.querySelector(".btn-emoji")
            const panelEmoji = mensajes.querySelector(".emoji-panel")
            btnEmoji.addEventListener("click", () => panelEmoji.classList.toggle("oculto"))
            const inputMensaje = mensajes.querySelector('input')
            panelEmoji.addEventListener('click', (e) => {
                if (e.target.tagName == 'SPAN') {
                    inputMensaje.value += e.target.textContent
                }
            })
        })

        lista.forEach(nombre => {
            const li = document.createElement("li")
            li.dataset.chat = `chat${cont}`
            li.className = "cha"
            li.innerHTML = `<span>${nombre.nombre}</span>`
            fetch("/php/cargarChatActivo.php")
                .then(a => a.text())
                .then(activo => {
                    if (activo) {
                        if (activo == li.dataset.chat) {
                            mensajes.innerHTML = `
                        <div class="chat-header">
                            <span class="nombre-chat">${nombre.nombre}</span>
                        </div>
                        <div class="chat-mensajes" id="chat1"></div>
                        
                        <form class="chat-input">
                            <button type="button" class="btn-emoji"><i class="fa-regular fa-face-smile"></i></button>
                            <input type="text" name="inputMensaje" placeholder="Escribe un mensaje...">
                            <button type="submit" id="btnEnviar"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>

                        <div class="emoji-panel oculto" id="emojiPanel">
                            <span>😀</span>
                            <span>😁</span>
                            <span>😂</span>
                            <span>🤣</span>
                            <span>😍</span>
                            <span>😎</span>
                            <span>😢</span>
                            <span>😡</span>
                            <span>👍</span>
                            <span>👎</span>
                            <span>🙌</span>
                            <span>👀</span>
                            <span>❤️</span>
                            <span>🔥</span>
                        </div>
                    `
                            li.className = "activo"
                            const btnEmoji = mensajes.querySelector(".btn-emoji")
                            const panelEmoji = mensajes.querySelector(".emoji-panel")
                            btnEmoji.addEventListener("click", () => panelEmoji.classList.toggle("oculto"))
                            const inputMensaje = mensajes.querySelector('input')
                            panelEmoji.addEventListener('click', (e) => {
                                if (e.target.tagName == 'SPAN') {
                                    inputMensaje.value += e.target.textContent
                                }
                            })
                        }
                        nom = new FormData("nombreR", nombre.nombre)
                        fetch("/php/verMensajes.php", {
                            method: 'POST',
                            body: nom
                        })
                        .then(a => a.json())
                        .then(msg => {
                        holiiiiiiii}}}}}}}}}}}}seguir aca
                        })
                    }
                })
            chats.appendChild(li)
            cont++
        })
    })

mensajes.addEventListener("submit", (e) => {
    if (!e.target.classList.contains("chat-input")) return
    e.preventDefault()

    const form = e.target
    const mensaje = form.querySelector('input[name="inputMensaje"]').value
    const chatActivo = document.querySelector(".chats li.activo span").textContent

    const data = new FormData(form)
    data.append('nombreR', chatActivo)

    fetch("/php/guardarMensajes.php", { method: "POST", body: data })
        .then(res => res.text())
        .then(resp => {
            console.log("Mensaje guardado:", resp)
            form.querySelector('input[name="inputMensaje"]').value = ''
        })
})

function quitarActivo() {
    document.querySelectorAll(".chats li").forEach(c => c.classList.remove("activo"))
}
