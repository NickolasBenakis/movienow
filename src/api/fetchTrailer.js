export default movieID => {
    const apiKey = `bc50218d91157b1ba4f142ef7baaa6a0`;
    const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`;
    return fetch(url)
        .then(data => data.json())
        .catch(error => {
            throw Error(error);
        });
};
