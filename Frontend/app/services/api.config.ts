declare let NODE_ENV: string;

const apiHosts = {
  dev: 'http://localhost:8000',
  production: 'null'
};

const API_HOST = apiHosts[NODE_ENV];

const createWithApiUrl = (str: string) => `${API_HOST}/api/${str}`;

const createUrl = (str: string) => `${API_HOST}/${str}`;

export default {
  createUrl,
  createWithApiUrl,
  baseUrl:            API_HOST,
  apiUrl:             createUrl('api'),
  authTokenUrl:       createUrl('api-token-auth'),
  oauthUrl:           createUrl('social'),
  changePasswordUrl:  createUrl('reset'),
  resetPasswordUrl:   createUrl('reset-password'),
  emailVerifyUrl:     createUrl('verify'),
  impersonateUrl:     createWithApiUrl('users/impersonate'),
};
