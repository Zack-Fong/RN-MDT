// Local Host Environment
const CONFIG_IP_LOCAL_HOST = 'http://localhost';
const BASE_API_URL_LOCAL_HOST = CONFIG_IP_LOCAL_HOST + ":8080";

// Note to all developers: Change here only
const BASE_API_URL = BASE_API_URL_LOCAL_HOST;

const AUTHENTICATE_API_URL = BASE_API_URL + "/authenticate";
const ACCOUNT_API_URL = BASE_API_URL + "/account";
const TRANSFER_API_URL = BASE_API_URL + "/transfer";

export { BASE_API_URL };

export { AUTHENTICATE_API_URL };
export { ACCOUNT_API_URL };
export { TRANSFER_API_URL };