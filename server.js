const http = require('http');
const app = require('./app');
const port = 3770

const server = http.createServer(app)


app.listen(port, () => console.log(`app listening on port ${port}!\n
open in the browser http://localhost:3770/`))