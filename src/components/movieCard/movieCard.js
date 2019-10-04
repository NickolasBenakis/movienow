/**
 *
 * Creates a movieCard element
 * @imagUrl {string} the desired imageUrl.
 * @movieTitle {string} movie Title string
 * @id {number} movie id
 */


export default (imageUrl, movieTitle, id) => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.style.backgroundImage = imageUrl ? 'url(http://image.tmdb.org/t/p/w300' + imageUrl + ')' : "../assets/icons/blackPlaceHolder.jpg";
    card.classList.add(`movieID-${id}`);
    card.classList.add(
        'mdl-card',
        'mdl-shadow--2dp',
        'mdl-cell',
        'mdl-cell--3-col'
    );
    card.innerHTML = `
    <div class="mdl-card__title mdl-card--expand"></div>
    <div class="mdl-card__actions">
        <p>${movieTitle}</p>
    </div>
    <div class="movie-card__pointer">
    </div>`;
    return card;
};