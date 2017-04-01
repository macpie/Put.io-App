import request from 'superagent';
import Promise from 'promise';
import * as _ from 'lodash';
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

export const downloadLink = (id) => {
    return BASE_URL + '/files/' + id + '/download?oauth_token=' + Storage.getItem('access_token');
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

export const eventsList = () => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/events/list')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body.events || []);
                }
            });
    });
};

export const accountInfo = () => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/account/info')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body.info || {});
                }
            });
    });
};

export const transfersList = () => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/transfers/list')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body.transfers || []);
                }
            });
    });
};

export const transfersClean = () => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/transfers/clean')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const transferCancel = (id) => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/transfers/cancel')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .send({
                transfer_ids: id
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesList = (id = 0) => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/files/list')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
                parent_id: id,
                breadcrumbs: true,
                total: true,
                mp4_status: true,
                mp4_status_parent: true,
                video_metadata: true,
                video_metadata_parent: true,
                stream_url: true,
                stream_url_parent: true,
                mp4_stream_url: true,
                mp4_stream_url_parent: true
            })
            .send({
                transfer_ids: id
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const fileStream = (id) => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/files/' + id + '/stream')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token'),
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || res.text);
                }
            });
    });
};

export const createFolder = (parent_id = 0, name) => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/files/create-folder')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .send({
                parent_id,
                name
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const fileRename = (file_id, name) => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/files/rename')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .send({
                file_id,
                name
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesDelete = (ids) => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/files/delete')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .send({
                file_ids: (_.isArray(ids)) ?  _.join(ids, ',') : ids
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    let result = res.body || {};

                    result.ids = ids;
                    resolve(result);
                }
            });
    });
};

export const zipCreate = (ids) => {
    return new Promise((resolve, reject) => {
        request
            .post(BASE_URL + '/zips/create')
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .send({
                file_ids: (_.isArray(ids)) ?  _.join(ids, ',') : ids
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    let result = res.body || {};

                    result.ids = ids;
                    resolve(result);
                }
            });
    });
};

export const zip = (id) => {
    return new Promise((resolve, reject) => {
        request
            .get(BASE_URL + '/zips/' + id)
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem('access_token')
            })
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    let result = res.body || {};

                    result.id = id;
                    resolve(result);
                }
            });
    });
};
