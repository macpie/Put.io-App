import * as PutioApis from '../apis/Putio';
import {
    FILES_GET,
    FOLDER_CREATE,
    FILE_RENAME,
    FILES_DELETE,
    FILE_STREAM,
    CLEAR_STREAM,
    FILE_MP4,
    FILE_MP4_STATUS,
    FILE_MP4_STATUS_RESET,
    FILES_TREE_GET,
    FILES_MOVE
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

export const move = (files_ids, parent_id) => {
    return dispatch => {
        return dispatch({
                type: FILES_MOVE,
                payload: PutioApis.filesMove(files_ids, parent_id)
            })
            .then(() => {
                dispatch(get(parent_id));
            });
    };
};

export const remove = (ids) => {
    return {
        type: FILES_DELETE,
        payload: PutioApis.filesDelete(ids)
    };
};

export const mp4 = (id) => {
    return {
        type: FILE_MP4,
        payload: PutioApis.fileMp4(id)
    };
};

export const mp4Status = (id) => {
    return {
        type: FILE_MP4_STATUS,
        payload: PutioApis.fileMp4Status(id)
    };
};

export const mp4StatusReset = () => {
    return {
        type: FILE_MP4_STATUS_RESET
    };
};

export const tree = () => {
    return {
        type: FILES_TREE_GET,
        payload: PutioApis.filesTree()
    };
};
