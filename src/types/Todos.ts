export type CardProps = {
  count: number;
  title: string;
  icon: any;
  color: string;
};

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loginToken: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}