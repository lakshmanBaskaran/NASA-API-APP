import React from 'react'
import useEonet from '../../api/useEonet.js'
import Globe from 'react-globe.gl'
import { Box, Typography } from '@mui/material'

export default function EonetMap({ days }) {
  const { data: events = [], isLoading } = useEonet(days)

  const points = events.map(ev => {
    const geom = ev.geometry[ev.geometry.length - 1]
    return {
      lat: geom.coordinates[1],
      lng: geom.coordinates[0],
      size: Math.max(0.5, Math.log10(geom.magnitudeValue || 1)),
      title: ev.title,
      date: geom.date
    }
  })

  return (
    <Box sx={{ height: '600px', width: '100%', my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Events Globe
      </Typography>
      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={d => d.size * 0.001}
          pointRadius={d => d.size * 0.2}
          pointColor={() => 'orange'}
          onPointClick={d => alert(`${d.title}\n${new Date(d.date).toLocaleString()}`)}
        />
      )}
    </Box>
  )
}
