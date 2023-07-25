// This code is a JavaScript script that fetches and displays movie data from The Movie Database (TMDb) API. It consists of three main components: the constants that hold the API endpoints, the function to fetch and display movies, and an event listener to handle movie search functionality. Below is a commented explanation of each component:


// Constants holding the API endpoints
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ab3a71ba3a395ee41faf7775320dc683&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=ab3a71ba3a395ee41faf7775320dc683&query=";

// References to HTML elements
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Initial call to fetch and display movies using the default API link
returnMovies(APILINK);

// Function to fetch and display movies based on the provided URL
function returnMovies(url) {
  // Fetch movie data from the provided URL
  fetch(url)
    .then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      // Loop through each movie in the fetched data
      data.results.forEach(element => {
        // Create HTML elements for movie display
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        // Set movie title and image source
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        image.src = IMG_PATH + element.poster_path;

        // Append movie elements to the respective containers
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        // Append the row to the main container
        main.appendChild(div_row);
      });
    });
}

// Event listener to handle movie search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Clear the existing movies displayed on the page
  main.innerHTML = '';
  
  // Get the search query from the input field
  const searchItem = search.value;
  
  if (searchItem) {
    // Call the returnMovies function with the search query appended to the API endpoint
    returnMovies(SEARCHAPI + searchItem);
    // Clear the search input field
    search.value = "";
  }
});
