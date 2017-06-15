import * as UUID from 'node-uuid';
import * as _ from 'lodash';

export default (state = [], {
    type,
    payload
}) => {
    switch (true) {
        case /ERROR_DISMISS/.test(type):
            return _.reject(state, {id: payload});
        case /\w+_REJECTED/ig.test(type):
            return _.concat(state, _.merge(payload, {
                type: type,
                id: UUID.v4()
            }));
        default:
            return state;
    }
};
