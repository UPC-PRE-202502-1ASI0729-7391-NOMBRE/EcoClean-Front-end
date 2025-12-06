import { User } from '../domain/model/user.entity';

export class UsersResponse {
  static fromResponse(response: any): User {
    return new User(response.id, response.username);
  }
}
