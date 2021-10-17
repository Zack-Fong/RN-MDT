import { ACCOUNT_API_URL } from '../configuration';

import { API_PATHS } from '../../common/constants';
import { getRequest, getStandardHeader, isSuccessApiCall } from '../../common/commonFunctions';

export async function retrieveBalances() {
    let url = ACCOUNT_API_URL + API_PATHS.ACCOUNT.BALANCES;

    let header = await getStandardHeader();
    let parameter = null;

    let promise = getRequest(url, header, parameter);
    return new Promise((resolve, reject) => {
        promise.then((response) => {
            if (isSuccessApiCall(response.status)) {
                response.json().then((data) => {
                    resolve(data.balance);
                })
            }
            else {
                response.json().then((data) => {
                    reject(data.description);
                }).catch(error => {
                    reject(error);
                })
            }
        }).catch(error => {
            reject(error);
        })
    })
}

export async function retrieveTransactions() {
    let url = ACCOUNT_API_URL + API_PATHS.ACCOUNT.TRANSACTIONS;

    let header = await getStandardHeader();
    let parameter = null;

    let promise = getRequest(url, header, parameter);
    return new Promise((resolve, reject) => {
        promise.then((response) => {
            if (isSuccessApiCall(response.status)) {
                response.json().then((data) => {
                    resolve(data.data);
                })
            }
            else {
                response.json().then((data) => {
                    reject(data.description);
                }).catch(error => {
                    reject(error);
                })
            }
        }).catch(error => {
            reject(error);
        })
    })
}

export async function retrievePayees() {
    let url = ACCOUNT_API_URL + API_PATHS.ACCOUNT.PAYEES;

    let header = await getStandardHeader();
    let parameter = null;

    let promise = getRequest(url, header, parameter);
    return new Promise((resolve, reject) => {
        promise.then((response) => {
            if (isSuccessApiCall(response.status)) {
                response.json().then((data) => {
                    resolve(data.data);
                })
            }
            else {
                response.json().then((data) => {
                    reject(data.description);
                }).catch(error => {
                    reject(error);
                })
            }
        }).catch(error => {
            reject(error);
        })
    })
}