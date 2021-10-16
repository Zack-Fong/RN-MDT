import { AUTHENTICATE_API_URL } from '../configuration';

import { API_PATHS } from '../../common/constants';
import { postRequest, getStandardHeader } from '../../common/commonFunctions';

export function login(username, password) {
    let url = AUTHENTICATE_API_URL + API_PATHS.AUTHENTICATE.LOGIN;

    let header = getStandardHeader();
    let parameter = {
        username: username,
        password: password
    };

    let promise = postRequest(url, header, parameter);
    return new Promise((resolve, reject) => {
        promise.then((response) => {
            console.log(response);
            // if (isSuccess(response.status, response.headers)) {
            //     resolve(response.json());
            // }
            // else {
            //     handleApiErrors(response)
            //         .then((errorMessage) => {
            //             log(formatSourceStringForLog(LOG_SOURCE.RESTFUL_API_FOLDER.AAS.ROLE, 22), SYSTEM.FAIL, formatErrorMessageForThemeMessagePrompt(errorMessage));

            //             reject(errorMessage);
            //         }).catch(error => {
            //             log(formatSourceStringForLog(LOG_SOURCE.RESTFUL_API_FOLDER.AAS.ROLE, 26), SYSTEM.FAIL, formatErrorMessageForThemeMessagePrompt(error));

            //             reject(error);
            //         })
            // }
        }).catch(error => {
            reject(error);
        })
    })
}