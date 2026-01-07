import { Movie } from './movie';
import { Person } from './people';
import { TV } from './tv';

export interface SearchResponse {
    page: number;
    results: (Movie | TV | Person)[];
    total_pages: number;
    total_results: number;
}
