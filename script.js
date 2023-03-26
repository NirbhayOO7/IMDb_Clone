const TMDB_API_KEY = 'api_key=777ccdbe5233edac9d35ce3cf7b46f4a';

const TMDB_HOME_URL = `https://api.themoviedb.org/3/discover/movie?${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchMovie = document.getElementById('searchMovie');

const movieContainer = document.getElementById('movie-container');


let movieList = [];

apiCallForInput(TMDB_HOME_URL);

// function to show notification
function showNotification(message){
    window.alert(message);
    return;
}

//function for api call
async function apiCallForInput(url){
    try{
        let response = await fetch(url);
        // console.log(response);
        let data = await response.json(response);
        // console.log(data.results);
        movieList = data.results;
        // console.log(movieList);
        renderMoviesList();
    }
    catch(err){
        console.log(err);
    }
    
}

// function to render the list of movies on home page
function renderMoviesList(){
    movieContainer.innerHTML = '';
    for(let i=0; i<movieList.length; i++){
        let div  = createElement(movieList[i]);
        movieContainer.appendChild(div);
    }
}

// create the div element inside the movie-conatiner

function createElement(movie){
    // console.log(movie.original_title);
    const div = document.createElement('div');
    div.className = 'movie-item';

    div.innerHTML = `<img src="${TMDB_IMAGE_BASE_URL+movie.poster_path}" alt="">
                    <div class="movie-name">${movie.original_title}</div>
                    <div class="rating-and-favourite">
                        <span class="rating">${movie.vote_average}<i class="fa-solid fa-star" style="color: #ffd700;"></i></span>
                        <span><a href=""><i class="fa-sharp fa-solid fa-heart" style="color: #c80000;"></i></a></span>
                    </div>`
    return div;
}

// what to to when we enter keywords in search bar 
searchMovie.addEventListener('keyup', ()=>{
    
    let searchInput = searchMovie.value;
    console.log(searchInput);

    var movieNameUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&${TMDB_API_KEY}`;

    if(searchInput.length !=0){
        apiCallForInput(movieNameUrl);
    }
    else{
        location.reload();
    }

});
