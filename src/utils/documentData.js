// const body = document.body;
// const html = document.documentElement;
// const section = document.querySelector('section');
// export function getDocumentHeight() {


//     return Math.max(
//         section.scrollHeight, section.offsetHeight,
//         html.clientHeight, html.scrollHeight, html.offsetHeight
//     );
// };

export function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}