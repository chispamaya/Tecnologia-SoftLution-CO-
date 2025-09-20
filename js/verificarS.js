fetch('/php/verificarS.php')
    .then(tex => tex.text())
    .then(log => {
        if(log == "NL"){
            if(window.location.pathname != "/index.html" && window.location.pathname != "/InicioSesionYregistro/registro/registro.html"){
                alert("No has iniciado sesión");
                window.location.href = "/index.html";
            }
        }
        else if(log == "L"){
            if(window.location.pathname == "/index.html" || window.location.pathname == "/InicioSesionYregistro/registro/registro.html"){
                window.location.href = "/Muro/muro.html";
            }
        }
        
    })
