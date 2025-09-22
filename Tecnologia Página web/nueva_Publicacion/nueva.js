const form = document.getElementById("formPublicacion");
const preview = document.getElementById("preview");
const tituloPrev = document.querySelector(".preview-titulo");
const descPrev = document.querySelector(".preview-descripcion");
const linkPrev = document.querySelector(".preview-link");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const link = document.getElementById("link").value.trim();

  if (!titulo || !descripcion) return;

  // Mostrar en preview
  tituloPrev.textContent = titulo;
  descPrev.textContent = descripcion;

  if (link) {
    linkPrev.href = link;
    linkPrev.classList.remove("oculto");
  } else {
    linkPrev.classList.add("oculto");
  }

  preview.classList.remove("oculto");

  // Reiniciar form
  form.reset();
});
