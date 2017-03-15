import * as PutioApis from '../apis/Putio';
import {
    ACCOUNT_GET
} from '../constants';

export const info = () => {
    return {
        type: ACCOUNT_GET,
        payload: PutioApis.accountInfo()
    };
};
