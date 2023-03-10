export class LoginRequest {
  username!: string;
  password!: string;
}

export class LoginResponse {
  accessToken?: string | null;
  expiresIn?: number | null;
  tokenType?: string | null;
  idToken?: string | null;
}
