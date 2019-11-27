

const requestHandler = (req, res) => {
    console.log('asd');
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
    // const url = req.url;
    // if (url === '/') {
    //     //res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.send('Hello World from nodeJS!'); //write a response to the client
    //     res.end();
    // }
}

module.exports.requestHandler;