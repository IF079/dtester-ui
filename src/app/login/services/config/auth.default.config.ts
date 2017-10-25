import {AuthConfig} from './auth.config';
import {RequestParams} from '../params/request-params';

const PREFIX = '/login';

export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  login: new RequestParams(PREFIX + '/index', 3000),
  logout: new RequestParams(PREFIX + '/logout', 3000),
  isLoggedIn: new RequestParams(PREFIX + '/isLogged', 3000)
};
