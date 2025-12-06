import { SignInCommand } from '../domain/model/sign-in.command';
import { SignInRequest } from './sign-in-request';

export class SignInAssembler {
  static toRequest(command: SignInCommand): SignInRequest {
    return {
      username: command.username,
      password: command.password
    };
  }
}
