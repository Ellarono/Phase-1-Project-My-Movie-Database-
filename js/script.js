const tmdbApiKey = 'a010453857d6630568672d8933519b33';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search';
const youtubeApiKey = 'AIzaSyAyKww5kVYfuGqp_nLhhmGn1tYpSHid1eo';  

async function searchMovies(query) {
    const url = `${tmdbBaseUrl}/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

async function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = ''; // Clear previous results

    if (movies && movies.length > 0) {
        for (const movie of movies) {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Image';
            movieElement.innerHTML = `
                <a href="movies.html?id=${movie.id}">
                    <img src="${moviePoster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                </a>
            `;

            moviesContainer.appendChild(movieElement);
        }
    } else {
        moviesContainer.innerHTML = '<p>No results found</p>';
    }
}

document.getElementById('searchmovies').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (query.length > 0) {
        const movies = await searchMovies(query);
        displayMovies(movies);
    }
});
