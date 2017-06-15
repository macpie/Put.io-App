import {
    USER_AUTHENTICATE
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${USER_AUTHENTICATE}_RESOLVED`:
            return payload;
        case `${USER_AUTHENTICATE}`:
            return payload;
        default:
            return state;
    }
};
