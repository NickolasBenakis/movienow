import {html,render} from 'lit-html';

export default ()=> {
    const section = document.getElementById('search-list');
    const tpl = html`<div class="no-result" >Sorry No Results found :( </div>`
    render(tpl, section);
}