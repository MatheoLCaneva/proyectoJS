let carrito = []
let precioTotal = 0
const btnMostrarCarrito = document.querySelector(".btnMostrarCarrito")
const totalCompra = document.querySelector("#totalModal")


function agregarProductoCarrito(servicio) {
    if (enCarrito(servicio)) {
        Toastify({
            text: `El producto -> ${servicio.articulo} ya se encuentra en el carrito`,
            className: "info",
            position: "center",
            duration: 3000,
            close: true,
            style: {
                background: "gray",
            }
        }).showToast();
    } else {
        carrito.push(servicio)
        precioTotal += servicio.precio
        localStorage.setItem("Articulos", JSON.stringify(carrito))
        localStorage.setItem("PrecioTotal", precioTotal)
        sumarCarrito()
        Swal.fire(
            'El producto ' + servicio.articulo + ' fue agregado con exito',
            'Precio total: $' + precioTotal,
            'success'
        )
    }

}

// funcion para saber si un elemento esta en el carrito, la diseñe por errores que generaba el include
function enCarrito(servicios) {
    let pertenece = false;
    for (const serv of carrito) {
        let item = new servicio(serv)
        if (item.id == servicios.id) {
            pertenece = true;
            break;
        }
    }
    return pertenece;
}

// validacion de eliminacion de producto

function eliminarProducto(id) {
    let item = carrito.find((produc) => produc.id === id)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de eliminar ' + item.articulo + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const indice = obtenerIndice(carrito, item);
            carrito.splice(indice, 1)
            precioTotal -= item.precio;
            localStorage.setItem("Articulos", JSON.stringify(carrito))
            localStorage.setItem("PrecioTotal", precioTotal)
            swalWithBootstrapButtons.fire(
                'Producto eliminado: ' + item.articulo,
                'Articulos restantes: ' + carrito.length,
                'warning'
            )
            if (carrito.length == 0) {
                bodyModal.innerHTML = ''
            } else {
                for (const objeto of carrito) {
                    bodyModal.innerHTML = ''
                    const serv = new servicio(objeto)
                    serv.mostrarServicio()
                }
            }
            sumarCarrito()
            const totalCarrito = document.querySelector("#totalModal")
            totalCarrito.innerHTML = `$${precioTotal}`
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Eliminacion cancelada',
                'Total de articulos: ' + carrito.length,
                'success'
            )
        }
    })


}

// devuelve indice de un objeto en el Array, la hice porque indexOf me generaba error
function obtenerIndice(arr, objeto) {
    let indice = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == objeto.id) {
            indice = i;
            break
        }
    }
    return indice;
}

btnMostrarCarrito.addEventListener('click', () => {
    mostrarCarrito();
});

//Muestro modal de carrito

function mostrarCarrito() {
    if (carrito.length == 0) {
        btnConfirmarCompra.classList.add("disabled")
    } else {
        btnConfirmarCompra.classList.remove("disabled")
        bodyModal.innerHTML = '';
        for (let producto of carrito) {
            const prodMostrar = new servicio(producto)
            prodMostrar.mostrarServicio();
        }
    }
    totalCompra.innerHTML = `Total: $${precioTotal}`
}

//carga Principal con datos almacenados

function cargaPrincipal() {
    if (localStorage.getItem("PrecioTotal" )!= null){
        precioTotal = parseFloat(localStorage.getItem("PrecioTotal"))
    }else{
        precioTotal = 0
    }
    
    fetch('BD/servicios.json')
        .then(respuesta => respuesta.json())
        .then(servs => {
            for (let servicioItem of servs) {
                const itemServicio = new servicio(servicioItem)
                const btnAgregar = document.getElementById(`agregar${itemServicio.id}`)
                btnAgregar.addEventListener('click', () => {
                    agregarProductoCarrito(itemServicio)
                })
            }
        })
    if (localStorage.getItem("Articulos") == null) {
        carrito = []
        sumarCarrito()

    } else {
        const almacenados = JSON.parse(localStorage.getItem("Articulos"));
        carrito = []
        for (const objeto of almacenados) {
            carrito.push(objeto);
        }
    }
    sumarCarrito()
}
Toastify({
    text: "Bienvenido " + localStorage.getItem("Usuario"),
    className: "info",
    duration: 3000,
    close: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
}).showToast();

cargarVentas()
cargaPrincipal()

const btnVolver = document.querySelector(".botonVolver")
btnVolver.onclick = () => {
    location.href = "./index.html"
}