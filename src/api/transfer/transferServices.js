import { TRANSFER_API_URL } from '../configuration';

import { postRequest, getStandardHeader, isSuccessApiCall } from '../../common/commonFunctions';

export async function initiateTransfer(recipient, amount, date, description) {
    let url = TRANSFER_API_URL;

    let header = await getStandardHeader();
    let parameter = {
        recipientAccountNo: recipient,
        amount: amount,
        date: date,
        description: description
    };

    let promise = postRequest(url, header, parameter);
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