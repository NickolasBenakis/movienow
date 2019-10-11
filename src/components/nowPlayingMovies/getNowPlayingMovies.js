import fetchNowPlayingMovies from '../../api/fetchNowPlayingMovies';


export default async (pageNumber) => {
    try {
        const { results } = await fetchNowPlayingMovies(pageNumber);
        return results;
    } catch (error) {
        alert('Sorry there was an error Please reload', error);
    }
};
