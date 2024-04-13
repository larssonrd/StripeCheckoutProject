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
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextType>({
  isLoggedIn: false,
  user: null,
  setLoginStatus: () => {},
  setUser: () => {},
  logout: () => {},
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

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/auth/status',
          {
            withCredentials: true,
          }
        );
        console.log(data);
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
    <AuthContext.Provider
      value={{ isLoggedIn, setLoginStatus, setUser, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
