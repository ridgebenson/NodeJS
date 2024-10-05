export async function populateDOM() {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        const events = await response.json();

        const container = document.getElementById('events-container');
        container.innerHTML = '';

        const cartDiv = document.getElementById('cartContainer');

        const addEventBtn = document.getElementById('addEvent');
        addEventBtn.addEventListener('click', () => {
            let title = prompt('Enter the title');
            if (!title) return;  // Exit if user cancels or leaves blank

            let price = prompt('Enter the price');
            if (!price) return;

            let date = prompt('Enter the date');
            if (!date) return;

            let location = prompt('Enter the location');
            if (!location) return;

            let company = prompt('Enter the company');
            if (!company) return;

            let imageUrl = prompt('Enter the image URL');
            if (!imageUrl) return;

            const newEvent = {
                title,
                price,
                date,
                location,
                company,
                imageUrl,
            };

            fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Event added:', data);
                    populateDOM();
                })
                .catch(error => console.error('Error adding event:', error));
        });

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('product');

            const eventImg = document.createElement('img');
            eventImg.src = event.imageUrl;
            eventImg.className = 'product-image';

            const eventTitle = document.createElement('h2');
            eventTitle.innerText = event.title;

            const eventPrice = document.createElement('p');
            eventPrice.innerText = `Price: $${event.price}`;

            const eventDate = document.createElement('p');
            eventDate.innerText = `Date: ${event.date}`;

            const eventLocation = document.createElement('p');
            eventLocation.innerText = `Location: ${event.location}`;

            const eventCompany = document.createElement('p');
            eventCompany.innerText = `Organizer: ${event.company}`;

            const btnDiv = document.createElement('div');
            btnDiv.className = 'btn-div';

            const viewBtn = document.createElement('button');
            viewBtn.innerText = 'View';
            viewBtn.className = 'btn';

            viewBtn.addEventListener('click', () => {
                cartDiv.innerHTML = '';
                cartDiv.appendChild(eventImg.cloneNode(true));
                cartDiv.appendChild(eventTitle.cloneNode(true));
                cartDiv.appendChild(eventPrice.cloneNode(true));
                cartDiv.appendChild(eventDate.cloneNode(true));
                cartDiv.appendChild(eventLocation.cloneNode(true));
                cartDiv.appendChild(eventCompany.cloneNode(true));
            });

            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.className = 'btn';

            editBtn.addEventListener('click', () => {
                const title = prompt('Enter the new title', event.title);
                if (title === null) return;

                const price = prompt('Enter the new price', event.price);
                if (price === null) return;

                const date = prompt('Enter the new date', event.date);
                if (date === null) return;

                const location = prompt('Enter the new location', event.location);
                if (location === null) return;

                const company = prompt('Enter the new company', event.company);
                if (company === null) return;

                const imageUrl = prompt('Enter the new image URL', event.imageUrl);
                if (imageUrl === null) return;

                const updatedEvent = {
                    title,
                    price,
                    date,
                    location,
                    company,
                    imageUrl,
                };

                fetch(`http://localhost:3000/api/events/${event.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedEvent),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Event updated:', data);
                        populateDOM();
                    })
                    .catch(error => console.error('Error updating event:', error));
            });


            const delBtn = document.createElement('button');
            delBtn.innerText = 'Delete';
            delBtn.className = 'btn';

            delBtn.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/events/${event.id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error deleting event');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Event deleted:', data);
                        populateDOM();
                    })
                    .catch(error => {
                        console.error('Error deleting event:', error);
                    });
            });


            eventCard.append(eventImg, eventTitle, eventPrice, eventDate, eventLocation, eventCompany, btnDiv);
            container.appendChild(eventCard);
            btnDiv.append(viewBtn, editBtn, delBtn);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}