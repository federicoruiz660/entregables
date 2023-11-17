class ProductManager {
    #products;

    constructor() {
        this.#products = [];    //arreglo vacio. #para solo poder acceder a products desde esta clase
    }

    getProducts() {                      //devuelve todo el arreglo de productos
        return this.#products;
    }

    getProductById(id) {      //busco el producto por id y si no se encuentra devuelvo un mensaje de error
        const product = this.#products.find((product) => product.id === id);
    
        if (!product) {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
            return "Not found";
        }
    
        return product;
    }

    #areFieldsComplete(product) {                              //valida que todos los campos esten llenos
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        for (const field of requiredFields) {
            if (!product[field]) {
                console.error(`Por favor, completa el campo '${field}'.`);
                return false;
            }
        }
        return true;
    }

    #isNotDuplicate(code) {                                                    //valida que en code no hayan duplicados
        if (this.#products.some((product) => product.code === code)) {
            console.error("El código ya existe, posible producto duplicado.");
            return false;
        }
        return true;
    }

    #generateId() {    //genero el id que se autoincrementa
        return this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {     //agregar un producto al array principal
        const newProduct = {
            id: this.#generateId(),    //llamo a la generacion del id 
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
         //validaciones (llamo a los metodos para validar)
        if (this.#areFieldsComplete(newProduct) && this.#isNotDuplicate(newProduct.code)) 
        {this.#products.push(newProduct);
        
        }  
    }

    deleteProduct(id) {
        
        const productToDelete = this.#products.find((product) => product.id === id); //almaceno el producto a eliminar en una variable en base a su id
    
        if (productToDelete) {   //si el producto existe, lo elimino
           
            this.#products = this.#products.filter((product) => product.id !== id);  //filtro el producto a eliminar y lo elimino del array
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
        }
    }

    updateProduct(id, updatedProduct) {                     
    const existingProduct = this.#products.find((product) => product.id === id);  //busco el producto a actualizar en base a su id y lo almaceno en una variable

    if (existingProduct) {                                           //si la variable existe, actualizo el producto
        Object.assign(existingProduct, updatedProduct, { id });        //actualizo el producto, con los nuevos datos y el mismo id
        console.log(`Producto con ID ${id} actualizado.`);
    } else {
        console.error(`Error: Producto con ID ${id} no encontrado.`);
    }
}


    
}

const productManagerInstance = new ProductManager();   //creo una instancia de la clase


