function carga() {
    const usuarioRegistrado = localStorage.getItem("Usuario") || null;
    if (usuarioRegistrado != null) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Como desea ingresar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Nuevo usuario',
            cancelButtonText: 'Ingresar como ' + usuarioRegistrado,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {} else if (result.dismiss === Swal.DismissReason.cancel) {
                location.href = "./menu.html"
            }
        })
    }

}

let botonLogin = document.querySelector(".botonLogin")

// evento de escucha en click o enter para realizar el guardado de datos

botonLogin.addEventListener('click', () => {
    usuarioRegistrado = document.getElementById("usuarioLogin").value;
    const mailUsuario = document.getElementById("emailLogin").value;
    localStorage.setItem("Usuario", usuarioRegistrado)
    localStorage.setItem("email", mailUsuario)
    if (localStorage.getItem("Articulos") != null) {
        localStorage.removeItem("Articulos")
    }
})

carga()