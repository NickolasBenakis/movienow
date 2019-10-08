// import {state} from '../index'

// export default () => {
//     console.log(location.hash.slice(1))
//     (location.hash.slice(1) === 'now-playing' ) ?
//         state.showingNowPlaying = true :
//         state.showingNowPlaying = false;
//     const sections = document.querySelectorAll('section');
//     sections.forEach(section =>{
//         section.style.display = 'none';
//     })

//     switch(state.showingNowPlaying) {
//         case true:

//     }
// }
//     // sto index mallon prepei na valw ayta sto load 
//     //         window.addEventListener('load', router);
//     // window.addEventListener('hashchange', router);

//     // Routing happens here
//     function router() {
//         // Get page state
//         state = location.hash.slice(1) || '/';
//         // Hide all sections
//         Array.from(s.section, function (el) {
//             el.style.display = 'none';
//         });
//         // Remove 'is-active' class from all navigation links
//         Array.from(s.navLinks, function (navLink) {
//             navLink.classList.remove('is-active');
//         });
//         // Manage states
//         switch (state) {
//             case 'now-playing':
//                 if (s.nowPlayingSection.querySelectorAll('.movie-card').length === 1) {
//                     getLatestMovies();
//                 }
//             // Intentional fallthrough
//             case 'search':
//                 document.getElementById(state).style.display = 'flex';
//                 Array.from(document.querySelectorAll('nav a[href="#' + state + '"]'), function (navLink) {
//                     navLink.classList.add('is-active');
//                 });
//                 break;
//             default:
//                 window.location.hash = '#now-playing';
//         }
//     }