import AsyncStorage from '@react-native-async-storage/async-storage';

import { TIMEOUT_MILLISECONDS, API_STATUS_CODES } from './constants';

export function getRequest(url, header, parameters) {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setTimeout(() => abortController.abort(), TIMEOUT_MILLISECONDS);

    let options = {
        method: 'GET',
        headers: header,
        body: JSON.stringify(parameters),
        signal: signal
    };

    if (header === null) {
        delete options.headers;
    }

    if (parameters === null) {
        delete options.body;
    }

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            resolve(response);
        }).catch(error => {
            if (isEqual(error.message, "Failed to fetch")) {
                reject('Experiencing network connectivity issues.')
            } else {
                reject(error);
            }
        });
    });
}

export function postRequest(url, header, parameters, uploadFile) {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setTimeout(() => abortController.abort(), TIMEOUT_MILLISECONDS);

    let options = {
        method: 'POST',
        headers: header,
        body: uploadFile ? parameters : JSON.stringify(parameters),
        signal: signal
    };

    if (header === null) {
        delete options.headers;
    }

    if (parameters === null) {
        delete options.body;
    }

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            resolve(response);
        }).catch(error => {
            if (isEqual(error.message, "Failed to fetch")) {
                reject('Experiencing network connectivity issues.')
            } else {
                reject(error);
            }
        });
    });
}

export async function getStandardHeader() {
    let token = await retrieveAsyncStorageData("token");

    let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (!isStringEmpty(token)) {
        header.Authorization = token;
    }

    return header;
}

export function convertObjectToQueryString(object) {
    return Object.keys(object).map(key => key + '=' + encodeURIComponent(object[key])).join('&');
}

export function isSuccessApiCall(httpStatusCode) {
    return API_STATUS_CODES.SUCCESSFUL_CODE.includes(httpStatusCode);
}

export function promiseAllSettled(promises) {
    let mappedPromises = promises.map((p) => {
        return p
            .then((value) => {
                return {
                    status: 'fulfilled',
                    value,
                };
            })
            .catch((reason) => {
                return {
                    status: 'rejected',
                    reason,
                };
            });
    });
    return Promise.all(mappedPromises);
};

export function isNumber(number) {
    return (Number.isFinite(number));
}

export function isString(string) {
    return (typeof string === 'string');
}

export function isJsonString(str) {
    if (isStringEmpty(str)) {
        return false;
    } else {
        try {
            if (typeof JSON.parse(str) === "object") {
                return true;
            }
        } catch (e) {
            return false;
        }

        return false;
    }
}

export function isArray(array) {
    return Array.isArray(array);
}

export function isObject(object) {
    return (typeof object === 'object');
}

export function isVariableDefined(variable) {
    return typeof variable !== 'undefined' && variable !== null;
}

export function isNumberEmpty(number) {
    return (typeof number === "undefined" || number === null || number === '' || isNaN(Number(number)));
}

export function isStringEmpty(string) {
    return (typeof string === 'undefined' || string === null || string.length === 0);
}

export function isArrayEmpty(array) {
    return (typeof array === 'undefined' || array === null || array.length === 0);
}

export function isObjectEmpty(object) {
    return (typeof object === 'undefined' || object === null || (Object.entries(object).length === 0 && object.constructor === Object));
}

export function isEqual(element1, element2) {
    return (element1 === element2);
}

export function getFormDataFromObject(object) {
    let formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));

    return formData;
}

export function shadowCopyObject(obj) {
    return Object.assign({}, obj);
}

export function deepCopyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function validateEmail(email) {
    let regularExpression = /^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?([A-Za-z]{2,4})\.\2)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regularExpression.test(email);
}

export function capitalizeString(string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

export function uppercaseString(string) {
    return string.toUpperCase();
}

export function lowercaseString(string) {
    return string.toLowerCase();
}

export async function setAsyncStorageData(key, value) {
    try {
        // If save object value, need to do Json.stringify(value) first
        // If save string value, can store value directly
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        return false;
    }
}

export async function retrieveAsyncStorageData(key) {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return isJsonString(value) ? JSON.parse(value) : value;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export async function deleteAsyncStorageData(key) {
    try {
        if (!isStringEmpty(key)) {
            await AsyncStorage.removeItem(key);
        } else {
            let keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        }
        return true;
    } catch (error) {
        return false;
    }
}