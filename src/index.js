import movieCard from './components/movieCard/movieCard.js';
import nowPlayingMovies from './components/nowPlayingMovies/nowPlayingMovies.js';

export const state = {
    showingNowPlaying: true,
    searchInput: "",
    page: 1,
    resultsCache: {},
    likes: Likes()
};

window.addEventListener('load', async () => {

    try {
        await nowPlayingMovies(state.page);
        console.log("hello world");

    } catch (error) {

    }

});