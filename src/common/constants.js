export const TIMEOUT_MILLISECONDS = 30000;  //30 seconds

export const KEYS_SAVED_IN_ASYNC_STORAGE = {
    AUTHORIZATION_TOKEN: 'authorizationToken',
};

export const API_STATUS_CODES = {
    SUCCESSFUL_CODE: [200, 201],
    BAD_REQUEST: [400],
    UNAUTHORIZED_CODE: [401],
    FORBIDDEN_CODE: [403],
    NOT_FOUND_CODE: [404]
}

export const API_PATHS = {
    AUTHENTICATE: {
        BASE: "/authenticate",
        LOGIN: "/login"
    },
    ACCOUNT: {
        BASE: "/account",
        BALANCES: "/balances",
        TRANSACTIONS: "/transactions",
        PAYEES: "/payees"
    },
    TRANSFER: {
        BASE: "/transfer"
    }
}

export const TEXT_CONSTANTS = {
    //Login Screen
    USERNAME: 'username',
    PASSWORD: 'password',
    LOGIN: 'login',
    EMPTY_USERNAME_ERROR: 'Username cannot be empty',
    EMPTY_PASSWORD_ERROR: 'Password cannot be empty',

    //Dashboard Screen
    LOGOUT: 'log out',
    YOUR_ACTIVITY: 'your activity',
    MAKE_A_TRANSFER: 'make a transfer',

    //Transfer Screen,
    RECIPIENT: 'recipient',
    DATE_OF_TRANSFER: 'date of transfer',
    DESCRIPTION: 'description',
    AMOUNT: 'amount',
    CANCEL: 'cancel',
    SUBMIT: 'submit'
}

