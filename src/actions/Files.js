import * as PutioApis from '../apis/Putio';
import {
    FILES_GET
} from '../constants';

export const get = (id) => {
    return {
        type: FILES_GET,
        payload: PutioApis.filesList(id)
    };
};
