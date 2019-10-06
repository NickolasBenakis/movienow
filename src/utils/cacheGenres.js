import { fetchGenres } from '../api/fetchGenres';
/**
 *
 * Cache genres in localstorage
 *
 */
export default () => {
    fetchGenres().then(data => {
        data.genres.map(genreObj => {
            localStorage.setItem(genreObj.id, genreObj.name);
        });
    });
};
