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
