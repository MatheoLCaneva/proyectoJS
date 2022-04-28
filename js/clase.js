const bodyModal = document.querySelector(".modal-body")


class servicio {
    constructor(obj) {
        this.id = obj.id;
        this.articulo = obj.articulo;
        this.precio = parseFloat(obj.precio);
        this.imagen = obj.imagen;
    }

    mostrarServicio() {
        const rowCarrito = document.createElement("div")
        rowCarrito.classList.add("row", "mt-2")
        rowCarrito.innerHTML = `<div class="col-12 col-lg-3 ">                                      
        <img src="${this.imagen}" class="card-img-top w-75 img-thumbnail " alt="...">
        </div> <div class="col-10 col-lg-7 d-flex flex-column justify-content-center">   
        <h4 class="card-title " id="categoria"> ${this.articulo} --- $${this.precio}</h4>                    
        </div>`
        bodyModal.appendChild(rowCarrito);
    }
}

class venta {
    constructor(obj) {
        this.id = obj.id;
        this.total = obj.total;
        this.articulos = obj.articulos;
        this.comprador = obj.comprador
    }   

    mostrarVenta() {
        const rowCarrito = document.createElement("div")
        rowCarrito.classList.add("row", "mt-2", "bordesModalVentas")
        rowCarrito.innerHTML = `<div class="col-12 col-lg-3 ">
        <p> Numero de Venta: ${this.id}</p>
        </div> 
        <div class="col-10 col-lg-7 d-flex flex-column justify-content-center">   
        <h4 class="card-title " id="categoria"> Comprador: ${this.comprador} <br> Artículos: ${this.articulos}</h4>                    
        </div>`
        bodyModalVentas.appendChild(rowCarrito);
    }
}
