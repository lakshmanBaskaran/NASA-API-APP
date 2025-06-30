import { useQuery } from '@tanstack/react-query'
import http from './http.js'

export default function useEpic(options = {}) {
  return useQuery({
    queryKey: ['epic'],
    queryFn: () => http.getEpic(),
    ...options
  })
}
