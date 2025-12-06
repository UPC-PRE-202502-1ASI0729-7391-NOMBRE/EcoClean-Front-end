import { SignUpCommand } from "../domain/model/sign-up.command";
import { SignUpRequest } from "./sign-up.request";

export class SignUpAssembler {
  static toRequest(command: SignUpCommand): SignUpRequest {
    return {
      username: command.username,
      email: command.email,
      password: command.password,
      firstName: command.firstName,
      lastName: command.lastName,
      district: command.district
    };
  }
}
