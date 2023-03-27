const TMDB_API_KEY = 'api_key=777ccdbe5233edac9d35ce3cf7b46f4a';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


let queryData = new URLSearchParams(location.search);

let id = queryData.get('id');

let movieUrl = TMDB_BASE_URL+'/movie/'+id.toString()+'?language=en-US&'+TMDB_API_KEY;

let movieDetailsJson;

apiCallForInput(movieUrl);

async function apiCallForInput(url){
    try{
        let response = await fetch(url);
        // console.log(response);
        movieDetailsJson = await response.json(response);
        console.log(movieDetailsJson);
        renderMovieDetails(movieDetailsJson);
    }
    catch(err){
        console.log(err);
    }
    
}

const movieContainer = document.getElementById('movie-container');

function renderMovieDetails(movieDetailsJson){
    movieContainer.innerHTML = '';
    movieContainer.innerHTML = `<div id="movie-image">
                                    <img src="${TMDB_IMAGE_BASE_URL+movieDetailsJson.poster_path}" alt="">
                                </div>
                                <div id="movie-deatils">
                                    <div id="movie-name">${movieDetailsJson.original_title}</div>
                                    <span id="produced-by">${movieDetailsJson.production_companies[0].name}</span>
                                    <span id="runtime">${movieDetailsJson.runtime}</span>
                                    <span id="release-date">${movieDetailsJson.release_date}</span>
                                    <div id="imdb-rating">${movieDetailsJson.vote_average}</div>
                                    <div id="plot">${movieDetailsJson.overview}</div>
                                </div>`

}