import {Authorization} from '../entities/auth';


const PREFIX = '/login';

export const DEFAULT_AUTH_CONFIG: Authorization = {
  login: PREFIX + '/index',
  logout: PREFIX + '/logout',
  isLoggedIn: PREFIX + '/isLogged'
};
