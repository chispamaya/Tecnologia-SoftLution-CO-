fetch('/php/verificarS.php')
    .then(tex => tex.text())
    .then(log => {
        if(log == "NL"){
            alert("No has iniciado sesión.");
            window.location.href = "/index.html";
        }
    })
