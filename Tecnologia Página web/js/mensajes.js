const chats = document.querySelector(".chats")
const mensajes = document.querySelector(".chat")
let cont = 2

function abrirChat(li) {
    const nombre = li.querySelector("span").textContent

    mensajes.innerHTML = `
        <div class="chat-header">
            <span class="nombre-chat">${nombre}</span>
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

    if (nombre != "Grupo - Tecnologia") {
        const lugar = mensajes.querySelector(".chat-mensajes")
        const nom = new FormData()
        nom.append("nombreR", nombre)

        fetch("/php/verMensajes.php", {
                method: 'POST',
                body: nom
            })
            .then(a => a.json())
            .then(msgs => {
                msgs.forEach(msg => {
                    const mens = document.createElement("div")
                    mens.classList.add("mensaje")
                    if (msg[2] == nombre) {
                        mens.classList.add("recibido")
                        mens.dataset.author = msg[2]
                    } else {
                        mens.classList.add("enviado")
                        mens.dataset.author = "Tú"
                    }
                    mens.innerHTML = msg[1]
                    lugar.appendChild(mens)
                })
            })

    } else {
        fetch("/php/verAdmin.php")
            .then(a => a.text())
            .then(esOno => {
                
                if (esOno == "1") {
                    const chatInput = mensajes.querySelector(".chat-input")
                    const pollBtn = document.createElement("button")
                    pollBtn.type = "button"
                    pollBtn.className = "btn-poll"
                    pollBtn.innerHTML = "📊"
                    chatInput.insertBefore(pollBtn, chatInput.querySelector("#btnEnviar"))

                    const pollForm = document.createElement("form")
                    pollForm.className = "mensaje encuesta enviado poolEnviar oculto"
                    pollForm.innerHTML = `
                        <label for="titulo">Titulo</label>
                        <input name="titulo" class="escribirOp" type="text" placeholder="Añade un titulo" required>
                        <div class="opciones">
                            <label for="opcion">Opciones</label>
                            <input name="opcion" class="escribirOp" type="text" placeholder="Escribe una opción..." required>
                        </div>
                        <div class="nueva-opcion">
                            <button type="button" class="btn-agregar-opcion botoncito">➕ Añadir opción</button>
                        </div>
                        <div class="boton-enviar-encuesta">
                            <button type="submit" class="botoncito pa">Enviar encuesta</button>
                        </div>
                    `
                    mensajes.insertBefore(pollForm, chatInput)
                }

                const lugar = mensajes.querySelector(".chat-mensajes")
                const nom = new FormData()
                nom.append("nombreR", nombre)

                fetch("/php/verMensajesGrupo.php")
                    .then(a => a.json())
                    .then(elementos => {
                        lugar.innerHTML = '' 
                        elementos.forEach(el => {
                            if (el.tipo === 'mensaje') {
                                const mens = document.createElement("div")
                                mens.classList.add("mensaje")
                                if (el.nombreEmisor === el.nombreUsuario) {
                                    mens.classList.add("enviado")
                                    mens.dataset.author = "Tú"
                                } else {
                                    mens.classList.add("recibido")
                                    mens.dataset.author = el.nombreEmisor
                                }
                                mens.innerHTML = el.contenido
                                lugar.appendChild(mens)
                            } else if (el.tipo === 'pool') {
                                const pol = document.createElement("div")
                                pol.classList.add("mensaje", "encuesta")
                                pol.dataset.id = el.idR

                                let contenidoHTML = `<p><strong>📊 Encuesta:</strong> ${el.titulo}</p><div class="opciones">`

                                el.opciones.forEach(op => {
                                    contenidoHTML += `<span class="votoss">${op.votos}</span> <button class"opt" data-id="${op.id_opcion}">${op.opcion}</button>`
                                })
                                contenidoHTML += '</div>'
                                pol.innerHTML = contenidoHTML
                                if (el.nombreEmisor === el.nombreUsuario) {
                                    pol.classList.add("enviado")
                                    pol.dataset.author = "Tú"
                                } else {
    
                                    pol.classList.add("recibido")
                                    pol.dataset.author = el.nombreEmisor
                                }

                                lugar.appendChild(pol)
                                agregarListenersEncuestas(pol)
                            }
                        })
                    })
            })
    }


                    
                    
            
    
    quitarActivo()
    li.classList.add("activo")

    const ultimoChat = new FormData()
    ultimoChat.append('actual', li.dataset.chat)
    fetch("/php/guardarChatActivo.php", {
        method: 'POST',
        body: ultimoChat
    })
}

fetch("/php/verChats.php")
    .then(res => res.json())
    .then(lista => {
        const liG = document.createElement("li")
        liG.dataset.chat = `chat1`
        liG.className = "cha"
        liG.innerHTML = `<span>Grupo - Tecnologia</span>`
        chats.appendChild(liG)
        liG.addEventListener("click", () => abrirChat(liG))

        lista.forEach(nombre => {
            if (nombre.nombre != "Grupo - Tecnologia") {
                const li = document.createElement("li")
                li.dataset.chat = `chat${cont}`
                li.className = "cha"
                li.innerHTML = `<span>${nombre.nombre}</span>`
                chats.appendChild(li)

                li.addEventListener("click", () => abrirChat(li))

                fetch("/php/cargarChatActivo.php")
                    .then(a => a.text())
                    .then(activo => {
                        if (activo === li.dataset.chat) {
                            abrirChat(li)
                        }
                    })

                cont++
            }
        })
        fetch("/php/cargarChatActivo.php")
            .then(a => a.text())
            .then(activo => {
                if (activo == liG.dataset.chat) {
                    abrirChat(liG)
                }
            })
        const listaChats = document.querySelectorAll(".chats li")
        const inputBuscar = document.getElementById("buscarPersona")
        inputBuscar.addEventListener("keyup", () => {
            const texto = inputBuscar.value.toLowerCase()
            listaChats.forEach(busc => {
                const nombre = busc.innerText.toLowerCase()
                if (!nombre.includes(texto)) {
                    busc.classList.add("oculto")
                } else {
                    busc.classList.remove("oculto")
                }
            })
        })
    })

mensajes.addEventListener("click", (e) => {

    if (e.target.closest(".btn-poll")) {
        const llenarPool = mensajes.querySelector(".poolEnviar")
        llenarPool.classList.toggle("oculto")
        e.stopPropagation()
    }
    if (e.target.closest(".btn-agregar-opcion")) {
        const eldi = e.target.closest("form").querySelector(".opciones")
        const opNueva = document.createElement("input")
        opNueva.classList.add("escribirOp")
        opNueva.setAttribute("type", "text")
        opNueva.setAttribute("placeholder", "Escribe una opción...")
        opNueva.setAttribute("required", "")
        eldi.appendChild(opNueva)
        e.stopPropagation()
    }
     
})

mensajes.addEventListener("submit", (e) => {
    const form = e.target.closest("form")

    if (form.classList.contains("chat-input")) {
        e.preventDefault()
        const mensaje = form.querySelector('input').value
        const chatActivo = document.querySelector(".chats li.activo span").textContent
        const data = new FormData(form)
        data.append('nombreR', chatActivo)
        fetch("/php/guardarMensajes.php", {
            method: "POST",
            body: data
        })
        form.querySelector('input').value = ''
        const lugar = mensajes.querySelector(".chat-mensajes")
        const mens = document.createElement("div")
        mens.classList.add("mensaje")
        mens.classList.add("enviado")
        mens.dataset.author = "Tú"
        mens.innerHTML = mensaje
        lugar.appendChild(mens)
    } else if (form.classList.contains("poolEnviar")) {
        e.preventDefault()
        const titulo = form.querySelector('input[name="titulo"]').value
        const opcionesInputs = form.querySelectorAll('div.opciones input.escribirOp')
        const infoPool = new FormData(form)

        let opcionesValidas = true
        opcionesInputs.forEach(input => {
            if (input.value.trim() === "") {
                opcionesValidas = false
            }
            infoPool.append('opciones[]', input.value)
        })
        fetch("/php/ultIdPool.php")
            .then(a => a.text())
            .then(iid => {
                infoPool.append('subidoDesp', iid)
                return fetch("/php/guardarPool.php", {
                    method: 'POST',
                    body: infoPool
                })
            })
            .then(resp => {
                alert("Pool enviada")
                window.location.href = "/Mensajes/mensajes.html"
            })
    }
})

function quitarActivo() {
    document.querySelectorAll(".chats li").forEach(c => c.classList.remove("activo"))
}


function agregarListenersEncuestas(encuesta) {
    encuesta.addEventListener("click", (e) => {
        const opcionBoton = e.target.closest(".opciones button")
        if (opcionBoton) {
            const idOpcion = opcionBoton.dataset.id
            const idEncuesta = encuesta.dataset.id
            
            
            const todosLosBotones = encuesta.querySelectorAll(".opciones button")
            todosLosBotones.forEach(btn => btn.classList.remove("botonActivo"))

            const voto = new FormData()
            voto.append('idO', idOpcion)
            voto.append('idP', idEncuesta)

            fetch("/php/guardarVotoPool.php", {
                method: 'POST',
                body: voto
            })
            .then(a => a.text())
            .then(result => {
                
                switch(result){
                    case "I":
                        opcionBoton.classList.add("botonActivo")
                    case "U":
                        opcionBoton.classList.add("botonActivo")
                    case "D":
                        
                }
                

                

            })
            .catch(error => console.error('Error al guardar el voto:', error))
        }
    })
}
