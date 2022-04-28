let ListadoServicios = []

const btnConfirmarCompra = document.querySelector("#confirmarPedido");
const modalCarro = document.querySelector("#mostrarCarro")
btnConfirmarCompra.addEventListener('click', ()=>{
    Swal.fire(
        "Muchas gracias por su compra!",
        `Esperemos que la disfrute, su total fue ${precioTotal}.`,
        'success'
    )
    
    for (const prod of carrito){
        let serv = new servicio(prod);
        ocultarBoton(serv.id)
        ListadoServicios.push(serv.articulo)
    }
    const idMax = () => { let id = 0; for (const venta of listaVentas) { id = venta.id} return id}

    let ObjetoVenta = { "id" : idMax()+1,  "total" : precioTotal,  "articulos" : ListadoServicios,  "comprador" :localStorage.getItem("Usuario") } 

    let nuevaVenta = new venta(ObjetoVenta)
    
    listaVentas.push(nuevaVenta)

    localStorage.setItem("Ventas", JSON.stringify(listaVentas))

    carrito = []
    precioTotal = 0
    localStorage.removeItem("Articulos")
    localStorage.removeItem("PrecioTotal")
    $('#mostrarCarro').modal('hide')
    bodyModal.innerHTML=''
    cantCarrito.innerHTML = '0'
})