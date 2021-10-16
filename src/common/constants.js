export const TIMEOUT_MILLISECONDS = 30000;  //30 seconds

export const KEYS_SAVED_IN_SESSION_STORAGE = {
    AUTHORIZATION_TOKEN: 'authorizationToken',
    LANGUAGE: 'language',
    REMEMBER_ME: 'remember-me',
    MENU_NAME: 'menuName',
    AAS_USER_ID: "aasUserId",
    AAS_TENANT_USER_ID: "aasTenantUserId",
    USER_PROFILE: "userProfile",
    USER_PROFILE_IMAGE: "userProfileImage",
    USER_PROFILE_FIRST_NAME: "userProfileFirstName",
    TENANT_ID: "tenantId",
    TENANT_PROFILE: "tenantProfile",
    TENANT_TIMEZONE: 'tenantTimezone',
    COMPANY_LOGO: "companyLogo",
    LAYOUT_FIRST_LOAD: "layoutFirstLoad",
    USERNAME: 'username',
    COUNTRY: 'country'
};

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

