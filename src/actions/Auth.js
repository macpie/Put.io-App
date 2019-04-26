import * as PutioApis from '../apis/Putio';
import * as Storage from '../utils/Storage';
import {
    USER_AUTHENTICATE
} from '../constants';

export const authenticate = () => {
    return {
        type: USER_AUTHENTICATE,
        payload: PutioApis.authenticate()
    };
};

export const fetchToken = () => {
    return {
        type: USER_AUTHENTICATE,
        payload: {
            access_token: Storage.getItem("access_token")
        }
    };
};
