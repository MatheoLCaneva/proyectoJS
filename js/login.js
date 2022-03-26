let usuarioRegistrado = "";
if (!(localStorage.getItem("Usuario") == null)){
    usuarioRegistrado = localStorage.getItem("Usuario");
    let div = document.querySelector(".form--login")
    const botonUsuario = document.createElement("button")
    botonUsuario.type = "button"
    botonUsuario.className = "botonLogin2 input--submit input"
    botonUsuario.innerText = "Ingresar como " + usuarioRegistrado
    div.appendChild(botonUsuario) 
    continuar(".botonLogin2")
}

function continuar(variable){
    const botonContinuar = document.querySelector(variable)
    botonContinuar.onclick = () => {
        location.href = "./menu.html"
    }
}

let botonazo = document.querySelector(".botonLogin")
botonazo.onclick = () => {
    usuarioRegistrado = document.getElementById("usuarioLogin").value;
    localStorage.setItem("Usuario", usuarioRegistrado)
    location.href = "./menu.html"
}

