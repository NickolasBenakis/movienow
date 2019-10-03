import nowPlayingMovies from './components/nowPlayingMovies/nowPlayingMovies.js';
import './theme/index.scss';
export const state = {
    showingNowPlaying: true,
    searchInput: "",
    page: 1,
    resultsCache: {}
};

window.addEventListener('load', async () => {

    try {
        await nowPlayingMovies(state.page);
        console.log("hello world");

    } catch (error) {

    }

});