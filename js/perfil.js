nombre = document.querySelector('.nombre-usuario');
email = document.querySelector('.email-usuario');

nombre.innerHTML = ''
email.innerHTML = ''
fetch("/php/datPerfil.php")
.then(tex => tex.json())
.then(data => {
        nombre.innerHTML = data[0]
        email.innerHTML = data[1]
    })

document.querySelector("form").addEventListener("submit", function (prevenir) {
    prevenir.preventDefault()
    var pas = new FormData(this)
    fetch("/php/perfil.php", {
        method: 'POST',
        body: pas
    })
        .then(tex => tex.text())
        .then(inf => {
            switch (inf) {
                case "CA":
                    alert("Contraseña actualizada con éxito.")
                    break
                case "EA":
                    alert("Error actualizando la contraseña. Vuelva a intentar por favor.")
                    break
            }
        })
})

document.querySelector(".btn-descartar").addEventListener("click", function (prevenir) {
    prevenir.preventDefault()
    fetch("/php/cerrarS.php")
        .then(tex => tex.text())
        .then(inf => {
            if(inf == "SC"){
                alert("Sesión cerrada con éxito.")
                window.location.href = "/index.html"
            }
        })
})

