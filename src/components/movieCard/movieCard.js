/**
 * 
 * Creates a movieCard element
 * @imagUrl {string} the desired imageUrl.
 * @movieTitle {string} movie Title string
 * @id {number} movie id 
 */

export default (imageUrl, movieTitle, id) => {
    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add(`movieID-${id}`)

    card.innerHTML = `
    <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${imageUrl}">
    </div>
    <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">
            ${movieTitle}
        <i class="material-icons right">more_vert</i></span>
        <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>`
}