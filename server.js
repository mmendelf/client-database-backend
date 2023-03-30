const http = require('http');
const app = require('./app');
const port = process.env.PORT

const server = http.createServer(app)


app.listen(port, () => console.log(`app listening on port ${port}!\n
open in the browser http://localhost:${port}/clients`))