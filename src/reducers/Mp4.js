import {
    FILE_MP4_STATUS,
    FILE_MP4_STATUS_RESET
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${FILE_MP4_STATUS}_RESOLVED`:
            return payload;
        case `${FILE_MP4_STATUS_RESET}`:
            return {};
        default:
            return state;
    }
};
