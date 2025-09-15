document.querySelector("form").addEventListener("submit", function(prevenir) {
    prevenir.preventDefault()
    var formulario = new FormData(this)
    fetch('/php/registro.php', {
        method: 'POST',
        body: formulario
    })
    .then(info => info.text())
    .then(respuesta => {
        switch(respuesta) {
            case "ED":
                alert("El email ingresado no tiene el dominio de la empresa. Por favor favor ingrese uno válido.")
                window.location.href = "/InicioSesionYRegistro/registro/registro.html"
                break
            case "EE":
                alert("El email ingresado ya existe en nuestra base de datos. Por favor intente con otro diferente.")
                window.location.href = "/InicioSesionYRegistro/registro/registro.html"
                break
            case "EI":
                alert("Ha ocurrido un error durante el ingreso de la información. Por favor intente nuevamente.")
                window.location.href = "/InicioSesionYRegistro/registro/registro.html"
                break
            case "EN":
                alert("ERROR: Ya existe un usuario con ese nombre. Por favor intente con otro diferente.")
                window.location.href = "/InicioSesionYRegistro/registro/registro.html"
                break
            case "C":
                alert("Registro exitoso.")
                window.location.href = "/Muro/muro.html"
                break
        }
    })
})