

import fetchAllMovies from '../../api/fetchAllMovies';

/**
**@input {String} search input
**@pageNumber {Number} number needed for pagination
**@returns {Promise}
*
**/
export default async (input,pageNumber) => {
    try {
        const { results } = await fetchAllMovies(input,pageNumber);
        return results;
    } catch (error) {
        console.log(error);
        alert('Sorry there was an error Please reload', error);
    }
};
