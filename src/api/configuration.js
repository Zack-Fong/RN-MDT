import { API_PATHS } from "../common/constants";

// Local Host Environment
const CONFIG_IP_LOCAL_HOST = 'http://127.0.0.1';
const BASE_API_URL_LOCAL_HOST = CONFIG_IP_LOCAL_HOST + ":8080";

// Note to all developers: Change here only
const BASE_API_URL = BASE_API_URL_LOCAL_HOST;

const AUTHENTICATE_API_URL = BASE_API_URL + API_PATHS.AUTHENTICATE.BASE;
const ACCOUNT_API_URL = BASE_API_URL + API_PATHS.ACCOUNT.BASE;
const TRANSFER_API_URL = BASE_API_URL + API_PATHS.TRANSFER.BASE;

export { BASE_API_URL };

export { AUTHENTICATE_API_URL };
export { ACCOUNT_API_URL };
export { TRANSFER_API_URL };