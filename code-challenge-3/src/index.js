// Frontend Logic-customise the ui

document.addEventListener('DOMContentLoaded' , async (event) =>{
    const movieOne= await getMovieOne()
    console.log(movieOne)
    displayMovieOne(movieOne)
})

function displayMovieOne(movieOne) {
        let poster=document.getElementById('poster');

        poster.setAttribute('src','https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg')
        poster.setAttribute('alt','The Giant Gila Monster')
    }


// Business Logic-use the crud method
function getMovieOne() {
    return fetch("http://localhost:3000/films/1",{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    .then(res =>res.json())
    .then(movieOne =>movieOne)
}