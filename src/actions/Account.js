import * as PutioApis from '../apis/Putio';
import {
    ACCOUNT_GET
} from '../constants';

export const getInfo = () => {
    return {
        type: ACCOUNT_GET,
        payload: PutioApis.accountInfo()
    };
};
