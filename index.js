/* const Person = require('./person'); //'Common JS'

// import Person from './person' ('ES6')

const person1 = new Person('John Doe',30);

person1.greeting();

const Logger = require('./logger');

const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener: ', data));

logger.log('Hello world');
logger.log('Hi there');
logger.log('Hello there'); */

// Express makes this much easier 'app.get('/about', () => ...)
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
    /* if(req.url == '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        })
    }
    else if(req.url == '/api/users') {
        const users = [
            {
                name: 'Bob smith',
                age: 40
            },
            {
                name: 'John doe',
                age: 34
            }
        ];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } */

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css': 
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            }
            else {
                // Some server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        }
        else {
            //Success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000; //Checks if process.env.PORT exists, if not, runs on 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Deployment to Heroku

/* git init 
git add .
git commit -m "Initial commit"
heroku create //creates new app
heroku git:remote -a arcane-woodland-61463
git push heroku master 
heroku open */


