import { html, render } from 'lit-html';
/**
 *
 * Creates a movieCard element
 * @imagUrl {string} the desired imageUrl.
 * @movieTitle {string} movie Title string
 * @id {number} movie id
 */

export default (imageUrl, movieTitle, id) => {
    const backgroundImage = imageUrl
        ? `url(http://image.tmdb.org/t/p/w300${imageUrl})`
        : '';
    return template(id, movieTitle, backgroundImage);
};

function template(id, movieTitle, image) {
    return html`
        <div
            id="${id}"
            class="movie-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col"
            style="background-image:${image};"
            <div
            class="mdl-card__title mdl-card--expand"
        >
            <div class="mdl-card__actions">
                <p>${movieTitle}</p>
            </div>
            <div class="movie-card__pointer"></div>
        </div>
    `;
}
