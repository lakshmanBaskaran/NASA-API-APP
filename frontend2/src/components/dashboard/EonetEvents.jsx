import React, { useState, useMemo } from 'react'
import useEonet from '../../api/useEonet.js'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack
} from '@mui/material'

const SORT_FIELDS = [
  { value: 'date', label: 'Date' },
  { value: 'magnitude', label: 'Magnitude' },
]

export default function EonetEvents({ days }) {
  const { data: events = [], refetch, isFetching } = useEonet(days, { keepPreviousData: true })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // derive category list
  const categories = useMemo(() => {
    const setCats = new Set()
    events.forEach(ev => ev.categories.forEach(c=>setCats.add(c.title)))
    return [...setCats]
  }, [events])

  // filter + sort
  const filtered = useMemo(() => {
    return events
      .filter(ev =>
        ev.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === '' || ev.categories.some(c => c.title === category))
      )
      .sort((a, b) => {
        const aGeom = a.geometry[a.geometry.length - 1]
        const bGeom = b.geometry[b.geometry.length - 1]
        let av = sortField === 'date' ? new Date(aGeom.date).getTime() : aGeom.magnitudeValue
        let bv = sortField === 'date' ? new Date(bGeom.date).getTime() : bGeom.magnitudeValue
        return sortOrder === 'asc' ? av - bv : bv - av
      })
  }, [events, search, category, sortField, sortOrder])

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" mb={2}>
          <TextField
            label="Search title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortField}
              label="Sort by"
              onChange={e => setSortField(e.target.value)}
            >
              {SORT_FIELDS.map(f=>(
                <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={()=>setSortOrder(o=>o==='asc'?'desc':'asc')}>
            {sortOrder === 'asc' ? '🔼' : '🔽'}
          </Button>

          <Button variant="contained" onClick={()=>refetch()} disabled={isFetching}>
            {isFetching ? 'Fetching…' : 'Refresh'}
          </Button>
        </Stack>

        <List>
          {filtered.map(ev => {
            const geom = ev.geometry[ev.geometry.length - 1]
            return (
              <ListItem key={ev.id} divider>
                <Stack width="100%">
                  <Typography variant="subtitle1">{ev.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(geom.date).toLocaleString()} • {geom.magnitudeValue}{geom.magnitudeUnit} • {ev.categories.map(c=>c.title).join(', ')}
                  </Typography>
                </Stack>
              </ListItem>
            )
          })}
          {filtered.length === 0 && (
            <Typography align="center">No events match.</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  )
}
