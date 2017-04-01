import * as PutioApis from '../apis/Putio';
import {
    FILES_GET,
    FOLDER_CREATE,
    FILE_RENAME,
    FILES_DELETE,
    FILE_STREAM,
    CLEAR_STREAM
} from '../constants';

export const get = (id) => {
    return {
        type: FILES_GET,
        payload: PutioApis.filesList(id)
    };
};

export const getTextFile = (id) => {
    return {
        type: FILE_STREAM,
        payload: PutioApis.fileStream(id)
    };
}

export const clearStream = () => {
    return {
        type: CLEAR_STREAM
    };
}

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
