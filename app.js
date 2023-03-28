const path = require('path');
const express = require('express');

const app = express();

const { getClients, getClientByName, createClient, deleteClientById } = require('./controller')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'הצלחה!' })
})

app.use('/clients', getClients)
app.get('/clients', getClientByName)
app.post('/client/add', createClient)
app.delete('/client/:clientID', deleteClientById)





module.exports = app;