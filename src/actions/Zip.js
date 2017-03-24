import * as PutioApis from '../apis/Putio';
import {
    ZIP_CREATE,
    ZIP_GET,
    ZIP_CLEAR,
} from '../constants';

export const get = (id) => {
    return {
        type: ZIP_GET,
        payload: PutioApis.zip(id)
    };
};

export const create = (ids) => {
    return dispatch => {
        return dispatch({
                type: ZIP_CREATE,
                payload: PutioApis.zipCreate(ids)
            })
            .then(({value}) => {
                dispatch(get(value.zip_id));
            });
    };
};

export const clear = (id) => {
    return {
        type: ZIP_CLEAR,
        payload: {id}
    };
};
