import { state } from '../index';
/**
 *
 * Sets values to States properties
 * @propertyName {String} property Name of the State
 * @value
 */

export const setState = (propertyName, value) => {
    switch (propertyName) {
        case 'searchMoviesCache':
        case 'onlineMoviesCache':
            state[propertyName.toString()].push(value);
            return (state[propertyName.toString()] = state[
                propertyName.toString()
            ].flat());
        default:
            return (state[propertyName.toString()] = value);
    }
};
