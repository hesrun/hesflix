'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { Models } from 'appwrite';
import { authService, RegisterData, LoginData } from '@/lib/api/appwrite/auth';
import { useFavoritesStore } from '@/store/favoritesStore';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const { loadFavorites, clearFavorites } = useFavoritesStore();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            setIsLoading(true);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);

            if (currentUser) {
                await loadFavorites(currentUser.$id);
            }
        } catch (error) {
            console.error('Check user error:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (data: LoginData) => {
        await authService.login(data);
        try {
            await checkUser();
        } catch (error) {
            console.error('Failed to load user data after login:', error);
        }
    };

    const register = async (data: RegisterData) => {
        await authService.register(data);
        try {
            await checkUser();
        } catch (error) {
            console.error(
                'Failed to load user data after registration:',
                error,
            );
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        clearFavorites();
    };

    const refreshUser = async () => {
        await checkUser();
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
