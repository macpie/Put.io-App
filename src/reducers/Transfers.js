import {
    TRANSFERS_GET
} from '../constants';

export default (state = [], {
    type,
    payload
}) => {
    switch (type) {
        case `${TRANSFERS_GET}_RESOLVED`:
            return payload;
        default:
            return state;
    }
};
