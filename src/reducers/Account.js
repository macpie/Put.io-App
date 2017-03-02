import {
    ACCOUNT_GET
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${ACCOUNT_GET}_RESOLVED`:
            return payload;
        default:
            return state;
    }
};
