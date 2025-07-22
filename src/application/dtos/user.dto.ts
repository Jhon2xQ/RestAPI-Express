export interface CreateUserDTO {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface PublicUserDTO {
  lastName: string;
  firstName: String;
  email: string;
}
