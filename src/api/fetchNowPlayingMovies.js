export default (pageNumber) => {
    const apiKey = `bc50218d91157b1ba4f142ef7baaa6a0`;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`;
    return fetch(url)
        .then(data => data.json())
        .then(res => res)
        .catch(error => {
            throw new Error(error)
        });
}