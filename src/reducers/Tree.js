import * as _ from 'lodash';
import {
    FILES_TREE_GET
} from '../constants';

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${FILES_TREE_GET}_RESOLVED`:
            return payload;

        default:
            return state;
    }
};
