import request from 'superagent';
import Promise from 'promise';
import * as _ from 'lodash';
import async from 'async';
import * as Storage from '../utils/Storage';
import {
    CLIENT_ID,
    PUTIO_URL,
    CODE_URL,
} from '../config.json';

const HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
};

export const downloadLink = (id) => {
    return PUTIO_URL + "/files/" + id + "/download?oauth_token=" + Storage.getItem("access_token");
};

export const authenticateLink = () => {
    return PUTIO_URL + "/oauth2/authenticate?client_id=" + CLIENT_ID + "&response_type=token&redirect_uri=" + CODE_URL;
};

export const authenticate = () => {
    return new Promise((resolve, reject) => {
        if (Storage.getItem("access_token")) {
            resolve({
                access_token: Storage.getItem("access_token")
            });
        } else {
            request
                .get(PUTIO_URL + "/oauth2/authenticate")
                .query("client_id=" + CLIENT_ID + "&response_type=token&redirect_uri=" + CODE_URL)
                .set(HEADERS)
                .end((err, res) => {
                    if (err) {
                        reject(res.body, err);
                    } else {
                        if (res.type === "text/html") {
                            reject({
                                id: "authenticate",
                                error_message: "Authentication Failed"
                            });
                        } else {
                            Storage.setItem("access_token", res.body.access_token);
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
            .get(PUTIO_URL + "/events/list")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body.events || []);
                }
            });
    });
};

export const accountInfo = () => {
    return new Promise((resolve, reject) => {
        request
            .get(PUTIO_URL + "/account/info")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body.info || {});
                }
            });
    });
};

export const transfersList = () => {
    return new Promise((resolve, reject) => {
        request
            .get(PUTIO_URL + "/transfers/list")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body.transfers || []);
                }
            });
    });
};

export const transfersClean = () => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/transfers/clean")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const transferCancel = (id) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/transfers/cancel")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                transfer_ids: id
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesList = (id = 0) => {
    return new Promise((resolve, reject) => {
        request
            .get(PUTIO_URL + "/files/list")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
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
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesTree = () => {
    const req = (id = 0, callback) => {
        request
            .get(PUTIO_URL + "/files/list")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
                parent_id: id
            })
            .end((err, res) => {
                callback(err, res.body || {});
            });
    };

    const pick = (obj) => {
        let o = _.pick(obj, ["name", "id", "file_type", "folder_type", "parent_id", "size"]);
        o.children = [];
        return o;
    };

    const fetchTree = (node, callback) => {
        req(node.id, (err, body) => {
            const files = body.files || [],
                parent = body.parent || {};

            node = pick(parent);

            if(files.length > 0) {
                async.map(files, (file, cb) => {
                    let n = pick(file);

                    if (file.folder_type === "SHARED_ROOT") {
                        cb(null, n);
                    } else {
                        fetchTree(n, cb);
                    }
                }, (err1, children) => {
                    node.children = children
                    callback(err1, node)
                });
            } else {
                callback(null, node)
            }
        });
    };

    return new Promise((resolve, reject) => {
        fetchTree({id: 0}, (err, data) => {
            if(err) {
                reject(data, err);
            } else {
                resolve(data);
            }
        });
    });
};

export const fileStream = (id) => {
    return new Promise((resolve, reject) => {
        request
            .get(PUTIO_URL + "/files/" + id + "/stream")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token"),
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || res.text);
                }
            });
    });
};

export const createFolder = (parent_id = 0, name) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/files/create-folder")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                parent_id,
                name
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const fileRename = (file_id, name) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/files/rename")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                file_id,
                name
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesMove = (file_ids, parent_id) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/files/move")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                parent_id,
                file_ids: (_.isArray(file_ids)) ? _.join(file_ids, ",") : file_ids
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    resolve(res.body || {});
                }
            });
    });
};

export const filesDelete = (ids) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/files/delete")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                file_ids: (_.isArray(ids)) ? _.join(ids, ",") : ids
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
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
            .post(PUTIO_URL + "/zips/create")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .send({
                file_ids: (_.isArray(ids)) ? _.join(ids, ",") : ids
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
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
            .get(PUTIO_URL + "/zips/" + id)
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    let result = res.body || {};

                    result.id = id;
                    resolve(result);
                }
            });
    });
};


export const fileMp4 = (id) => {
    return new Promise((resolve, reject) => {
        request
            .post(PUTIO_URL + "/files/" + id + "/mp4")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    let result = res.body || {};

                    resolve(result);
                }
            });
    });
};


export const fileMp4Status = (id) => {
    return new Promise((resolve, reject) => {
        request
            .get(PUTIO_URL + "/files/" + id + "/mp4")
            .set(HEADERS)
            .query({
                oauth_token: Storage.getItem("access_token")
            })
            .end((err, res) => {
                if (err) {
                    reject(res.body, err);
                } else {
                    let result = res.body || {};

                    resolve(result.mp4 || {});
                }
            });
    });
};
