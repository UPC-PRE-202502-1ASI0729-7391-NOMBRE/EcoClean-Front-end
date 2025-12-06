export class SignUpCommand {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public district: string
  ) {}
}
