const mongoose = require('mongoose');

const password = encodeURIComponent(process.env.PASSWORD)

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${password}@atlascluster.nfdv8zv.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log('connected')
})

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    ip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});



const Client = mongoose.model('Client', clientSchema);

module.exports = {

    getClients: async (req, res, next) => {
        if (Object.keys(req.query).length == 0) {
            try {
                const clients = await Client.find();
                if (clients.length != 0) {
                    return res.status(200).json(clients)
                }
                res.json({ msg: 'No data to display' })
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
        next();
    },
    getClientByName: async (req, res) => {
        if (Object.keys(req.query).length !== 0) {
            try {
                const clientQ = await req.query.name;
                const clients = await Client.find({ name: { $regex: `${clientQ}`, $options: 'i' } });
                if (clients.length != 0) {
                    return res.status(200).json(clients);
                }
                res.json({ msg: 'No data to display' })
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    },

    createClient: async (req, res) => {
        try {
            const client = new Client(req.body);
            await client.save();
            res.status(200).json(client);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteClientById: async (req, res) => {
        try {
            const { clientID } = req.params;
            let find = await Client.findOneAndRemove({ _id: clientID })
            if (find)
                return res.json({ message: 'Client deleted successfully' });
            res.json({ message: 'Client not exist' })
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
