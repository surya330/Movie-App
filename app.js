const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f878865fe7c3ac890f4b87a226e6b9b&page=1"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const Search_API = 'https://api.themoviedb.org/3/search/movie?api_key=9f878865fe7c3ac890f4b87a226e6b9b&query="';

const form = document.getElementById('form');

const search = document.getElementById('search');

const main = document.getElementById("main")

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)

    const data = await res.json();

    if(data.results.length == 0){
        document.getElementById("hello").innerHTML = "No Results Found"
    }

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie 

        const movieEl = document.createElement('div')

        movieEl.innerHTML = `
        <div class = "movie">
            <img src="${IMG_PATH + poster_path}" alt = "${title}">
            <div class = "movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class = "overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>`

        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if(vote >= 8){
        return "green"
    }
    else if(vote>= 5){
        return "orange"
    }
    else{
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if(searchTerm && searchTerm != ''){
        getMovies(Search_API + searchTerm)

        search.value = ""
    }else{
        window.location.reload()
    }
})