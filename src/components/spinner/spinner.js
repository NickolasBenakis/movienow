
const spinner = document.getElementById('spinner');


export const loadSpinner = ()=> {
    spinner.classList.add('is-active');
}

export const removeSpinner = ()=> {
    spinner.classList.remove('is-active');
}