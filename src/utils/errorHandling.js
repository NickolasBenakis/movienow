import { html, render} from 'lit-html';

export const showErrorTpl = (number)=> {
    const tpl = html`                
    <div class="custom-dialog__title template-error">
        ${number} movies found for this search.
    </div>`
    render(tpl, document.getElementById('search'))
}