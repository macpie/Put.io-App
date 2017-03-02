import {
    EVENTS_GET
} from '../constants';

export default (state = [], {
    type,
    payload
}) => {
    switch (type) {
        case `${EVENTS_GET}_RESOLVED`:
            return payload;
        default:
            return state;
    }
};
