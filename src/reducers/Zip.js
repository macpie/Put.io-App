import * as _ from 'lodash'
import {
    ZIP_GET,
    ZIP_CLEAR
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${ZIP_GET}_RESOLVED`:
            return payload;
        case `${ZIP_CLEAR}`:
            return {};
        default:
            return state;
    }
};
