export interface Collection {
    slug: string;
    title: string;
    description: string;
    endpoint: string;
    icon?: string;
    type: 'movie' | 'tv' | 'both';
}
