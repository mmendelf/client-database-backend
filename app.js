const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

const { getClients, getClientByName, createClient, deleteClientById } = require('./controller')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


app.use('/clients', getClients)
app.get('/clients', getClientByName)
app.post('/client/add', createClient)
app.delete('/client/:clientID', deleteClientById)





module.exports = app;