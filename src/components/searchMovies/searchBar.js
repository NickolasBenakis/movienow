import state from '../../index'
import getAllMovies from './getAllMovies';
// export default () => {
//     const input = document.getElementById('searchBar');
//     input.addEventListener('keyup',_.debounce(()=> {
//         state.input = input.value && input.value.toLowerCase();
//         if (state.input && state.input !== undefined) {
//             getAllMovies(state.input,state.searchPage)
//         }
//         ObserveElement(elementToObserve);
//         window.addEventListener(
//             'scroll',
//             _.throttle(() => {
//                 applyColorToHeader('colorfull');

//                 if (state.elementObserved) {
//                     state.searchPage++;
//                     state.elementObserved = false;
//                     nowPlayingMoviesLogic();
//                 }
//             }),
//             5000
//         );
//     }),2000)
// }