import {
    FILE_STREAM,
    CLEAR_STREAM
} from '../constants';

export default (state = null, {
    type,
    payload
}) => {
    switch (type) {
        case `${FILE_STREAM}_RESOLVED`:
            return payload;
        case `${CLEAR_STREAM}`:
            return null;
        default:
            return state;
    }
};
