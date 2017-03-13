import * as PutioApis from '../apis/Putio';
import {
    FILES_GET,
    FOLDER_CREATE
} from '../constants';

export const get = (id) => {
    return {
        type: FILES_GET,
        payload: PutioApis.filesList(id)
    };
};

export const createFolder = (parent_id, name) => {
    return dispatch => {
        return dispatch({
                type: FOLDER_CREATE,
                payload: PutioApis.createFolder(parent_id, name)
            })
            .then(() => {
                dispatch(get(parent_id));
            });
    };
};
