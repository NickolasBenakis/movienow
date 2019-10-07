import { html, render } from 'lit-html';
import fetchTrailer from '../../api/fetchTrailer';
export const dialogTemplate = (
    id,
    image,
    title,
    year,
    vote,
    genres,
    overview
) => {
    return html`
        <div
            class="mdl-dialog custom-dialog"
            style="background-size:cover;background-image:${image}"
        >
            <div class="custom-dialog__close">
                <i
                    class="material-icons md-light md-48 close"
                    @click=${handleClose}
                    >close
                </i>
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
                        ${genres.join(' ∙ ')}
                    </p>
                    <p class="custom-dialog__overview">
                        ${overview}
                    </p>
                </div>
                <div class="custom-dialog__trailer-tab">
                    <p>${displayTrailer(id)}</p>
                </div>
                <div class="custom-dialog__similar-tab">
                    <p>Nikos</p>
                </div>
                <div class="custom-dialog__reviews-tab">
                    <p>Skata</p>
                </div>
            </div>

            <div
                class="mdl-dialog__actions mdl-dialog__actions--full-width"
            ></div>
        </div>
    `;
};
export const handleClose = () => {
    var dialog = document.querySelector('.custom-dialog');
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.classList.remove('is-open');
    });
};

export const handleExpand = () => {
    const dialog = document.querySelector('.custom-dialog');
    dialog.classList.add('is-open');
};

export const renderModal = (id, image, title, year, vote, genres, overview) => {
    const dialogTpl = dialogTemplate(
        id,
        image,
        title,
        year,
        vote,
        genres,
        overview
    );
    render(dialogTpl, document.querySelector('#dialog-container'));
};

export const showTab = e => {
    const allNavItems = Array.from(e.target.parentElement.children);
    const allTabItems = Array.from(
        document.querySelector('.mdl-dialog__content').children
    );
    const navItem = e.target;
    const tabItem = document.querySelector(
        `.custom-dialog__${navItem.innerHTML.toLowerCase()}-tab`
    );
    switch (navItem.innerHTML.toLowerCase()) {
        case 'overview':
        case 'trailer':
        case 'similar':
        case 'reviews':
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
            break;
        default:
            break;
    }
};

export const displayTrailer = async movieID => {
    try {
        const res = await fetchTrailer(movieID);
        if (
            res !== undefined &&
            res.results !== undefined &&
            res.results.length !== 0 &&
            res.results[0].key !== undefined &&
            res.results[0].key !== null
        ) {
            return setTrailerURLtoIFRAME(res.results[0].key, movieID);
        }
    } catch (err) {
        throw Error(err);
    }
};
// gia eksw apo to modal
// () => {
//     dialog.addEventListener('click', function(event) {
//         var rect = dialog.getBoundingClientRect();
//         var isInDialog =
//             rect.top <= event.clientY &&
//             event.clientY <= rect.top + rect.height &&
//             rect.left <= event.clientX &&
//             event.clientX <= rect.left + rect.width;
//         if (!isInDialog) {
//             dialog.classList.remove('is-open');
//             container.removeChild(dialog);
//         }
//     });
// }
