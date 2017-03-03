import * as PutioApis from '../apis/Putio';
import {
    TRANSFERS_GET,
    TRANSFERS_CLEAN,
    TRANSFER_CANCEL
} from '../constants';

export const getAll = () => {
    return {
        type: TRANSFERS_GET,
        payload: PutioApis.transfersList()
    };
};

export const clean = () => {
    return dispatch => {
        return dispatch({
                type: TRANSFERS_CLEAN,
                payload: PutioApis.transfersClean()
            })
            .then(() => {
                dispatch(getAll());
            });
    };
};

export const cancel = (id) => {
    return dispatch => {
        return dispatch({
                type: TRANSFER_CANCEL,
                payload: PutioApis.transferCancel(id)
            })
            .then(() => {
                dispatch(getAll());
            });
    };
};
