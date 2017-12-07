import {ROLES_DEFAULT_CONFIG} from '../config/roles.default.config';

export class User {
  id: string;
  username: string;
  roles: string[];
  constructor(id: string = '', username: string = '', roles: string[] = ['']) {
    this.id = id;
    this.login = username;
    this.roles = roles;
  }

  static from(user: User): User {
    return new User(user.id, user.username, user.roles);
  }

  clone(): User {
    return new User(this.id, this.login, Array.from(this.roles));
  }

  isAdmin(): boolean {
    return this.hasRole(ROLES_DEFAULT_CONFIG.ROLE_ADMIN);
  }

  hasRole(expectedRole: string): boolean {
    return this.roles.filter(role => role === expectedRole).length > 0;
  }
  isStudent(): boolean {
    return this.hasRole(ROLES_DEFAULT_CONFIG.ROLE_STUDENT);
  }

  isLogged(): boolean {
    return this.id !== '';
  }
}
