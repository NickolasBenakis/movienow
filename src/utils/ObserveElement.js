import {
    state
} from '../index.js';

/**
 *
 * Intersects a desire element from a desired root , if this element enters the viewport a callback is executed
 * @rootElement must be an ancestor element
 * @targetElement the desired element
 */

export default targetElement => {
    const options = {
        root: document.getElementById('main-content'),
        threshold: 1.0,
    };
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 1) {
                console.log('to vrika');
                state.elementObserved = true;
                observer.disconnect();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetElement);
};