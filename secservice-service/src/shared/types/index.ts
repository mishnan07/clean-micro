export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
}

export interface CreateBankDetailDTO {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

export interface UpdateBankDetailDTO {
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountType?: 'checking' | 'savings';
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}