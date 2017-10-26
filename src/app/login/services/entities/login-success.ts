import {User} from './user';

export class LoginSuccess {
  roles: string[];
  id: string;
  username: string;
  response: string;

  static toUser(ls: LoginSuccess): User {
    if (ls.response === 'logged' || ls.response === 'ok') {
      return new User(ls.id, ls.username, ls.roles);
    }
    return new User();
  }
}

