import {AuthConfig} from './auth.config';
import {RequestParams} from '../services/params/request-params';

const prefix = '/login';

export const defaultAuthConfig: AuthConfig = {
  login: new RequestParams(prefix + '/index', 3000),
  logout: new RequestParams(prefix + '/logout', 3000),
  isLoggedIn: new RequestParams(prefix + '/isLogged', 3000)
};
