const http = require('http');
const fs = require('fs');
const path = require('path');
const router = require('./routes/eventsRoutes.js');

// Serve static files (populateDOM.js and style.css)
const server = http.createServer((req, res) => {
    // Serve static files in the /public folder
    if (req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                const ext = path.extname(req.url);
                let contentType = 'text/plain';
                if (ext === '.css') {
                    contentType = 'text/css';
                } else if (ext === '.js') {
                    contentType = 'application/javascript';
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
    // Serve static files in the /utils folder
    else if (req.url.startsWith('/utils/')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(content);
            }
        });
    }
    // Serve the HTML file
    else if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>🎟️ Eventure </title>
                <link rel="stylesheet" href="/public/style.css">
            </head>
            <body>
                <div class="header">
                    <h1>🎟️ Eventure 🎟️</h1>
                    <button id="addEvent"> Add an Event </button>
                </div>
                <div class="container">
                    <div id="events-container"></div>
                    <div class="cart">
                        <h3>Event Details</h3>
                        <div id="cartContainer">
                            <p style="text-align:center; color:grey;">Click on an event to view details</p>
                        </div>
                    </div>
                    <script type="module">
                        import { populateDOM } from './utils/populateDOM.js';
                        populateDOM();
                    </script>
                </div>
                
            </body>
            </html>
        `);
    } else {
        router(req, res);
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
