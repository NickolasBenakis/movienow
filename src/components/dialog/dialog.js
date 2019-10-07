import { html, render } from 'lit-html';

export const dialogTemplate = image => {
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
            <div class="mdl-dialog__content">
                <p>
                    Allow this site to collect usage data to improve your
                    experience?
                </p>
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

export const renderModal = image => {
    const dialogTpl = dialogTemplate(image);
    render(dialogTpl, document.querySelector('#dialog-container'));
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
