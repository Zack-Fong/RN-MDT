import { ACCOUNT_API_URL } from '../configuration';

import { API_PATHS } from '../../common/constants';
import { getRequest, getStandardHeader } from '../../common/commonFunctions';

export function retrieveBalances() {
    let url = ACCOUNT_API_URL + API_PATHS.ACCOUNT.BALANCES;

    let header = getStandardHeader();
    let parameter = null;

    let promise = getRequest(url, header, parameter);
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