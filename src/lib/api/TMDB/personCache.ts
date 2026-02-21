import { cache } from 'react';
import { tmdb } from './index';

/** Request-level cache — getDetail вызывается один раз на запрос (metadata + компонент) */
export const getPersonDetailCached = cache((id: number) =>
    tmdb.person.getDetail(id),
);
