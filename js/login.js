// let usuarioRegistrado = "";
// if (!(localStorage.getItem("Usuario") == null)){
//     usuarioRegistrado = localStorage.getItem("Usuario");
//     let div = document.querySelector(".form--login")
//     const botonUsuario = document.createElement("button")
//     botonUsuario.type = "button"
//     botonUsuario.className = "botonLogin2 input--submit input"
//     botonUsuario.innerText = "Ingresar como " + usuarioRegistrado
//     div.appendChild(botonUsuario) 
//     continuar(".botonLogin2")
// }

function carga() {
    const usuarioRegistrado = localStorage.getItem("Usuario") || null;
    if (usuarioRegistrado != null) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Como desea ingresar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Nuevo usuario',
            cancelButtonText: 'Ingresar como ' + usuarioRegistrado,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                location.href = "./menu.html"
            }
        })
    }

}


function continuar(variable) {
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

carga()