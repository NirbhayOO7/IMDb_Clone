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

    // console.log(movieList[2]);
}

// create the div element inside the movie-conatiner

function createElement(movie){
    // console.log(movie.original_title);
    const div = document.createElement('div');
    div.className = 'movie-item';
    let oldMovies=[];
    if(localStorage.getItem('moviesId')!==null){
        oldMovies = localStorage.getItem('moviesId').split(',');
    }
    let isPresent = false;
    for(let i=0; i<oldMovies.length; i++){
        if(oldMovies[i] == movie.id){
            isPresent = true;
        }
    }

    if(!isPresent){
        div.innerHTML = `<a href="./moviePage.html?id=${movie.id}"><img src="${TMDB_IMAGE_BASE_URL+movie.poster_path}" alt=""></a>
                    <div class="movie-name">${movie.original_title}</div>
                    <div class="rating-and-favourite">
                        <span class="rating">${movie.vote_average}<i class="fa-solid fa-star" style="color: #ffd700;"></i></span>
                        <span id="${movie.id}" class="add-to-favourite" onclick="addToFavouriteList('${movie.id}')"><i class="fa-sharp fa-solid fa-heart" style="color: #fcf7f7;"></i></span>
                    </div>`
    }
    else{
        div.innerHTML = `<a href="./moviePage.html?id=${movie.id}"><img src="${TMDB_IMAGE_BASE_URL+movie.poster_path}" alt=""></a>
                    <div class="movie-name">${movie.original_title}</div>
                    <div class="rating-and-favourite">
                        <span class="rating">${movie.vote_average}<i class="fa-solid fa-star" style="color: #ffd700;"></i></span>
                        <span id="${movie.id}" class="add-to-favourite" onclick="addToFavouriteList('${movie.id}')"><i class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i></span>
                    </div>`
    }
    
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

// localStorage.clear();
// localStorage.setItem('moviesId',[1234, 4567]);
// const temp = localStorage.getItem('moviesId').split(',');
// console.log(typeof(temp), temp);


function addToFavouriteList(id){
    if(localStorage.getItem('moviesId')==null){
        localStorage.setItem('moviesId', [id]);
        document.getElementById(id).innerHTML = '<i class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i>';
        // console.log('list is null',localStorage.getItem('moviesId'));
    }
    else{
        let oldMoviesId = localStorage.getItem('moviesId').split(',');
        // console.log(oldMoviesId);
        let isFound = false;
        for(let i=0; i<oldMoviesId.length; i++){
            if(oldMoviesId[i] == id){
                isFound = true;
                let removed = oldMoviesId.splice(i,1);
                // console.log('removed id:', removed);
                // console.log('movies in list',oldMoviesId);
                document.getElementById(id).innerHTML='<i class="fa-sharp fa-solid fa-heart" style="color: #fcf7f7;"></i>';
            }
        }

        if(!isFound){
            oldMoviesId.push(id);
            // console.log('movie not found in list', oldMoviesId);
            document.getElementById(id).innerHTML = '<i class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i>';
        }

        if(oldMoviesId.length==0){
            // console.log('oldMovies list length is 0');
            localStorage.clear();
        }
        else{
            localStorage.setItem('moviesId', oldMoviesId);
        }
        // console.log(localStorage.getItem('moviesId'));
    }
}

console.log(localStorage.getItem('moviesId'));
// localStorage.clear();
