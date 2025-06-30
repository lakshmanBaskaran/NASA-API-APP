import React, { useMemo } from 'react'
import useEonet from '../../api/useEonet.js'
import { Box, Typography, List, ListItem, Divider } from '@mui/material'
import dayjs from 'dayjs'

export default function EonetTimeline({ days }) {
  const { data: events = [], isLoading } = useEonet(days)

  // group by day
  const byDay = useMemo(() => {
    const map = {}
    events.forEach(ev => {
      const geom = ev.geometry[ev.geometry.length - 1]
      const day = dayjs(geom.date).format('YYYY-MM-DD')
      if (!map[day]) map[day] = []
      map[day].push({ ...ev, lastDate: geom.date, magnitude: geom.magnitudeValue })
    })
    return Object.entries(map)
      .sort((a, b) => dayjs(b[0]).valueOf() - dayjs(a[0]).valueOf())
  }, [events])

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Events Timeline
      </Typography>

      {isLoading && <Typography>Loading…</Typography>}

      {byDay.map(([day, evs]) => (
        <Box key={day} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">{day}</Typography>
          <List dense>
            {evs.map(ev => (
              <ListItem key={ev.id}>
                {dayjs(ev.lastDate).format('HH:mm')} – {ev.title} ({ev.magnitude})
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      ))}
    </Box>
  )
}
