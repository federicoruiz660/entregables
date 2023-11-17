*nota:

para poder utilizar el metodo update, tal como dice la consigna en la diapositiva, se le debe pasar como parametro un id (existente o no, ya que tiene validacion) y el campo a actualizar, ya sea el objeto entero con todos sus campos o el objeto con campos faltantes, lo cual dejaria intactos los campos que no se completaron

ejemplo:

//update
productManagerInstance.updateProduct(2, {
    title: "Nuevo título",
    description: "Nueva descripción",
    price: 300,
    thumbnail: "Nueva imagen",
    code: "Nuevo código",
    stock: 50


ahi se esta actualizando el producto con id numero 2.