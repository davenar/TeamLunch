export interface UserContract {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    isEnabled: boolean;
    isAdmin: boolean;
    jwtToken: string;
  }
