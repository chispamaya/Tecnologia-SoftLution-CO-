/*
const chats = document.querySelector(".chats")
var cont = 1
fetch("/php/verChats.php")
.then(a => a.json())
.then(lista => {
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
        
        <form class="chat-input">
        <button class="btn-emoji"><i class="fa-regular fa-face-smile"></i></button>
        <input type="text" name="inputMensaje" placeholder="Escribe un mensaje...">
        <button type="submit" id="btnEnviar"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        
        <div class="emoji-panel oculto" id="emojiPanel">
        😀 😁 😂 🤣 😍 😎 😢 😡 👍 👎 🙌 👀 ❤️ 🔥
        </div>
        `
        quitarActivo()
        elChat.classList.add("activo")
        var ultimoChat = new FormData()
        ultimoChat.append('actual', elChat.dataset.chat)
        fetch("/php/guardarChatActivo.php", {
            method: 'POST',
            body: ultimoChat
        })
        const btnEmoji = mensajes.querySelector(".btn-emoji")
        const panelEmoji = mensajes.querySelector(".emoji-panel")
        btnEmoji.addEventListener("click", () => {
            panelEmoji.classList.toggle("oculto")
        })
        const formMensaje = mensajes.querySelector(".chat-input")
            formMensaje.addEventListener("submit", (ev) =>{
            ev.preventDefault()
            var infos = new FormData(formMensaje)
            infos.append('nombreR', elChat.dataset.chat)
            fetch("/php/guardarMensajes.php", {
                method: 'post',
                body: infos
            })
        })
    })
    
    chats.innerHTML = ''
    lista.forEach(nombre => {
        var agregar = document.createElement('li')
        agregar.dataset.chat = `chat${cont}`
        agregar.className = "cha"
        fetch("/php/cargarChatActivo.php")
        .then(a => a.text())
                .then(activo => {
                    if (activo) {
                        if (activo == agregar.dataset.chat) {
                            agregar.className = "activo"
                            mensajes.innerHTML = `
                            <div class="chat-header">
                            <span class="nombre-chat">${nombre.nombre}</span>
                                </div>
                            <div class="chat-mensajes" id="chat1"></div>
                            
                            <form class="chat-input">
                            <button class="btn-emoji"><i class="fa-regular fa-face-smile"></i></button>
                            <input type="text" name="inputMensaje" placeholder="Escribe un mensaje...">
                            <button  type="submit" id="btnEnviar"><i class="fa-solid fa-paper-plane"></i></button>
                            </form>
    
                            <div class="emoji-panel oculto" id="emojiPanel">
                            😀 😁 😂 🤣 😍 😎 😢 😡 👍 👎 🙌 👀 ❤️ 🔥
                            </div>
                            `

                        }
                    }
                    else {
                        
                    }
                })
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
        


    })

function quitarActivo() {
    var chats = document.querySelectorAll(".chats li")
    chats.forEach(chat => {
        chat.classList.remove("activo")
    })
}

*/

const chats = document.querySelector(".chats")
const mensajes = document.querySelector(".chat")
let cont = 1

fetch("/php/verChats.php")
.then(res => res.json())
.then(lista => {

    chats.addEventListener("click", (e) => {
        const elChat = e.target.closest(".cha")
        if (!elChat) return
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
                😀 😁 😂 🤣 😍 😎 😢 😡 👍 👎 🙌 👀 ❤️ 🔥
            </div>
        `

        quitarActivo()
        elChat.classList.add("activo")

        const ultimoChat = new FormData()
        ultimoChat.append('actual', elChat.dataset.chat)
        fetch("/php/guardarChatActivo.php", { method: 'POST', body: ultimoChat })

        const btnEmoji = mensajes.querySelector(".btn-emoji")
        const panelEmoji = mensajes.querySelector(".emoji-panel")
        btnEmoji.addEventListener("click", () => panelEmoji.classList.toggle("oculto"))
    })

    lista.forEach(nombre => {
        const li = document.createElement("li")
        li.dataset.chat = `chat${cont}`
        li.className = "cha"
        li.innerHTML = `<span>${nombre.nombre}</span>`
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
