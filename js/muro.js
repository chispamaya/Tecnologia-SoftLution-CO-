const muro = document.querySelector(".muro")
var cont = 1
fetch("/php/muro.php")
    .then(d => d.json())
    .then(post => {
        muro.innerHTML = '';
        post.forEach(info => {
            const articulo = document.createElement('article')
            articulo.className = 'publicacion'
            articulo.id = info.id
            var aniadir
            if (info.link == "Sin Link") {
                aniadir = `
                <div class="autor-publicacion">
                    <span class="nombre-autor">${info.nombreUsuario}</span>
                </div>
                <div class="contenido-publicacion">
                    <h2>${info.titulo}</h2>
                    <p>${info.contenido}</p>
                </div>
                <div class="acciones-publicacion">
                    <button type="button" class="btn-accion btn-like"><i class="fa-solid fa-thumbs-up"></i></button>
                    <span class="contador-like">0</span>
                    <button type="button" class="btn-accion btn-dislike"><i class="fa-solid fa-thumbs-down"></i></button>
                    <span class="contador-dislike">0</span>
                    <button type="button" class="btn-accion btn-chat"><i class="fa-solid fa-comment-dots"></i> Comentarios</button>
                </div>
                <div class="comentarios oculto">
                        <form class="comentar">
                            <div class="lista-comentarios"></div>
                            <div class="input-comentario">
                                <input type="text" name="com" placeholder="Escribir comentario..." required>
                                <button type ="submit">Añadir</button>
                            </div>
                        </form>
                        <div class="comentarios-contenedor">
                            <div class="lista-comentarios todos">
                            </div>    
                        </div>
                </div>
            `
            }
            else {
                aniadir = `
                    <div class="autor-publicacion">
                        <span class="nombre-autor">${info.nombreUsuario}</span>
                    </div>
                    <div class="contenido-publicacion">
                        <h2>${info.titulo}</h2>
                        <p>${info.contenido}</p>
                        <a href="${info.link}" class="enlace-publicacion">LINK</a>
                    </div>
                    <div class="acciones-publicacion">
                        <button type="button" class="btn-accion btn-like"><i class="fa-solid fa-thumbs-up"></i></button>
                        <span class="contador-like">0</span>
                        <button type="button" class="btn-accion btn-dislike"><i class="fa-solid fa-thumbs-down"></i></button>
                        <span class="contador-dislike">0</span>
                        <button type="button" class="btn-accion btn-chat"><i class="fa-solid fa-comment-dots"></i> Comentarios</button>
                    </div>  
                    <div class="comentarios oculto">
                        <form class="comentar">
                            <div class="lista-comentarios"></div>
                            <div class="input-comentario">
                                <input type="text" name="com" placeholder="Escribir comentario..." required>
                                <button type ="submit">Añadir</button>
                            </div>
                        </form>
                        <div class="comentarios-contenedor">
                            <div class="lista-comentarios todos">
                                <div class="comentario">
                                    <span class="nombre-usuario">JuanPerez:</span>
                                    <span class="texto-comentario">¡Muy buena publicación!</span>
                                </div>
                                <div class="comentario">
                                    <span class="nombre-usuario">AnaGomez:</span>
                                    <span class="texto-comentario">Gracias por compartir 😊</span>
                                </div>
                                <div class="comentario">
                                    <span class="nombre-usuario">Carlos_1988:</span>
                                    <span class="texto-comentario">Interesante punto de vista</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            var id = new FormData
            articulo.innerHTML = aniadir
            muro.appendChild(articulo)
            id.append('idP', info.id)
            
            fetch("/php/obtenerCom.php", {
                method : 'post',
                body: id
            })
            .then(a => a.json())
            .then (comen => {
                const divi = articulo.querySelector(".todos")
                divi.innerHTML = ''
                comen.forEach( co =>{
                    divi.innerHTML += `
                        <div class="comentario">
                            <span class="nombre-usuario">${co.nombreUsuario}:</span>
                            <span class="texto-comentario">${co.contenido}</span>
                        </div>
                    `

            })
        })
    
            var id2 = new FormData
            id2.append('id', info.id)
            var like = articulo.querySelector(".btn-like")
            var dislike = articulo.querySelector(".btn-dislike")
            var cantLikes = articulo.querySelector(".contador-like")
            var cantDislikes = articulo.querySelector(".contador-dislike")


            fetch("/php/cuentaVal.php", {
                method: 'POST',
                body: id2
            })
                .then(resp => resp.json())
                .then(info => {
                    cantLikes.innerHTML = info.likes
                    cantDislikes.innerHTML = info.dislikes
                    switch (info.hayLike) {
                        case "SI":
                            like.classList.add('active')
                            dislike.classList.remove('active')
                            break
                        case "NO":
                            dislike.classList.add("active")
                            like.classList.remove("active")
                            break
                        case "NODIO":
                            like.classList.remove("active")
                            dislike.classList.remove("active")
                            break
                    }
                })
            cont++
        })
    })
muro.addEventListener("click", (e) => {
    const l = e.target.closest(".btn-like")
    var post = e.target.closest("article")
    const ld = post.querySelector(".btn-like")
    const dl = post.querySelector(".btn-dislike")
    const cl = post.querySelector(".contador-like")
    const d = e.target.closest(".btn-dislike")
    const cd = post.querySelector(".contador-dislike")
    if (l) {
        var id = post.id
        var infoPalJs = new FormData
        infoPalJs.append("id", id)
        fetch("/php/like.php", {
            method: "POST",
            body: infoPalJs
        })
            .then(a => a.text())
            .then(tex => {
                const cli = parseInt(cl.textContent)
                const cdi = parseInt(cd.textContent)
                switch (tex) {
                    case "I":
                        l.classList.add("active")
                        cl.innerHTML = `${cli + 1}`
                        break
                    case "U":
                        dl.classList.remove("active")
                        l.classList.add("active")
                        cl.innerHTML = `${cli + 1}`
                        cd.innerHTML = `${cdi - 1}`
                        break
                    case "D":
                        l.classList.remove("active")
                        cl.innerHTML = `${cli - 1}`
                        break
                }
            })
    }
    if (d) {
        var id = post.id
        var infoPalJs = new FormData
        infoPalJs.append("id", id)
        fetch("/php/dislike.php", {
            method: "POST",
            body: infoPalJs
        })
            .then(a => a.text())
            .then(tex => {
                const cli = parseInt(cl.textContent)
                const cdi = parseInt(cd.textContent)
                if (ld) {
                    switch (tex) {
                        case "I":
                            d.classList.add("active")
                            cd.innerHTML = `${cdi + 1}`
                            break
                        case "U":
                            ld.classList.remove("active")
                            d.classList.add("active")
                            cl.innerHTML = `${cli - 1}`
                            cd.innerHTML = `${cdi + 1}`
                            header("Location: /Muro/muro.html")
                            break
                        case "D":
                            d.classList.remove("active")
                            cd.innerHTML = `${cdi - 1}`
                            break
                    }
                }
            })
    }
    bComents = e.target.closest(".btn-chat")
    if (bComents) {
        coments = post.querySelector(".comentarios")
        coments.classList.toggle("oculto")
        form = post.querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            todo = new FormData(form)
            todo.append("idP", post.id)
            fetch("/php/comentar.php", {
                method: 'POST',
                body: todo
            })
            alert("Comentario ingresado con éxito")
            form.reset()
        })
    }

}
)


