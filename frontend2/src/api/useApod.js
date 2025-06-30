import { useQuery } from '@tanstack/react-query'
import http from './http.js'

export default function useApod({ date }, options = {}) {
  return useQuery({
    queryKey: ['apod', date],
    queryFn: () => http.getApod(date),
    ...options
  })
}
