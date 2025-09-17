/* 

CODIGO GPTEADO POR MARTO(no lo borre todavía por las dudas)


document.querySelectorAll(".publicacion").forEach((post) => {
    const likeBtn = post.querySelector(".btn-like");
    const dislikeBtn = post.querySelector(".btn-dislike");
    const likeCount = post.querySelector(".contador-like");
    const dislikeCount = post.querySelector(".contador-dislike");

    let likes = 0;
    let dislikes = 0;

    // --- LIKE ---
    likeBtn.addEventListener("click", () => {
        if (likeBtn.classList.contains("active")) {
            likeBtn.classList.remove("active");
            likes--;
        } else {
            likeBtn.classList.add("active");
            likes++;
            if (dislikeBtn.classList.contains("active")) {
                dislikeBtn.classList.remove("active");
                dislikes--;
            }
        }
        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;
    });

    // --- DISLIKE ---
    dislikeBtn.addEventListener("click", () => {
        if (dislikeBtn.classList.contains("active")) {
            dislikeBtn.classList.remove("active");
            dislikes--;
        } else {
            dislikeBtn.classList.add("active");
            dislikes++;
            if (likeBtn.classList.contains("active")) {
                likeBtn.classList.remove("active");
                likes--;
            }
        }
        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;
    });

    // --- COMENTARIOS ---
    const chatBtn = post.querySelector(".btn-chat");
    const comentariosDiv = post.querySelector(".comentarios");
    const inputComentario = post.querySelector(".input-comentario input");
    const btnComentario = post.querySelector(".input-comentario button");
    const listaComentarios = post.querySelector(".lista-comentarios");

    chatBtn.addEventListener("click", () => {
        comentariosDiv.style.display =
            comentariosDiv.style.display === "flex" ? "none" : "flex";
    });

    btnComentario.addEventListener("click", () => {
        const texto = inputComentario.value.trim();
        if (texto !== "") {
            const usuario = "UsuarioActual"; // Cambiar por sesión en futuro
            const nuevoComentario = document.createElement("div");
            nuevoComentario.classList.add("comentario");
            nuevoComentario.innerHTML = `
                <span class="nombre-usuario">${usuario}:</span> 
                ${texto}
            `;
            listaComentarios.appendChild(nuevoComentario);
            inputComentario.value = "";
        }
    });

    // --- ABRIR POST EN GRANDE ---
    const contenido = post.querySelector(".contenido-publicacion");
    contenido.addEventListener("click", () => {
        abrirModal(post);
    });
});

// --- MODAL ---
function abrirModal(post) {
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
        <div class="modal-contenido">
            <span class="cerrar">&times;</span>
            ${post.innerHTML}
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".cerrar").addEventListener("click", () => {
        modal.remove();
    });
}
*/


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
                <div class="comentarios">
                    <div class="lista-comentarios"></div>
                    <div class="input-comentario">
                        <input type="text" placeholder="Escribir comentario...">
                        <button>Añadir</button>
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
                    <div class="comentarios">
                        <div class="lista-comentarios"></div>
                        <div class="input-comentario">
                            <input type="text" placeholder="Escribir comentario...">
                            <button>Añadir</button>
                        </div>
                    </div>
                `
            }
            articulo.innerHTML = aniadir
            muro.appendChild(articulo)
            var like  = articulo.querySelector(".btn-like")
            var dislike = articulo.querySelector(".btn-dislike")
            var cantLikes = articulo.querySelector(".contador-like")
            var cantDislikes = articulo.querySelector(".contador-dislike")

            var id = new FormData

            id.append('id', info.id)

            fetch("/php/cuentaVal.php", {
                method: 'POST',
                body: id
            })
            .then(resp => resp.json())
            .then( info => {
                cantLikes.innerHTML = info.likes
                cantDislikes.innerHTML = info.dislikes
                switch(info.hayLike){
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
        .then(tex =>{
            const cli = parseInt(cl.textContent)
            const cdi = parseInt(cd.textContent)
            switch(tex){
                case "I":
                    l.classList.add("active")
                    cl.innerHTML = `${cli + 1}`
                    break
                case "U":
                    d.classList.remove("active")
                    l.classList.add("active")
                    cl.innerHTML = `${cli + 1}`
                    cd.innerHTML = `${cdi -1}`
                    break
                case "D":
                    l.classList.remove("active")
                    cl.innerHTML = `${cli -1}`
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
        .then(tex =>{
            const cli = parseInt(cl.textContent)
            const cdi = parseInt(cd.textContent)
            switch(tex){
                case "I":
                    d.classList.add("active")
                    cd.innerHTML = `${cdi + 1}`
                    break
                case "U":
                    d.classList.add("active")
                    l.classList.remove("active")
                    cd.innerHTML = `${cdi + 1}`
                    cl.innerHTML = `${cli -1}`
                    break
                case "D":
                    d.classList.remove("active")
                    cd.innerHTML = `${cdi -1}`
                    break
            }
        })
    }
})

