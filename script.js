const apiKey = 'd5b9a86';
const apiBaseUrl = 'http://www.omdbapi.com/';

async function searchMovies(query) {
    const url = `${apiBaseUrl}?apikey=${apiKey}&s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search; // OMDB API returns the results in a "Search" array
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = ''; // Clear previous results

    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            
            const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x225?text=No+Image';
            movieElement.innerHTML = `
                <img src="${moviePoster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            `;

            moviesContainer.appendChild(movieElement);
        });
    } else {
        moviesContainer.innerHTML = '<p>No results found</p>';
    }
}

document.getElementById('Searchmovies').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (query.length > 0) {
        const movies = await searchMovies(query);
        displayMovies(movies);
    }
});
