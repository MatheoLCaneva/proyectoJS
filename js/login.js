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
            if (result.isConfirmed) {
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                location.href = "./menu.html"
            }
        })
    }

}

let botonLogin = document.querySelector(".botonLogin")
botonLogin.onclick = () => {
    usuarioRegistrado = document.getElementById("usuarioLogin").value;
    
    localStorage.setItem("Usuario", usuarioRegistrado)

    if (localStorage.getItem("Articulos") != null){ localStorage.removeItem("Articulos") } 

    location.href = "./menu.html"
}

carga()