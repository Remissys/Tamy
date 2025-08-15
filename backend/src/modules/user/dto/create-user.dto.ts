export class CreateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  created: Date;

  constructor(name: string, email: string, password: string, created: Date = new Date()) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.created = created ?? new Date()
  }
}