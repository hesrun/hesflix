import { account } from './config';
import { ID, Models } from 'appwrite';
import { toast } from 'sonner';

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const authService = {
    async register({
        email,
        password,
        name,
    }: RegisterData): Promise<Models.User<Models.Preferences>> {
        try {
            const user = await account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });
            await this.login({ email, password });
            toast.success('Account created successfully! Welcome!');

            return user;
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed');
            throw error;
        }
    },

    async login({ email, password }: LoginData): Promise<Models.Session> {
        try {
            const session = await account.createEmailPasswordSession({
                email,
                password,
            });
            toast.success('Successfully logged in!');
            return session;
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed');
            throw error;
        }
    },

    async logout(): Promise<void> {
        try {
            await account.deleteSession({ sessionId: 'current' });
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
            throw error;
        }
    },

    async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            return null;
        }
    },

    async checkSession(): Promise<boolean> {
        try {
            await account.getSession({ sessionId: 'current' });
            return true;
        } catch (error) {
            return false;
        }
    },

    async updateName(name: string): Promise<Models.User<Models.Preferences>> {
        try {
            const user = await account.updateName({ name });
            toast.success('Name updated successfully');
            return user;
        } catch (error) {
            console.error('Update name error:', error);
            toast.error('Failed to update name');
            throw error;
        }
    },
};
