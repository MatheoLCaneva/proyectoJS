let ListadoServicios = []

const btnConfirmarCompra = document.querySelector("#confirmarPedido");
const modalCarro = document.querySelector("#mostrarCarro")


btnConfirmarCompra.addEventListener('click', ()=>{
    Swal.fire(
        "Muchas gracias por su compra!",
        `Se ha enviado un mail a ${localStorage.getItem("email")} con los detalles de la misma. `,
        'success'
    )
    
    for (const prod of carrito){
        let serv = new servicio(prod);
        ocultarBoton(serv.id)
        ListadoServicios.push(serv.articulo)
    }

    const idMax = () => { let id = 0; for (const venta of listaVentas) { id = venta.id} return id}

// instancio el nuevo objeto venta

    let ObjetoVenta = { "id" : idMax()+1,  "total" : precioTotal,  "articulos" : ListadoServicios,  "comprador" :localStorage.getItem("Usuario") } 

    let nuevaVenta = new venta(ObjetoVenta)
    

    listaVentas.push(nuevaVenta)

    localStorage.setItem("Ventas", JSON.stringify(listaVentas))

    enviarMail(idMax(), ListadoServicios, precioTotal, localStorage.getItem("email"))

    // vacio todo lo que tengo almacenado
    carrito = []
    precioTotal = 0
    ListadoServicios = []
    localStorage.removeItem("Articulos")
    localStorage.removeItem("PrecioTotal")
    $('#mostrarCarro').modal('hide')
    bodyModal.innerHTML=''
    cantCarrito.innerHTML = '0'
})

// funcion que envia mail con detalles
function enviarMail(id, listado, precio, mail){
    emailjs.send("gmailMatheo","template_vhjr1jk",{
        from_id: id,
        articulos: listado,
        precioTotal: precio,
        mail: mail,
        });
}