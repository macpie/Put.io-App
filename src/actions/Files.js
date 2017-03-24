import * as PutioApis from '../apis/Putio';
import {
    FILES_GET,
    FOLDER_CREATE,
    FILE_RENAME,
    FILES_DELETE
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

export const rename = (id, name) => {
    return dispatch => {
        return dispatch({
                type: FILE_RENAME,
                payload: PutioApis.fileRename(id, name)
            })
            .then(() => {
                dispatch(get(id));
            });
    };
};

export const remove = (ids) => {
    return {
        type: FILES_DELETE,
        payload: PutioApis.filesDelete(ids)
    };
};
