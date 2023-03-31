const TMDB_API_KEY = 'api_key=777ccdbe5233edac9d35ce3cf7b46f4a';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movie-container');

// new URLSearchParams will give us the data present inside the url
let queryData = new URLSearchParams(location.search);


// id will have the movie.id
let id = queryData.get('id');



// movieUrl to send the api call and query the TMDB database to get the details for specific movie.id
let movieUrl = TMDB_BASE_URL+'/movie/'+id.toString()+'?language=en-US&'+TMDB_API_KEY;

apiCallForInput(movieUrl);

//function for api call to get the json data from TMDB database
let movieDetailsJson;
async function apiCallForInput(url){
    try{
        let response = await fetch(url);
        // console.log(response);
        movieDetailsJson = await response.json(response);
        // console.log(movieDetailsJson);
        renderMovieDetails(movieDetailsJson);
    }
    catch(err){
        console.log(err);
    }
    
}

// function to render the details about the movie like Image, name, plot, runtime and etc 
function renderMovieDetails(movieDetailsJson){
    movieContainer.innerHTML = '';
    movieContainer.innerHTML = `<div id="movie-image">
                                    <img src="${TMDB_IMAGE_BASE_URL+movieDetailsJson.poster_path}" alt="">
                                </div>
                                <div id="movie-details">
                                    <h1 id="movie-name">${movieDetailsJson.original_title}</h1>
                                    <span id="runtime">Runtime:${movieDetailsJson.runtime}</span>
                                    <span id="release-date">Release-date:${movieDetailsJson.release_date}</span>
                                    <br>
                                    <div id="imdb-rating">IMDB:${movieDetailsJson.vote_average}</div>
                                    <br>
                                    <div id="plot">Plot:<br>${movieDetailsJson.overview}</div><br>
                                    <span>Budget:${movieDetailsJson.budget}</span><br>
                                    <span>Revenue:${movieDetailsJson.revenue}</span>
                                </div>`

}