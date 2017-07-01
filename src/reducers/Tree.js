import * as _ from 'lodash';
import {
    FILES_TREE_GET,
    FILES_TREE_RESET
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${FILES_TREE_GET}_RESOLVED`:
            return payload;
        case `${FILES_TREE_RESET}`:
            return {};
        default:
            return state;
    }
};
