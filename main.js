class Vehiculo {
    constructor(id, marca, modelo, precio, img){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const amarok = new Vehiculo(1, "Volkswagen", "Amarok", 60000, "./img/amarok.jpg");
const jeepRenegade = new Vehiculo(2, "Jeep", "Renegade", 70000, "img/jeeprenegade.jpg");
const broncoSport = new Vehiculo(3, "Ford", "Bronco Sport", 53000, "img/broncosport.jpg");
const jeepRubicon = new Vehiculo(4, "Jeep", "Rubicon", 62000, "img/jeeprubicon.jpg");
const peugeot3008 = new Vehiculo(5, "Peugeot", "3008", 38000, "img/peugeot3008.jpg");
const landRover = new Vehiculo(6, "Land Rover", "Evoque", 85000, "img/landrover.jpg");
const bmwGs = new Vehiculo (7, "BMW", "GS 750", 27000, "img/bmwgs750.jpg");
const reClassic = new Vehiculo(8, "Royal Enfield", "Classic 350", 6500, "img/REClassic350.jpg");
const reHimalayan = new Vehiculo(9, "Royal Enfield", "Himalayan 400", 6800, "img/REHimalayan.jpg");
const reInterceptor = new Vehiculo(10, "Royal Enfield", "Interceptor 650", 11200, "img/REInterceptor.jpg");
const ram = new Vehiculo(11, "Dodge", "RAM", 98000, "img/ram.webp");
const mercedes = new Vehiculo(12, "Mercedes Benz", "Clase C250", 55000, "img/mercedes.jpg");

//ARRAY CON TODOS LOS VEHICULOS

const vehiculos = [amarok, jeepRenegade, broncoSport, jeepRubicon, peugeot3008, landRover, bmwGs, reClassic, reHimalayan, reInterceptor, ram, mercedes];
console.log(vehiculos);

//ARRAY VACIO PARA CARRITO.

let carrito = [];

//DOM

const contenedorVehiculos = document.getElementById("contenedorVehiculos");

//Función para mostrar los vehiculos

const mostrarVehiculos = () => {
    vehiculos.forEach(vehiculo => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${vehiculo.img}" class = "card-img-top imgVehiculos" alt = "${vehiculo.marca}">
                            <div>
                                <h2> ${vehiculo.marca} </h2>
                                <h2> ${vehiculo.modelo} </h2>
                                <p> ${vehiculo.precio} </p>
                                <button class = "btn colorBoton" id="boton ${vehiculo.id}" > Comprar este vehículo </button>
                            </div>
                        </div>
                        `
                        contenedorVehiculos.appendChild(card);

        const boton = document.getElementById(`boton${vehiculo.id}`)
        card.addEventListener("click", () => {
            agregarAlCarrito(vehiculo.id);
        })
    })
}

mostrarVehiculos();

//Función para agregar al carrito

const agregarAlCarrito = (id) => {
    const vehiculoEnCarrito = carrito.find(vehiculo => vehiculo.id === id);
    if(vehiculoEnCarrito) {
        vehiculoEnCarrito.cantidad++;
    } else {
        const vehiculo = vehiculos.find(vehiculo => vehiculo.id === id);
    carrito.push(vehiculo);
    }
    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(vehiculo => {
        const card = document.createElement("div");
        card.classList.add("col-md-12");
        card.innerHTML = `
            <div class ="card">
                <img src = "${vehiculo.img}" class = "card-img-top imgProductos" alt = "${vehiculo.marca}">
                <div>
                    <h5> ${vehiculo.marca} </h5>
                    <h5> ${vehiculo.modelo} </h5>
                    <p> ${vehiculo.precio} </p>
                    <p> Cantidad: ${vehiculo.cantidad} </p> <!-- Nuevo elemento para mostrar la cantidad -->
                    <button class = "btn colorBoton" id="eliminar${vehiculo.id}" > Eliminar </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        //Eliminar vehiculo uno por uno 
        const boton = document.getElementById(`eliminar${vehiculo.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(vehiculo.id);
        })
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const vehiculos = carrito.find(vehiculo => vehiculo.id === id);
    const indice = carrito.indexOf(vehiculos);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Total de la compra: 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: U$S${totalCompra}`;
}

//Eliminar todos los vehiculos del carrito: 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = []; 
    mostrarCarrito();


    localStorage.clear();
}