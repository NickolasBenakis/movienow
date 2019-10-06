export const fetchGenres = () => {
    const apiKey = `bc50218d91157b1ba4f142ef7baaa6a0`;

    const url =
        'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey;
    return fetch(url)
        .then(data => data.json())
        .then(res => res)
        .catch(error => {
            throw new Error(error);
        });
};

export const getGenres = genresMap => {
    return genresMap.map(function(genreId) {
        return ' ' + localStorage[genreId];
    });
};
