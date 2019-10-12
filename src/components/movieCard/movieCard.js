import { html, render } from 'lit-html';
import { getGenres } from '../../api/fetchGenres';
import { dialogTemplate, handleExpand } from '../dialog/dialog';
import fetchMovieDetails from '../../api/fetchMovieDetails';
import { isMobileDevice } from '../../utils/documentData';
import { state } from '../../index';
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
        ? `url(https://res.cloudinary.com/nickolasben/image/fetch/w_450,h_400,c_fill,g_auto/f_auto/http://image.tmdb.org/t/p/original${backgroundUrl})`
        : null;
    const hdImage = backgroundUrl
        ? `url(https://res.cloudinary.com/nickolasben/image/fetch/w_1080,h_550,c_fill,g_auto/f_auto/http://image.tmdb.org/t/p/original${backgroundUrl})`
        : null;
    return template(
        movie.id,
        movie.title,
        image,
        hdImage,
        movie.vote_average,
        movie.release_date,
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
    release_date,
    genre_ids,
    overview
) {
    const genres = getGenres(genre_ids).join('∙');
    const year = (release_date && release_date.substring(0, 4)) || '';
    return html`
        <div
            id="${id}"
            data="${image}"
            class="movie-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col lazy-load"
            @click=${async () => {
                const details = await fetchMovieDetails(id);
                render(
                    dialogTemplate(
                        id,
                        hdImage,
                        movieTitle,
                        year,
                        vote,
                        genres,
                        overview,
                        details
                    ),
                    document.querySelector('#dialog-container')
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
                    ${genres}
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
