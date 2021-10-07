import { ReactNode } from 'react';

export interface AuthProviderProps {
  access_token: string;
  children: ReactNode;
}
