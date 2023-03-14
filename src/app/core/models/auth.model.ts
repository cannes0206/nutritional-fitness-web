import { UserDto } from "./dtos/user-dto";

export class LoginRequest {
  username!: string;
  password!: string;
}

export class LoginResponse {
  token?: string | null;
  user?: UserDto
}
