const tmdbApiKey = 'a010453857d6630568672d8933519b33';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const youtubeApiKey = 'AIzaSyAyKww5kVYfuGqp_nLhhmGn1tYpSHid1eo';  
const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

async function getMovieDetails(movieID) {
    const url = `${tmdbBaseUrl}/movie/${movieID}?api_key=${tmdbApiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting movie details:', error);
        return null;
    }
}

async function getMovieTrailer(title) {
    const url = `${youtubeBaseUrl}?key=${youtubeApiKey}&part=snippet&type=video&q=${encodeURIComponent(title)} trailer`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items[0] ? `https://www.youtube.com/watch?v=${data.items[0].id.videoId}` : null;
    } catch (error) {
        console.error('Error getting movie trailer:', error);
        return null;
    }
}

async function getMovieReviews(movieID) {
    const url = `${tmdbBaseUrl}/movie/${movieID}/reviews?api_key=${tmdbApiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error getting movie reviews:', error);
        return [];
    }
}

async function displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get('id');

    if (movieID) {
        const movieDetails = await getMovieDetails(movieID);
        if (movieDetails) {
            const movieTrailer = await getMovieTrailer(movieDetails.title);

            const movieDetailsContainer = document.getElementById('movieDetailsContainer');
            const moviePoster = movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image';

            movieDetailsContainer.innerHTML = `
                <img src="${moviePoster}" alt="${movieDetails.title}">
                <h2>${movieDetails.title}</h2>
                <p>Release Date: ${movieDetails.release_date}</p>
                <p>Rating: ${movieDetails.vote_average || 'N/A'}</p>
                <p>${movieDetails.overview}</p>
                ${movieTrailer ? `<a href="${movieTrailer}" target="_blank">Watch Trailer</a>` : ''}
            `;

            // Fetch and display reviews
            const reviews = await getMovieReviews(movieID);
            const reviewsContainer = document.getElementById('reviewsContainer');
            reviewsContainer.innerHTML = `
                <h3>Reviews:</h3>
                <ul>
                    ${reviews.length > 0 ? reviews.slice(0, 3).map(review => `<li>${review.content}</li>`).join('') : '<li>No reviews available</li>'}
                </ul>
            `;
        } else {
            document.getElementById('movieDetailsContainer').innerHTML = '<p>No movie details available</p>';
        }
    } else {
        document.getElementById('movieDetailsContainer').innerHTML = '<p>No movie details available</p>';
    }
}

displayMovieDetails();
