import { useInfiniteQuery } from '@tanstack/react-query';
import api from './http';

/**
 * @param {{ q?:string, media_type?:string, year_start?:number, year_end?:number }} params
 */
export default function useMediaSearch(params, options = {}) {
  return useInfiniteQuery({
    queryKey: ['media-search', params],
    queryFn: async ({ pageParam = 1 }) => {
      // strip out empty values
      const clean = Object.fromEntries(
        Object.entries(params).filter(([_,v]) => v != null && v !== '')
      );
      const res = await api.get('/search', {
        params: { ...clean, page: pageParam }
      });
      // NASA API wraps results in res.data.collection.items
      return { ...res.data.collection, page: pageParam };
    },
    getNextPageParam: last =>
      // look for a “next” link in last.links[]
      last.links?.find(l => l.rel === 'next') ? last.page + 1 : undefined,
    keepPreviousData: true,
    ...options
  });
}
