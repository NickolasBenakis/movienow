import { html, render } from 'lit-html';
import { getGenres } from '../../api/fetchGenres';
import { dialogTemplate, handleExpand, renderModal } from '../dialog/dialog';

/**
 *
 * Creates a movieCard element
 * @imagUrl {string} the desired imageUrl.
 * @movieTitle {string} movie Title string
 * @id {number} movie id
 */

export default movie => {
    const backgroundUrl = movie.poster_path;
    const image = backgroundUrl
        ? `url(https://res.cloudinary.com/nickolasben/image/fetch/q_60,fl_lossy,f_auto,dpr_auto,w_auto/http://image.tmdb.org/t/p/w400${backgroundUrl})`
        : 'grey';
    const hdImage = backgroundUrl
        ? `url(https://res.cloudinary.com/nickolasben/image/fetch/q_60,fl_lossy,f_auto,dpr_auto,w_auto/http://image.tmdb.org/t/p/original${backgroundUrl})`
        : 'grey';
    return template(
        movie.id,
        movie.title,
        image,
        hdImage,
        movie.vote_average,
        movie.release_date.substring(0, 4),
        movie.genre_ids,
        movie.overview
    );
};

function template(
    id,
    movieTitle,
    image,
    hdImage,
    vote,
    year,
    genre_ids,
    overview
) {
    return html`
        <div
            id="${id}"
            class="movie-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col"
            style="background-image:${image};"
            @click=${() => {
                renderModal(
                    id,
                    hdImage,
                    movieTitle,
                    year,
                    vote,
                    getGenres(genre_ids),
                    overview
                );
                handleExpand();
            }}
        >
            <div class=" mdl-card--expand"></div>
            <div class="mdl-card__actions">
                <p class="mdl-card__title">${movieTitle}</p>
                <p class="mdl-card__meta">
                    <span class="mdl-card__meta__year">${year}</span>
                    <span class="mdl-card__meta__rating">${vote}/10</span>
                </p>
                <p class="mdl-card__genres">
                    ${getGenres(genre_ids).join('∙')}
                </p>
                <p class="mdl-card__overview">
                    ${overview}
                </p>
            </div>
            <div class="mdl-card__more">
                <svg
                    width="120"
                    height="55"
                    viewBox="-2.5 -5 75 60"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 l35,50 l35,-50"
                        fill="none"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-width="5"
                    />
                </svg>
            </div>
            <div class="movie-card__pointer"></div>
        </div>
    `;
}
