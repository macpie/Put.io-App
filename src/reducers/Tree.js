import * as _ from 'lodash';
import {
    FILES_TREE_GET,
    FILES_TREE_RESET
} from '../constants';

const pick = (obj) => {
    let o = _.pick(obj, ["name", "id", "file_type", "folder_type", "parent_id", "size"]);
    o.children = [];
    return o;
};

export default (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case `${FILES_TREE_GET}_RESOLVED`:
            const {parent, files, path} = payload;

            if(parent.id === 0) {
                let node = pick(parent);

                _.forEach(files, (file) => {
                    node.children.push(pick(file));
                });

                return node;
            } else {
                let node = pick(parent),
                    newState = _.cloneDeep(state);

                node.children = _.map(files, pick);

                return _.set(newState, path, node);
            }
        case `${FILES_TREE_RESET}`:
            return {};
        default:
            return state;
    }
};
