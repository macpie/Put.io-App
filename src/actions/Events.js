import * as PutioApis from '../apis/Putio';
import {
    EVENTS_GET
} from '../constants';

export const getAll = () => {
    return {
        type: EVENTS_GET,
        payload: PutioApis.eventsList()
    };
};
