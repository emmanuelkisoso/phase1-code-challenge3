// Frontend Logic-customise the ui

document.addEventListener('DOMContentLoaded' , async (event) =>{
    const movieOne= await getMovieOne()
    console.log(movieOne)
    displayMovieOne(movieOne)
    const allMovies= await getAllMovies()
    listMovies(allMovies)
    ticketSetup()
})

function displayMovieOne(movieOne) {
        let poster=document.getElementById('poster');

        poster.setAttribute('src','https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg')
        poster.setAttribute('alt','The Giant Gila Monster')

        let titleElement=document.getElementById('title');
        let runtimeElement=document.getElementById('runtime');
        let filmInfoElement=document.getElementById('film-info');
        let showTimeElement=document.getElementById('showtime');
        let availableTickets = movieOne.capacity - movieOne.tickets_sold;
        let ticketNumElement=document.getElementById('ticket-num');

        titleElement.textContent="The Giant Gila Monster"
        runtimeElement.textContent="108 minutes"
        filmInfoElement.textContent="A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
        showTimeElement.textContent="04:00PM"
        ticketNumElement.textContent=availableTickets.toString();
    }

function listMovies(allMovies) {
    let filmsElement=document.getElementById('films');

    filmsElement.innerHTML = '';

    allMovies.forEach((movie) => {
        if (movie.title && movie.title.trim() !== '') { // Check if the movie title is not empty
            let titleDiv=document.createElement('div');
            titleDiv.textContent=movie.title;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteMovie(movie.id));

            titleDiv.appendChild(deleteButton);
            filmsElement.appendChild(titleDiv);
        }
    });
}

function ticketSetup() {
    let ticketNumElement = document.getElementById('ticket-num');
    let buyTicketElement = document.getElementById('buy-ticket');


    buyTicketElement.addEventListener('click', () => {
        let availableTickets = parseInt(ticketNumElement.textContent);

        if (availableTickets > 0) {
            availableTickets--;
            ticketNumElement.textContent = availableTickets.toString();

            if (availableTickets === 0) {
                ticketNumElement.textContent = "0";
                buyTicketElement.disabled = true;
                buyTicketElement.textContent="Sold Out";
            }
        }
    });
}





// Business Logic-use the crud method
function getMovieOne() {
    return fetch("https://codechallenge3-1.onrender.com/films/1",{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    .then(res =>res.json())
    .then(movieOne =>movieOne)
}
function getAllMovies() {
    return fetch("https://codechallenge3-1.onrender.com/films",{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    .then(res =>res.json())
    .then(allMovies =>allMovies)
}
function getTickets() {
    return fetch("https://codechallenge3-1.onrender.com/films/1",{
        method: 'PATCH',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:{
            "tickets_sold": 28
        }
    })
    .then(res =>res.json())
    .then(tickets =>tickets)
}
function buyTickets(filmId,numberOfTickets) {
    const body={
        film_id: filmId,
        number_of_tickets: numberOfTickets
    }
    fetch('https://codechallenge3-1.onrender.com/films',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then ((data)=> {
        console.log('Ticket Purchased Successfully:',(data))
    })
    .catch (error =>{
        console.log('Ticket Not Purchased:',error)
    })
}
function deleteMovie(id) {
    const filmElement =document.getElementById(id);
    if (filmElement) {
    filmElement.remove();
    }
    fetch(`https://codechallenge3-1.onrender.com/films/${id}`,{
    method: 'DELETE',
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
    })
    .then(res =>res.json())
    .then((data)=> {
        console.log('Film Deleted Successfully:',data)
    })
    .catch(error =>{
        console.log('Film Not Deleted Successfully:',error)
    })
}