import * as _ from 'lodash';
import {
    FILES_GET,
    FILES_DELETE
} from '../constants';

export default (state = [], {
    type,
    payload
}) => {
    switch (type) {
        case `${FILES_GET}_RESOLVED`:
            return payload.files;
        case `${FILES_DELETE}_RESOLVED`:
            return _.filter(state, (file) => {
                return (_.indexOf(payload.ids, file.id) === -1);
            })
        default:
            return state;
    }
};
