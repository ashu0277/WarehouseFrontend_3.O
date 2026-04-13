// User model - matches UserResponseDto
export interface User {
  userID: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  isDeleted: boolean;
  createdAt: string;
}
