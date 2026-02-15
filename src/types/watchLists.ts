import { Models } from 'appwrite';

export interface WatchListItem {
    userId: string;
    name: string;
    description: string;
}
export type WatchListDocument = Models.Document & WatchListItem;
