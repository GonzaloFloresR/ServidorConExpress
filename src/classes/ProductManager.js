const fs = require("fs");

class ProductManager {
    #products;
    #path;
    static idProducto = 0;

    constructor(rutaDeArchivo){

        this.#path = rutaDeArchivo;
        this.#products = this.#BuscarArchivo();
    }

    #asignarIdProducto(){
        let id = 1;
        if(this.#products.length != 0 ){
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;
    }


    #BuscarArchivo = () => {
        try {
                if(fs.existsSync(this.#path)){
                    return this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
                } else {
                    return [];
                }
        } catch(error){
            console.log("Problemas al buscar el archivo ",error);
        }
        
    }

    #guardarArchivo = () => {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, 5));
        } catch(error){
            console.log("Problemas al guardar el archivo ",error);
        }
    }


    addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock){

            return `🛑 Se require completar todos los parametros: title, description, price, thumbnail, code, stock`;

        } else {

            let repetido = this.#products.some( pro => pro.code === code.trim()); //validar que no se repita el code

            if(repetido){

                return "🛑 There is already a product with this code 🛑";

            } else {
                
                const nuevoProducto = {
                        id: this.#asignarIdProducto(),
                        title:title,
                        description:description,
                        price:price,
                        thumbnail:thumbnail,
                        code:code,
                        stock:stock
                    };
                
                this.#products.push(nuevoProducto);
                this.#guardarArchivo();
                return `✅ Product added successfully ✅`;
            }
        }
    }

    getProducts(){
        //Devolver todos los productos
        return this.#products;
    }

    getProductById(id){
        let producto = this.#products.find((prod)=>prod.id === id);
        return producto? producto : `🛑 Product ID: ${id} Not Found 🛑`;
    } 

    updateProduct(id, Update){
        const index = this.#products.findIndex((produc) => produc.id === id );
        if(index >= 0){
            const {id, ...rest} = Update;
            this.#products[index] = {...this.#products[index], ...rest};
            this.#guardarArchivo(); 
            return `Archivo Actualizado`;
        }else{
            return `El producto con el id: ${id} no existe`;
        }
    }

    deleteProduct(id){
        const index = this.#products.findIndex((produc) => produc.id === id );
        if(index >= 0 ){
            this.#products =  this.#products.filter(produc => producto.id !== id);
            this.#guardarArchivo();
            return `Producto Eliminado Correctamente ✅`;
        } else {
            return `🛑 El producto con el Id ${id} no existe`;
        }
    }

}

module.exports = ProductManager;



/* const producto = new ProductManager("./data/produtos.json");

console.log(producto.getProducts());

const Agregado = producto.addProduct("Producto Prueba","Este es un producto Prueba",200,"sin imagen","abc123",25);
console.log(Agregado);

console.log(producto.getProducts());

const Miproducto = producto.getProductById(5);
console.log(Miproducto);


console.log(producto.updateProduct(1, {"id":6,"title":"Producto actualizado","description":"Se actualizo el producto","price":150,"thumbnail":"http://www.actual" }));



console.log(producto.deleteProduct(4)); */