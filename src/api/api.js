import axios from 'axios';

let base = 'http://localhost:3003';

function getAuthStr() {
    return "Bearer " + localStorage.getItem("token");
}

export const requestLogin = params => {
    return axios.post(`${base}/login`, params);
};

export const getAuthors = params => {
    console.log(params);
    return axios.get(`${base}/authors`, { params: params, headers: { Authorization: getAuthStr() } });
}

export const getAuthor = params => {
    return axios.get(`${base}/authors/:` + params.id);
}

export const createAuthor = params => {
    console.log("addAuthor..." + params);
    return axios.post(`${base}/authors`,
        params, {
            headers: {
                Authorization: getAuthStr()
            }
        });
};

export const editAuthor = params => {
    return axios.put(`${base}/authors/` + params._id,
        params, {
            headers: {
                Authorization: getAuthStr()
            }
        });
};

export const deleteAuthor = params => {
    console.log(params);
    return axios.delete(`${base}/authors/` + params._id, {
        headers: {
            Authorization: getAuthStr()
        }
    });
};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };