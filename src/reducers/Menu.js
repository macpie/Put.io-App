import {
    MENU_TOGGLE
} from '../constants';

export default (state = false, {type, payload}) => {
    switch (type) {
        case MENU_TOGGLE:
            return !state;
        default:
            return state;
    }
};
