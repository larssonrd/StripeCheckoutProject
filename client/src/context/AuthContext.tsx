import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface IUser {
  id: string;
  name: string;
  email: string;
  address: {
    line1: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

interface IAuthContextType {
  isLoggedIn: boolean;
  user: IUser | null;
  setLoginStatus: (status: boolean) => void;
  setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<IAuthContextType>({
  isLoggedIn: false,
  user: null,
  setLoginStatus: () => {},
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const { data } = await axios.get('/api/auth/status');
        setIsLoggedIn(data.isLoggedIn);

        if (data.isLoggedIn && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginStatus, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
