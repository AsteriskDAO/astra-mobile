import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../services/api';
import { apiService } from '../services/api';

interface UserContextType {
  user: User | null;
  userHash: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load user on mount if we have a token
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Try to get userHash from storage
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const userHash = await AsyncStorage.getItem('user_hash');
      if (userHash) {
        // TODO: Uncomment API calls when ready
        // const userData = await apiService.getUser(userHash);
        // setUser(userData);
      }
    } catch (error) {
      console.warn('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user?.user_hash) return;
    try {
      // TODO: Uncomment API calls when ready
      // const userData = await apiService.getUser(user.user_hash);
      // setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const clearUser = async () => {
    setUser(null);
    // TODO: Uncomment API calls when ready
    // await apiService.clearToken();
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      await AsyncStorage.removeItem('user_hash');
    } catch (error) {
      console.warn('Failed to clear user hash:', error);
    }
  };

  const handleSetUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser?.user_hash) {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        await AsyncStorage.setItem('user_hash', newUser.user_hash);
      } catch (error) {
        console.warn('Failed to save user hash:', error);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userHash: user?.user_hash || null,
        isLoading,
        setUser: handleSetUser,
        refreshUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

