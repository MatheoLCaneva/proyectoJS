let carrito = []
let precioTotal = 0
let servicios = [{id : 0, articulo : "Armado de Pc", precio : 1500}, {id : 1,articulo : "Limpieza completa", precio : 2000}, {id : 2,articulo : "Desarrollo de pagina web", precio : 10000}];
console.log(servicios)

function buscarProducto (id) {
    let producto;
    for (let i = 0; i < servicios.length; i++){
        if (id == servicios[i].id){
            producto = servicios[i];
            break
        }
    }
    return producto;
}

function verPrecio(id){
    const producto = buscarProducto(id)
    alert("El precio es " + producto.precio)
}

function agregarProductoCarrito(id){
    const producto = buscarProducto(id);
    carrito.push(producto);
    precioTotal += producto.precio;
}

function pagarCarrito() {
    if (precioTotal == 0){
        console.log("Carrito vacio, agregue productos y reintente")
    }
    else{
        console.log("Gracias por su compra, el total fue " + precioTotal)
    }
}

let opcion = prompt("Ingrese ID del producto a agregar al carrito (valor entre 0 y 2)")
debugger

switch(parseInt(opcion)){
    case 0:
        agregarProductoCarrito(0);
        verPrecio(0); 
        break
    case 1:
        agregarProductoCarrito(1);
        verPrecio(1);
        break
    case 2:
        agregarProductoCarrito(2);
        verPrecio(2);
        break
    }
