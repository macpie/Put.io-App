import request from 'superagent';
import Promise from 'promise';
import * as Storage from '../utils/Storage';
import {
    OAUTH_SERVER,
    CLIENT_ID
} from '../config.json';

const BASE_URL = 'https://api.put.io/v2';
const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};

export const authenticate = () => {
    return new Promise((resolve, reject) => {
        if (Storage.getItem('access_token')) {
            resolve({
                access_token: Storage.getItem('access_token')
            });
        } else {
            request
                .get(BASE_URL + '/oauth2/authenticate')
                .query('client_id=' + CLIENT_ID + '&response_type=code&redirect_uri=http://' + OAUTH_SERVER + '/api/oauth')
                .set(HEADERS)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.type === 'text/html') {
                            window.open("https://put.io/?login=1");
                            reject();
                        } else {
                            Storage.setItem('access_token', res.body.access_token);
                            resolve(res.body);
                        }

                    }
                });
        }
    });
};

export const events = () => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/events/list')
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .set(HEADERS)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body.events || []);
                }
            });
    });
};
