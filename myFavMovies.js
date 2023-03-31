const TMDB_API_KEY = 'api_key=777ccdbe5233edac9d35ce3cf7b46f4a';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const favMoviesList = document.getElementById('list-container');

let moviesInList=[];


// putting the movies id from localStorage inside moviesInList
if(localStorage.getItem('moviesId') !== null){
    moviesInList = localStorage.getItem('moviesId').split(',');
}



// intialise the My favourite home page 
function intialiseFavPage(){
    favMoviesList.innerHTML ='';
}
intialiseFavPage();



// call the TMDB api using movie id for each movieId present inside localStorage 
for(let i=0; i<moviesInList.length; i++){
    // console.log('call for movieId', moviesInList[i]);
    let movieUrl = TMDB_BASE_URL+'/movie/'+moviesInList[i]+'?language=en-US&'+TMDB_API_KEY;
    apiCallForInput(movieUrl);
};



// api call function to get the data from TMDB database
async function apiCallForInput(url){
    try{
        let response = await fetch(url);
        // console.log(response);
        movieDetailsJson = await response.json(response);
        // console.log(movieDetailsJson);
        const li = createElement(movieDetailsJson);
        renderMovieDetails(li);
    }
    catch(err){
        console.log(err);
    }   
};




// function to render the movie list item for each favourite movie
function renderMovieDetails(li){
    favMoviesList.appendChild(li);
}



// function to create the li element which contains the movie details 
function createElement(movie){
    const li = document.createElement('li');
    li.id = `${movie.id}`;
    li.innerHTML = `<span class="thumbnail"><img src="${TMDB_IMAGE_BASE_URL+movie.poster_path}" alt="movie_img" id></span>
                    <span class= "details-container">
                        <span class="movie-details">
                            <a href="./moviePage.html?id=${movie.id}">${movie.original_title}</a> | <i class="fa-solid fa-clock"></i></i> ${movie.runtime} |<i class="fa-solid fa-fire" style="color: #bc791a;"></i> Popularity: ${movie.popularity}
                        </span>
                        <span class="delete-button" onclick="removeFromFavList('${movie.id}')">
                            <i class="fa-solid fa-delete-left"></i>
                        </span>
                    </span>
                    `

    return li;
}




// function for removing the movie from My favourite Movie list/from localStorage 
function removeFromFavList(id){
    // console.log('delete-button clicked');
    const movieItemDOM = document.getElementById(id);
    movieItemDOM.remove();
    let oldMoviesId = localStorage.getItem('moviesId').split(',');
    for(let i=0; i<oldMoviesId.length; i++){
        if(oldMoviesId[i] == id){
            isFound = true;
            oldMoviesId.splice(i,1);
        }
    }

    if(oldMoviesId.length==0){
        localStorage.clear();
    }
    else{
        localStorage.setItem('moviesId', oldMoviesId);
    }
};