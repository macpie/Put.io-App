import {
    ERROR_DISMISS
} from '../constants';

export const dismiss = (id) => {
    return {
        type: ERROR_DISMISS,
        payload: id
    };
};
