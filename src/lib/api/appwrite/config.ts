import { Client, Account, TablesDB } from 'appwrite';

export const APPWRITE_ENDPOINT =
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
export const APPWRITE_PROJECT_ID =
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
export const FAVORITES_TABLE_ID = 'favorites';
export const WATCHLIST_TABLE_ID = 'watchlist';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export { client };
