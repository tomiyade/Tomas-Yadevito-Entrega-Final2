class Productos {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = precio
    }
}

let productos = []

if(localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
} else {
    localStorage.setItem("productos", JSON.stringify(productos))
}

const formProductos = document.getElementById("formProductos")
const divCarrito = document.getElementById("divCarrito")
const botonCarrito = document.getElementById("botonCarrito")


formProductos.addEventListener("submit", (e) => {
    e.preventDefault()
    let datForm = new FormData(e.target)

    let producto = new Productos(datForm.get("nombre"), datForm.get("precio"))
    productos.push(producto)
    localStorage.setItem("productos", JSON.stringify(productos))
    formProductos.reset()
})

botonCarrito.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("productos"))
    divCarrito.innerHTML = ""
    arrayStorage.forEach((producto, indice) => {

        divCarrito.innerHTML += `
        <div class="card border-dark mb-3" id="producto${indice}" style="max-width: 20rem; margin:8px;">
            <div class="card-header"><h2>${producto.nombre}</h2></div>
            <div class="card-body">
                <p class="card-title">${producto.precio}</p>
                <button class="btn btn-danger">Eliminar Producto</button>
            </div>
        </div>
        
        `
    });

    arrayStorage.forEach((producto, indice) => {
        let botonCard = document.getElementById(`producto${indice}`)
        botonCard.addEventListener('click', () => {
            document.getElementById(`producto${indice}`).remove()
            productos.splice(indice,1)
            localStorage.setItem('productos', JSON.stringify(productos))
            console.log(`${producto.nombre} Eliminada`)
        })
    })
})