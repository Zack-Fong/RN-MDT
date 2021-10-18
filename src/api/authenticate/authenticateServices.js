import { AUTHENTICATE_API_URL } from '../configuration';

import { API_PATHS } from '../../common/constants';
import { postRequest, getStandardHeader, isSuccessApiCall, setAsyncStorageData } from '../../common/commonFunctions';
import { KEYS_SAVED_IN_ASYNC_STORAGE } from '../../common/constants';

export async function login(username, password) {
    let url = AUTHENTICATE_API_URL + API_PATHS.AUTHENTICATE.LOGIN;

    let header = await getStandardHeader();
    let parameter = {
        username: username,
        password: password
    };

    let promise = postRequest(url, header, parameter);
    return new Promise((resolve, reject) => {
        promise.then((response) => {
            if (isSuccessApiCall(response.status)) {
                response.json().then((data) => {
                    setAsyncStorageData(KEYS_SAVED_IN_ASYNC_STORAGE.AUTHORIZATION_TOKEN, data.token)
                        .then(() => {
                            resolve();
                        })
                })
            }
            else {
                response.json().then((data) => {
                    reject(data.description);
                })
            }
        }).catch(error => {
            reject(error ? JSON.stringify(error) : "");
        })
    })
}