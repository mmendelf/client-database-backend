const { writeFileSync, readFileSync } = require('fs');

const path = './DB.json'

const getData = (path) => {
    const jsonData = readFileSync(path)
    return JSON.parse(jsonData)
}

const saveData = async (path, data) => {
    const stringifyData = JSON.stringify(data)
    await writeFileSync(path, stringifyData)
}

module.exports = {

    getClients: (req, res, next) => {
        if (Object.keys(req.query).length === 0) {
            let clients = getData(path);
            if (clients.length !== 0) {
                res.status(200).json(clients)
            }
            res.json({ msg: 'No data to display' })
        }
        next();
    },

    getClientByName: (req, res) => {
        if (Object.keys(req.query).length !== 0) {
            let clients = getData(path);
            const clientQ = req.query;
            const filteredClients = clients.filter(client => client.name.toLowerCase().includes(clientQ.name.toLowerCase()))
            if (filteredClients.length !== 0) {
                res.status(200).json(filteredClients);
            }
            res.json({ msg: 'No data to display' })
        }
    },

    createClient: (req, res) => {
        let existClients = getData(path);
        const newClient = {
            name: req.body.name,
            id: req.body.id,
            ip: req.body.ip,
            phone: req.body.phone
        };
        existClients.push(newClient)
        saveData(path, existClients);
        res.status(200).send(`The client ${newClient.name} was been created!!`)
    },

    deleteClientById: (req, res) => {
        const clientID = req.params.clientID
        let existClients = getData(path);
        const filterClient = existClients.filter(client => client.id != clientID)
        if (existClients.length === filterClient.length) {
            res.json({ msg: `client ${clientID} does not exist` })
        }
        saveData(path, filterClient)
        res.status(200).send(`client ${clientID} wes been deleted`)
    },

}
