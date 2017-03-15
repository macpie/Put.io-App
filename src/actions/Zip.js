import * as PutioApis from '../apis/Putio';
import {
    ZIP_CREATE,
    ZIP_GET,
} from '../constants';

export const create = (ids) => {
    return {
        type: ZIP_CREATE,
        payload: PutioApis.zipCreate(ids)
    };
};


export const get = (id) => {
    return {
        type: ZIP_GET,
        payload: PutioApis.zip(id)
    };
};
