// LoginRequest model - for authentication (matches backend LoginRequestDto)
export interface LoginRequest {
  email: string;    // Backend expects 'email', not 'username'
  password: string;
}

// LoginResponse model - authentication response (matches backend LoginResponseDto)
export interface LoginResponse {
  token: string;
  tokenType: string;  // "Bearer"
  expiresAt: string;  // ISO date string
  userID: number;
  name: string;
  email: string;
  role: string;
}
