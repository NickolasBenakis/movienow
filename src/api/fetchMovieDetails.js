export default id => {
    const apiKey = `bc50218d91157b1ba4f142ef7baaa6a0`;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=trailers,reviews,similar`;
    return fetch(url)
        .then(data => data.json())
        .then(res => res)
        .catch(error => {
            throw Error(error);
        });
};
