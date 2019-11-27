const http = require('http');

const routes = require('./routes')

//create a server object:
const server = http.createServer(routes);
    
server.listen(3030); //the server object listens on port 8080