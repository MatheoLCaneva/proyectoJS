let carrito = []
let precioTotal = 0
const btnMostrarCarrito = document.querySelector(".btnMostrarCarrito")
const totalCompra = document.querySelector("#totalModal")


function agregarProductoCarrito(id) {
    fetch('BD/servicios.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            let item = productos.find((produc) => produc.id === id)
            const serv = new servicio(item)
            if (enCarrito(serv)) {
                Toastify({
                    text: `El producto -> ${serv.articulo} ya se encuentra en el carrito`,
                    className: "info",
                    position:"center",
                    duration: 3000,
                    close: true,
                    style: {
                        background: "gray",
                    }
                }).showToast();
            } else {
                carrito.push(serv)
                precioTotal += serv.precio
                localStorage.setItem("Articulos", JSON.stringify(carrito))
                localStorage.setItem("PrecioTotal", precioTotal)
                agregarBoton(id)
                eliminarProductoCarrito1("botonEliminar")
                sumarCarrito()
                Swal.fire(
                    'El producto ' + serv.articulo + ' fue agregado con exito',
                    'Precio total: $' + precioTotal,
                    'success'
                )
            }
        })
    
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
            ocultarBoton(id)
            sumarCarrito()
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
    if (carrito.length == 0) {
        bodyModal.innerHTML = ''
    } else {
        for (const objeto of carrito) {
            bodyModal.innerHTML = ''
            const serv = new servicio(objeto)
            serv.mostrarServicio
        }
    }
    
}

function eliminarProductoCarrito1(array) {
    const botonesEliminar = [...document.getElementsByClassName(array)];
    for (const boton of botonesEliminar) {
        boton.onclick = () => {
            if (tieneID(boton) && boton.id == "eliminarBoton0") {
                eliminarProducto(0)
            }
            if (tieneID(boton) && boton.id == "eliminarBoton1") {
                eliminarProducto(1)
            }
            if (tieneID(boton) && boton.id == "eliminarBoton2") {
                eliminarProducto(2)
            }
        }
    }
}

function tieneID(elemento) {
    return typeof elemento.id != "undefined";
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



// funcion la cual los agrega anticipadamente para poder manipularlos
function agregarBoton(id) {
    if (id == 0) {
        let a = document.querySelector(".primerProducto")
        let p = document.createElement("button");
        p.innerHTML = " Eliminar"
        p.className = "botonEliminar botonEliminarPrimero noMostrar"
        p.id = "eliminarBoton0"
        a.append(p)
    } else if (id == 1) {
        let a = document.querySelector(".segundoProducto")
        let p = document.createElement("button");
        p.innerHTML = " Eliminar"
        p.className = "botonEliminar botonEliminarSegundo noMostrar"
        p.id = "eliminarBoton1"
        a.append(p)
    } else if (id == 2) {
        let a = document.querySelector(".tercerProducto")
        let p = document.createElement("button");
        p.innerHTML = " Eliminar"
        p.className = "botonEliminar botonEliminarTercero noMostrar"
        p.id = "eliminarBoton2"
        a.append(p)
    }
    mostrarBoton(id)
}

// funcion para mostrar los botones de eliminar
function mostrarBoton(id) {
    if (id == 0) {
        let boton = document.querySelector("#eliminarBoton0")
        boton.className = "botonEliminar botonEliminarPrimero"
    } else if (id == 1) {
        let boton = document.querySelector("#eliminarBoton1")
        boton.className = "botonEliminar botonEliminarSegundo"
    } else if (id == 2) {
        let boton = document.querySelector("#eliminarBoton2")
        boton.className = "botonEliminar botonEliminarTercero"
    }
}

// funcion la cual genera que se oculten los botones de eliminar cuando se pulsan
function ocultarBoton(id) {
    if (id == 0) {
        let boton = document.querySelector(".botonEliminarPrimero")
        boton.className = "botonEliminar botonEliminarPrimero noMostrar"
    } else if (id == 1) {
        let boton = document.querySelector(".botonEliminarSegundo")
        boton.className = "botonEliminar botonEliminarSegundo noMostrar"
    } else if (id == 2) {
        let boton = document.querySelector(".botonEliminarTercero")
        boton.className = "botonEliminar botonEliminarTercero noMostrar"
    }
}

btnMostrarCarrito.addEventListener('click', () => {
    mostrarCarrito();
});

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

function cargaPrincipal() {
    if (localStorage.getItem("Articulos") == null) {
        carrito = []
        sumarCarrito()

    } else {
        const almacenados = JSON.parse(localStorage.getItem("Articulos"));
        carrito = []
        for (const objeto of almacenados) {
            carrito.push(objeto);
            console.log(objeto.id)
            let obj = new servicio(objeto)
            agregarBoton(obj.id)
            eliminarProductoCarrito1("botonEliminar")
        }
        precioTotal = parseFloat(localStorage.getItem("PrecioTotal"))
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
}

cargarVentas()
cargaPrincipal()

//Gestiono cuando se pulsa el boton agregar

let boton1 = document.querySelector(".tipo1");
let boton2 = document.querySelector(".tipo2");
let boton3 = document.querySelector(".tipo3");
let botonVolver = document.querySelector(".botonVolver")

botonVolver.onclick = () => {
    location.href = "./index.html"
}

boton1.onclick = () => {
    agregarProductoCarrito(0)
}

boton2.onclick = () => {
    agregarProductoCarrito(1)
}

boton3.onclick = () => {
    agregarProductoCarrito(2)
}