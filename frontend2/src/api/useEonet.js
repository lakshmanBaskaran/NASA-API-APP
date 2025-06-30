import { useQuery } from '@tanstack/react-query'
import http from './http.js'

export default function useEonet(days, options = {}) {
  return useQuery({
    queryKey: ['eonet', days],
    queryFn: () => http.getEonet(days),
    ...options
  })
}
