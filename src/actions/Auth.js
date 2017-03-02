import * as PutioApis from '../apis/Putio';
import {
    USER_AUTHENTICATE
} from '../constants';

export const authenticate = () => {
    return {
        type: USER_AUTHENTICATE,
        payload: PutioApis.authenticate()
    };
};
