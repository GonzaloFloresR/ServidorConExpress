const express = require("express");
const ProductManager = require("./classes/ProductManager.js");

const PORT = 8080;
const app = express();

const producto = new ProductManager("./src/data/productos.json");
const Agregado = producto.addProduct("Producto Prueba","Este es un producto Prueba",200,"sin imagen","abc123",25);
const Agregado2 = producto.addProduct("Producto Prueba 2","Este es un producto Prueba",210,"sin imagen","abc124",35);
const Agregado3 = producto.addProduct("Producto Prueba 3","Este es un producto Prueba",220,"sin imagen","abc125",45);
const Agregado4 = producto.addProduct("Producto Prueba 4","Este es un producto Prueba",230,"sin imagen","abc126",55);
const Agregado5 = producto.addProduct("Producto Prueba 5","Este es un producto Prueba",240,"sin imagen","abc127",65);
const Agregado6 = producto.addProduct("Producto Prueba 6","Este es un producto Prueba",250,"sin imagen","abc128",75);
const Agregado7 = producto.addProduct("Producto Prueba 7","Este es un producto Prueba",260,"sin imagen","abc129",85);
const Agregado8 = producto.addProduct("Producto Prueba 8","Este es un producto Prueba",270,"sin imagen","abc130",95);
const Agregado9 = producto.addProduct("Producto Prueba 9","Este es un producto Prueba",280,"sin imagen","abc131",105);
const Agregado10 = producto.addProduct("Producto Prueba 10","Este es un producto Prueba",290,"sin imagen","abc132",115);

app.get("/", (request, response) => {
    response.send("<h1 style='text-align: center;'>Bienvenido a Mi servidor</h1>");
});


app.get("/products", (request, response) => {
    let productos = producto.getProducts();

    let datos = productos;
    let limit = request.query.limit;
    
    if (limit && limit > 0){
        datos = datos.slice(0,limit);
    }
    response.json(datos);
});
// -------------------------------------------------------------------------------------------
app.get("/products/:id",(request, response) => {
    let productos = producto.getProducts();
    let id = request.params.id;
    id = Number(id);
    if(isNaN(id)){
        response.json({error:"Ingrese un ID numérico"});
    } else {
        let producto = productos.find(p => p.id === id);
        if(producto){
            response.json({producto});
        } else {
            response.json({error:`No existen productos con el ID ${id}`});
        }
    }
});



app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`)); 