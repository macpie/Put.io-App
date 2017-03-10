import {
    FILES_GET
} from '../constants';

export default (state = [], {
    type,
    payload
}) => {
    switch (type) {
        case `${FILES_GET}_RESOLVED`:
            return payload.breadcrumbs;
        default:
            return state;
    }
};
