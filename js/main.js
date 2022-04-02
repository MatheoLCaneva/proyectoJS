class servicio {
    constructor(obj) {
        this.id = obj.id;
        this.articulo = obj.articulo;
        this.precio = parseFloat(obj.precio);
    }
}


let carrito = []
let precioTotal = 0


let servicios = [{
    id: 0,
    articulo: "Armado de Pc",
    precio: 1500
}, {
    id: 1,
    articulo: "Limpieza completa",
    precio: 2000
}, {
    id: 2,
    articulo: "Desarrollo de pagina web",
    precio: 10000
}];
console.log(servicios)

function buscarProducto(id) {
    let producto;
    for (let i = 0; i < servicios.length; i++) {
        if (id == servicios[i].id) {
            producto = servicios[i];
            break
        }
    }
    return producto;
}


function agregarProductoCarrito(id) {
    const producto = buscarProducto(id);
    if (enCarrito(producto.id)) {
        alert("El producto ya se encuentra en el carrito")
    } else {
        carrito.push(producto);
        precioTotal += producto.precio;
        localStorage.setItem("Articulos", JSON.stringify(carrito))
        localStorage.setItem("PrecioTotal", precioTotal)
        //Agrego el texto confirmando la operacion
        agregarBoton(id)
        eliminarProductoCarrito1("botonEliminar")
        Swal.fire(
            'El producto ' + producto.articulo + ' fue agregado con exito',
            'Precio total: $' + precioTotal,
            'success'
        )

    }

}

function eliminarProducto(id) {
    const producto = buscarProducto(id);
    if (enCarrito(producto.id)) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Estas seguro de eliminar ' + producto.articulo + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const indice = obtenerIndice(carrito, producto);
                carrito.splice(indice, 1)
                precioTotal -= producto.precio;
                localStorage.setItem("Articulos", JSON.stringify(carrito))
                localStorage.setItem("PrecioTotal", precioTotal)
                swalWithBootstrapButtons.fire(
                    'Producto eliminado: ' + producto.articulo,
                    'Articulos restantes: ' + carrito.length,
                    'warning'
                )
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
}

function eliminarProductoCarrito1(array) {
    const botonesEliminar = [...document.getElementsByClassName(array)];
    for (const boton of botonesEliminar) {
        boton.onclick = () => {
            if (tieneID(boton) && boton.id == "eliminarBoton0") {
                eliminarProducto(0)
                ocultarBoton(0)
            }
            if (tieneID(boton) && boton.id == "eliminarBoton1") {
                eliminarProducto(1)
                ocultarBoton(1)
            }
            if (tieneID(boton) && boton.id == "eliminarBoton2") {
                eliminarProducto(2)
                ocultarBoton(2)
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

// funcion para saber si un elemento esta en el carrito, la diseñe por errores que generaba el include
function enCarrito(id) {
    let pertenece = false;
    const producto = buscarProducto(id)
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == producto.id) {
            pertenece = true;
        }
    }
    return pertenece;
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


function pagarCarrito() {
    if (precioTotal == 0) {
        console.log("Carrito vacio, agregue productos y reintente")
    } else {
        console.log("Gracias por su compra, el total fue " + precioTotal)
    }
}

function cargaPrincipal() {
    if (localStorage.getItem("Articulos") == null) {
        carrito = []

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
    }
    let titulo = document.getElementById("principio");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = " Bienvenido " + localStorage.getItem("Usuario")
    parrafo.className = "bienvenida"
    titulo.appendChild(parrafo)
}

let parrafoCarrito = document.createElement("p");
parrafoCarrito.innerHTML = ""
parrafoCarrito.className = "textoCarrito"
document.body.appendChild(parrafoCarrito)

cargaPrincipal()

//Gestiono cuando se pulsa el boton agregar

let boton1 = document.querySelector(".tipo1");
let boton2 = document.querySelector(".tipo2");
let boton3 = document.querySelector(".tipo3");

boton1.onclick = () => {
    agregarProductoCarrito(0)
}

boton2.onclick = () => {
    agregarProductoCarrito(1)
    mostrarBoton(1)
}

boton3.onclick = () => {
    agregarProductoCarrito(2)
    mostrarBoton(2)
}
