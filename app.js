
const apiKey = "Api key Here";
const APIURL =
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
// `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);
// async function that fetches a list of movies from the URL
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    // console.log(respData);
    showMovies(respData.results);

    return respData;
}

function showMovies(movies) {
    // clearing the main div
    main.innerHTML = "";

    /* looping through the movies array and creating a div for each movie 
     and adding it to the main div*/
    movies.forEach((movie) => {
        const {
            title,
            vote_average,
            poster_path,
            overview, release_date, original_title
        } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title} </h3>
            <span class="${getClassByRate(vote_average)}">${vote_average} </span>
        </div>
        <div class="overview">
            <h3 class="ori_title">${original_title}</h3>
            <p>overview${overview}</p>
            <h3 class="release">Release Date: ${release_date}</h3>
        </div>
        `;

        main.appendChild(movieEl);
    });
};

//color coding the raring of the movie
function getClassByRate(vote) {
    if (vote > 8) {
        return "green";
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// adding an event listener to the form
form.addEventListener("submit", (e) => {

    //prevents the default behavior of submitting the form
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        /*This function will return all movies that match what was typed in as
         a search term*/
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});