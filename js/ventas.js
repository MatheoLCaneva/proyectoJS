const botonVentas = document.querySelector(".btnMostrarVentas")
const bodyModalVentas = document.querySelector(".modal-body-ventas")
let listaVentas = []


botonVentas.onclick = () => {
    bodyModalVentas.innerHTML='';
    const almacenados = JSON.parse(localStorage.getItem("Ventas"));
    for (let itemVenta of almacenados) {
        const ventaMostrar = new venta(itemVenta)
        ventaMostrar.mostrarVenta()
    }

}
// extraigo ventas del json para almacenarlas al estilo base de datos
function cargarVentas() {
    if (localStorage.getItem("Ventas") == null) {
        fetch('BD/ventas.json')
            .then(respuesta => respuesta.json())
            .then(ventas => {
                for (let itemVenta of ventas) {
                    const ventaItem = new venta(itemVenta)
                    listaVentas.push(ventaItem);
                }
                localStorage.setItem("Ventas", JSON.stringify(listaVentas))
            })

    } else {
        const almacenados = JSON.parse(localStorage.getItem("Ventas"));
        listaVentas = []
        for (const objeto of almacenados) {
            listaVentas.push(objeto);
            console.log(objeto.total)
        }
    }
}  