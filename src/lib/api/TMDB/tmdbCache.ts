import { cache } from 'react';
import { tmdb } from './index';

type MediaType = 'movie' | 'tv';

export const getPersonDetailCached = cache((id: number) =>
    tmdb.person.getDetail(id),
);

export const getMediaDetailCached = cache((type: MediaType, id: number) =>
    tmdb.media.getDetail(type, id),
);

export const getSeasonCached = cache((tv_id: number, season_id: number) =>
    tmdb.seasons.getSeason(tv_id, season_id),
);
