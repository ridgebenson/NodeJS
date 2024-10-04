export async function populateDOM() {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        const events = await response.json();

        const container = document.getElementById('events-container');
        container.innerHTML = ''; // Clear any existing content

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('product');

            const eventImg = document.createElement('img');
            eventImg.src = event.imageUrl;
            eventImg.className = 'product-image';

            const eventTitle = document.createElement('h2');
            eventTitle.innerText = event.title;

            const eventPrice = document.createElement('p');
            eventPrice.innerText = `Price $${event.price}`;

            const eventDate = document.createElement('p');
            eventDate.innerText = `Date: ${event.date}`;

            const eventLocation = document.createElement('p');
            eventLocation.innerText = `Location: ${event.location}`;

            const eventCompany = document.createElement('p');
            eventCompany.innerText = `Organizer: ${event.company}`;

            const viewBtn = document.createElement('button');
            viewBtn.innerText = 'View';

            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';

            const delBtn = document.createElement('button');
            delBtn.innerText = 'Delete';
            

            eventCard.append(eventImg, eventTitle, eventPrice, eventDate, eventLocation, eventCompany);
            container.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}