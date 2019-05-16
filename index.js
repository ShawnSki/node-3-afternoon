require('dotenv').config();
const express = require('express');
const massive = require('massive');
const products_controler = require('./products_controller');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
    })
    .catch(err => console.log(err));

app.use(express.json());


app.get('/api/products', products_controler.getAll);
app.get('/api/products/:id', products_controler.getOne);
app.put('/api/products/:id', products_controler.update);
app.post('/api/products', products_controler.create);
app.delete('/api/products/:id', products_controler.delete);


app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}.`);
})