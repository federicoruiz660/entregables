const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getAllProducts(limit);
    res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
