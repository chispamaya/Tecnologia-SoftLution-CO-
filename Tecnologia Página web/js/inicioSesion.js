document.querySelector("form").addEventListener("submit", function(prevenir) {
    prevenir.preventDefault()
    var formulario = new FormData(this)
    fetch('/php/inicioSesion.php', {
        method: 'POST',
        body: formulario
    })
    .then(info => info.text())
    .then(respuesta => {
        switch(respuesta) {
            case "E":
                alert("El email o contraseña ingresados no coinciden o no existen en nuestra db. Por favor intente nuevamente.")
                window.location.href = "/index.html"
                break
            case "C":
                alert("Sesión iniciada correctamente.")
                window.location.href = "/Muro/muro.html"
                break
        }
    })
})
