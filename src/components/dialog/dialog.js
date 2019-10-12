import { html } from 'lit-html';

export const dialogTemplate = (
    id,
    image,
    title,
    year,
    vote,
    genres,
    overview,
    details
) => {
    return html`
        <div
            id="${id}"
            class="mdl-dialog custom-dialog"
            style="background-size:cover;background-attachment:fixed;background-image:${image}"
        >
            <div class="custom-dialog__close" @click=${handleClose}>
                <span class="custom-dialog__close__icon-container">
                    <i class="material-icons md-light md-48 close">close </i>
                </span>
            </div>
            <div class="custom-dialog__tabs md-light">
                <span class="overview active" @click=${showTab}>Overview</span>
                <span class="trailer" @click=${showTab}>Trailer</span>
                <span class="similar" @click=${showTab}>Similar</span>
                <span class="reviews" @click=${showTab}>Reviews</span>
            </div>
            <div class="mdl-dialog__content custom-dialog__container md-light">
                <div class="custom-dialog__overview-tab active">
                    <h1 class="custom-dialog__title">
                        ${title}
                    </h1>
                    <p class="custom-dialog__meta">
                        <span class="custom-dialog__meta__year">${year}</span>
                        <span class="custom-dialog__meta__rating">
                            ${vote + '/10'}
                        </span>
                    </p>
                    <p class="custom-dialog__genres">
                        ${genres}
                    </p>
                    <p class="custom-dialog__overview">
                        ${overview}
                    </p>
                </div>
                <div class="custom-dialog__trailer-tab">
                    ${renderTrailer(details)}
                </div>
                <div class="custom-dialog__similar-tab">
                    <ul id="similarMovies">
                        ${renderSimilarMovies(details)}
                    </ul>
                </div>
                <div class="custom-dialog__reviews-tab">
                    <ul id="reviewsMovies">
                        ${renderReviews(details)}
                    </ul>
                </div>
            </div>
            <div
                class="mdl-dialog__actions mdl-dialog__actions--full-width"
            ></div>
        </div>
    `;
};
export const handleClose = () => {
    const dialog = document.querySelector('.custom-dialog');
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.classList.remove('is-open');
    });
};

export const handleExpand = () => {
    const dialog = document.querySelector('.custom-dialog');
    dialog.classList.add('is-open');
};

export const showTab = e => {
    const movieID = parseInt(document.querySelector('.custom-dialog').id);
    switch (e.target.innerHTML.toLowerCase()) {
        case 'overview':
        case 'trailer':
        case 'similar':
        case 'reviews':
            toggleTabClasses(e);
            break;
        default:
            break;
    }
};

const renderTrailer = details => {
    if (details && details.trailers && details.trailers.youtube) {
        const trailer = details.trailers.youtube[0];
        if (trailer) {
            return html`
                <div class="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/${trailer &&
                            trailer.source}?origin=http://example.com"
                        class="trailer"
                        type="text/html"
                        width="300"
                        height="300"
                        frameborder="0"
                    >
                    </iframe>
                </div>
            `;
        } else {
            return html`
                <div class="custom-dialog__title">
                    No trailers found for this movie.
                </div>
            `;
        }
    }
};

const renderReviews = details => {
    if (details && details.reviews && details.reviews.results) {
        return details.reviews.results.slice(0, 2).map(review => {
            return html`
                <li class="review__container">
                    <span class="review__author"
                        >${review && review.author}
                    </span>
                    <span class="review__content"
                        >${review && review.content}
                    </span>
                </li>

                <li></li>
            `;
        });
    }
};

const renderSimilarMovies = details => {
    if (details && details.similar && details.similar.results) {
        return details.similar.results.slice(0, 3).map(movie => {
            return html`
                <li
                    class="similar__movie"
                    style="background-image:url(http://image.tmdb.org/t/p/w300${movie &&
                        movie.poster_path}"
                >
                    <div class="similar__movie--container">
                        <span class="similar__title"
                            >${movie && movie.original_title}
                        </span>
                        <span class="similar__date"
                            >${movie &&
                                movie.release_date &&
                                movie.release_date.substring(0, 4)}
                        </span>
                        <span class="similar__title--vote"
                            >${movie && movie.vote_average + '/10'}
                        </span>
                    </div>
                </li>

                <li></li>
            `;
        });
    }
};

const toggleTabClasses = e => {
    const allNavItems = Array.from(e.target.parentElement.children);
    const allTabItems = Array.from(
        document.querySelector('.mdl-dialog__content').children
    );
    const navItem = e.target;
    const tabItem = document.querySelector(
        `.custom-dialog__${navItem.innerHTML.toLowerCase()}-tab`
    );
    allTabItems.map(el => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        }
    });
    allNavItems.map(el => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        }
    });
    tabItem.classList.add('active');
    navItem.classList.add('active');
};

// texniki gia na klinw modal otan pataw eksw apo auto

// dialog.addEventListener('click', function (event) {
//     var rect = dialog.getBoundingClientRect();
// var isInDialog =
//     rect.top <= event.clientY &&
//     event.clientY <= rect.top + rect.height &&
//     rect.left <= event.clientX &&
//     event.clientX <= rect.left + rect.width;
//     if (!isInDialog) {
//         dialog.classList.remove('is-open');
//         document.querySelector('#dialog-container').removeChild(dialog);
//     }
// });
