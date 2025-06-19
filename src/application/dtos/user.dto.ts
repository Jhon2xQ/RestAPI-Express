export class CreateUserDTO {
  lastName: string;
  firstName: string;
  email: string;
  password: string;

  constructor(data: {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
  }) {
    this.lastName = data.lastName;
    this.firstName = data.firstName;
    this.email = data.email;
    this.password = data.password;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }
}

export interface PublicUserDTO {
  id: number;
  lastName: string;
  firstName: String;
  email: string;
}
