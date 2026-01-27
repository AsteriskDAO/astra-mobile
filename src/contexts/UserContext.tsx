import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, HealthData, Profile } from '../services/api';
import { apiService } from '../services/api';

interface UserContextType {
  user: User | null;
  userHash: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updateHealthData: (updates: Partial<HealthData>) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
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
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;

      // Try to load full user data from storage
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {
        try {
          const userData: User = JSON.parse(storedUserData);
          setUser(userData);
        } catch (parseError) {
          console.warn('Failed to parse stored user data:', parseError);
        }
      } else {
        // Fallback: Try to get userHash from storage (for backward compatibility)
        const userHash = await AsyncStorage.getItem('user_hash');
        if (userHash) {
          // TODO: Uncomment API calls when ready
          // const userData = await apiService.getUser(userHash);
          // setUser(userData);
        }
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
      await AsyncStorage.removeItem('user_data');
      await AsyncStorage.removeItem('user_hash');
    } catch (error) {
      console.warn('Failed to clear user data:', error);
    }
  };

  const handleSetUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        // Save full user object to storage
        await AsyncStorage.setItem('user_data', JSON.stringify(newUser));
        // Also save user_hash for backward compatibility
        if (newUser.user_hash) {
          await AsyncStorage.setItem('user_hash', newUser.user_hash);
        }
      } catch (error) {
        console.warn('Failed to save user data:', error);
      }
    } else {
      // Clear storage when user is null
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        await AsyncStorage.removeItem('user_data');
        await AsyncStorage.removeItem('user_hash');
      } catch (error) {
        console.warn('Failed to clear user data:', error);
      }
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    // Create a default user if one doesn't exist
    const currentUser: User = user || {
      user_id: `user_${Date.now()}`,
      user_hash: `hash_${Date.now()}`,
      checkIns: 0,
      points: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakHistory: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      isGenderVerified: false,
      isRegistered: false,
    };

    const updatedUser: User = {
      ...currentUser,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    await handleSetUser(updatedUser);
  };

  const updateHealthData = async (updates: Partial<HealthData>) => {
    // Ensure user exists first
    const currentUser = user || {
      user_id: `user_${Date.now()}`,
      user_hash: `hash_${Date.now()}`,
      checkIns: 0,
      points: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakHistory: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      isGenderVerified: false,
      isRegistered: false,
    };

    const currentHealthData: HealthData = currentUser.healthData || {
      schema_version: 'v2',
      healthDataId: currentUser.currentHealthDataId || `health_${Date.now()}`,
      user_hash: currentUser.user_hash,
      research_opt_in: false,
      timestamp: new Date().toISOString(),
    };

    const updatedHealthData: HealthData = {
      ...currentHealthData,
      ...updates,
      timestamp: new Date().toISOString(),
    };

    await updateUser({
      healthData: updatedHealthData,
      currentHealthDataId: updatedHealthData.healthDataId,
    });
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    const currentHealthData: HealthData = user.healthData || {
      schema_version: 'v2',
      healthDataId: user.currentHealthDataId || `health_${Date.now()}`,
      user_hash: user.user_hash,
      research_opt_in: false,
      timestamp: new Date().toISOString(),
    };

    const updatedProfile: Profile = {
      ...currentHealthData.profile,
      ...updates,
    };

    await updateHealthData({
      profile: updatedProfile,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userHash: user?.user_hash || null,
        isLoading,
        setUser: handleSetUser,
        updateUser,
        updateHealthData,
        updateProfile,
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

