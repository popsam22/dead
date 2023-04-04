const fileSystem = require('fs');

const testServer = (request, response) => {
    const url = request.url;
    const method = request.method;
    
    if(url === '/'){
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>My Test Server</title></head>');
        response.write("<body><form action='/create-user' method='POST'><input name='username' type='text'/><button type='submit'>Submit</button></form></body>")
        response.write('</html>');
        return response.end();

    }
    if( url === '/users'){
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<head><title>Users</title></head>');
        response.write("<body><ul><li>User 1</li><li>User 2</li></ul></body>");
        response.write('</html>');
        return response.end();
    }
    if( url === '/create-user' && method === 'POST'){
        const body = [];
        request.on('data',chunk =>{
            body.push(chunk);
        });

        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fileSystem.writeFileSync('user.txt', username)
            response.writeHead(302, {location: '/'});
            response.end();
            });
    };
};

module.exports= testServer;