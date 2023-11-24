const fs = require('fs');

class ProductManager {
    #products;
    #filePath;

    constructor() {
        this.#filePath = 'Productos.json';
        this.#products = this.readFromFile();
    }

    readFromFile() {
        try {
            const data = fs.readFileSync(this.#filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            return [];
        }
    }

    saveToFile() {
        try {
            const data = JSON.stringify(this.#products, null, 2);
            fs.writeFileSync(this.#filePath, data, 'utf-8');
        } catch (error) {
            console.error('Error al escribir en el archivo:', error.message);
        }
    }

    getProducts() {
        const allProducts = this.#products;
        console.log(allProducts);
        return allProducts;
    }

    getProductById(id) {
        const products = this.readFromFile(); // Lee productos desde el archivo
    
        const product = products.find((product) => product.id === id);
    
        if (!product) {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
            return "Not found";
        }
    console.log(product);
        return product;
    }

    #areFieldsComplete(product) {
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        for (const field of requiredFields) {
            if (!product[field]) {
                console.error(`Por favor, completa el campo '${field}'.`);
                return false;
            }
        }
        return true;
    }

    #isNotDuplicate(code) {
        if (this.#products.some((product) => product.code === code)) {
            console.error("El código ya existe, posible producto duplicado.");
            return false;
        }
        return true;
    }

    #generateId() {
        return this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            id: this.#generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        if (this.#areFieldsComplete(newProduct) && this.#isNotDuplicate(newProduct.code)) {
            this.#products.push(newProduct);
            this.saveToFile();
        }
    }

    deleteProduct(id) {
        const productToDelete = this.#products.find((product) => product.id === id);

        if (productToDelete) {
            this.#products = this.#products.filter((product) => product.id !== id);
            this.saveToFile();  //aca modifico el JSON
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
        }
    }

    updateProduct(id, updatedProduct) {
        const existingProduct = this.#products.find((product) => product.id === id);

        if (existingProduct) {
            Object.assign(existingProduct, updatedProduct, { id });
            this.saveToFile();   //aca modifico el JSON
            console.log(`Producto con ID ${id} actualizado.`);
        } else {
            console.error(`Error: Producto con ID ${id} no encontrado.`);
        }
    }
}

const productManagerInstance = new ProductManager();


productManagerInstance.getProductById(2);  //busco producto por id en el JSON

productManagerInstance.getProducts(); //muestro todos los productos del JSON

// Update
productManagerInstance.updateProduct(1, { title: "Producto Modificado" });
productManagerInstance.getProducts(); // Muestra todos los productos después de la actualización

// Delete
productManagerInstance.deleteProduct(2);
productManagerInstance.getProducts(); // Muestra todos los productos después de la eliminación