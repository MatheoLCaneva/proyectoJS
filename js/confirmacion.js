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
    }
    carrito = []
    precioTotal = 0
    localStorage.removeItem("Articulos")
    localStorage.removeItem("PrecioTotal")
    $('#mostrarCarro').modal('hide')
    bodyModal.innerHTML=''
    cantCarrito.innerHTML = '0'
})