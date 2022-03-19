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

 function verPrecio(id) {
     const producto = buscarProducto(id)
     alert("El precio es " + producto.precio)
 }

 function agregarProductoCarrito(id) {
     const producto = buscarProducto(id);
     carrito.push(producto);
     precioTotal += producto.precio;
     alert("El elemento " + producto.articulo + " se agrego con exito. Su carrito posee " + carrito.length + " elementos/s");
 }

 function eliminarProductoCarrito(id) {
     const producto = buscarProducto(id);
     if (carrito.includes(producto)) {
         const indice = carrito.indexOf(producto);
         carrito.splice(indice, 1)
         precioTotal -= producto.precio;
         alert("El elemento " + producto.articulo + " se elimino con exito. Su carrito posee " + carrito.length + " elementos/s");
     }
 }

 function agregarBoton(id) {
     const producto = buscarProducto(id);
     if (!carrito.includes(producto)) {
         if (id == 0) {
             let a = document.querySelector(".primerProducto")
             let p = document.createElement("button");
             p.innerHTML = " Eliminar"
             p.className = "botonEliminar botonEliminarPrimero"
             a.append(p)
         } else if (id == 1) {
             let a = document.querySelector(".segundoProducto")
             let p = document.createElement("button");
             p.innerHTML = " Eliminar"
             p.className = "botonEliminar botonEliminarSegundo"
             a.append(p)
         } else if (id == 2) {
             let a = document.querySelector(".tercerProducto")
             let p = document.createElement("button");
             p.innerHTML = " Eliminar"
             p.className = "botonEliminar botonEliminarTercero"
             a.append(p)
         }
     }
 }

 function pagarCarrito() {
     if (precioTotal == 0) {
         console.log("Carrito vacio, agregue productos y reintente")
     } else {
         console.log("Gracias por su compra, el total fue " + precioTotal)
     }
 }


 //Mensaje de bienvenida que interactua con el DOM

 let nombre = prompt("Ingrese su nombre");
 let titulo = document.getElementById("principio");
 let parrafo = document.createElement("p");
 parrafo.innerHTML = "<p> Bienvenido " + nombre + "</p>"
 parrafo.className = "bienvenida"
 titulo.appendChild(parrafo)


 //Gestiono cuando se pulsa el boton agregar

 let boton1 = document.querySelector(".tipo1");
 let boton2 = document.querySelector(".tipo2");
 let boton3 = document.querySelector(".tipo3");

 boton1.onclick = () => {
     agregarBoton(0)
     agregarProductoCarrito(0)
 }

 boton2.onclick = () => {
     agregarBoton(1)
     agregarProductoCarrito(1)
 }

 boton3.onclick = () => {
     agregarBoton(2)
     agregarProductoCarrito(2)
 }