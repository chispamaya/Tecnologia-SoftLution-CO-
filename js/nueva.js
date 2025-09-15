document.querySelector("form").addEventListener("submit", function(prevenir) {
    prevenir.preventDefault()
    var formulario = new FormData(this)
    fetch('/php/publiNueva.php', {
        method: 'POST',
        body: formulario
    })
    .then(info => info.text())
    .then(respuesta => {
        switch(respuesta) {
            case "EP":
                alert("Error en la publicación, intente nuevamente.")
                break
            case "C":
                alert("Publicación creada con éxito.")
                break
        }
    })
})
