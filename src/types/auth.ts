export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  sub?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  completeNewPasswordChallenge: (newPassword: string) => Promise<void>;
  getIdToken: () => Promise<string>;
}
