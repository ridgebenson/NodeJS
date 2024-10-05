const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../config/db.json');

let eventsListData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));


const router = async (req, res) => {

    const { url, method } = req;

    const sendJSONResponse = (statusCode, data) => {
        res.writeHead(statusCode, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(data));
    };

    if (url === '/api/events' && method === 'GET') {
        if (eventsListData.length === 0) {
            sendJSONResponse(404, { message: 'No events found' });
            return;
        } else {
            sendJSONResponse(200, eventsListData);
        }
    }
    // Get an event
    else if (url.match(/\/api\/events\/\d+/) && method === 'GET') {
        const id = parseInt(url.split('/')[3]);

        const event = eventsListData.find((event) => event.id === id);

        if (!event) {
            sendJSONResponse(404, { message: 'Event not found' });
            return;
        } else {
            sendJSONResponse(200, event);
        }
    }
    // Create an event
    else if (url === '/api/events' && method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newEvent = JSON.parse(body);

            // Generate the next ID
            const maxId = eventsListData.reduce((max, event) => (event.id > max ? event.id : max), 0);
            newEvent.id = maxId + 1;

            // Add the new event to the list
            eventsListData.push(newEvent);

            // Write the updated list back to the database file
            fs.writeFile(dbFilePath, JSON.stringify(eventsListData, null, 2), (err) => {
                if (err) {
                    sendJSONResponse(500, { message: 'Failed to create event in database' });
                    return;
                }
                sendJSONResponse(201, newEvent);
            });
        });

    }
    // Update an event
    else if (url.match(/\/api\/events\/\d+/) && method === 'PUT') {
        const id = parseInt(url.split('/')[3]);

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const updatedEvent = JSON.parse(body);

            // Ensure the ID is not changed
            updatedEvent.id = id;

            // Update the event in the list
            eventsListData = eventsListData.map((event) => {
                if (event.id === id) {
                    return { ...event, ...updatedEvent };
                }
                return event;
            });

            // Write the updated list back to the database file
            fs.writeFile(dbFilePath, JSON.stringify(eventsListData, null, 2), (err) => {
                if (err) {
                    sendJSONResponse(500, { message: 'Failed to update event in database' });
                    return;
                }
                sendJSONResponse(200, updatedEvent);
            });
        });
    }

    // Delete an event
    else if (url.match(/\/api\/events\/\d+/) && method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);

        // Filter out the event with the specified ID
        eventsListData = eventsListData.filter((event) => event.id !== id);

        // Write the updated list back to the database file
        fs.writeFile(dbFilePath, JSON.stringify(eventsListData, null, 2), (err) => {
            if (err) {
                sendJSONResponse(500, { message: 'Failed to delete event from database' });
                return;
            }
            sendJSONResponse(200, { message: 'Event deleted' });
        });
    }
    else {
        sendJSONResponse(404, { message: 'Route not found' });
    }

};

module.exports = router;