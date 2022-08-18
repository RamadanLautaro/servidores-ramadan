const express = require('express');
const Contenedor = require('./contenedor.js');

const productos = new Contenedor('./productos.txt');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor connectado. Puerto: ${server.address().port}.`)
})

server.on("error", error => console.log(`Error en servidor: ${error}.`))

app.get('/', (req, res) => {
    res.send('<h3>• /productos: para obtener todos los productos.</h3><h3>• /productoRandom: para obtener un producto random.</h3>'
    )
})


app.get('/productos', (req, res) => {
    productos.getAll().then(productos => {
        res.send(
            productos
        )
    })
})

app.get('/productoRandom', (req, res) => {
    productos.getById(Math.floor(Math.random() * 3)).then(productoRandom => {
        res.send(
            productoRandom
        )
    })
})