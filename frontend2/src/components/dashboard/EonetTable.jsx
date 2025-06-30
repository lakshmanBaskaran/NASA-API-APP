import React from 'react'
import useEonet from '../../api/useEonet.js'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

export default function EonetTable({ days }) {
  const { data: events = [], isLoading } = useEonet(days)

  const rows = events.map(ev => {
    const geom = ev.geometry[ev.geometry.length - 1]
    return {
      id: ev.id,
      title: ev.title,
      date: geom.date,
      magnitude: geom.magnitudeValue,
      category: ev.categories.map(c=>c.title).join(', ')
    }
  })

  const columns = [
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'date', headerName: 'Date', flex: 1, type: 'dateTime' },
    { field: 'magnitude', headerName: 'Magnitude', flex: 1, type: 'number' },
    { field: 'category', headerName: 'Category', flex: 1 }
  ]

  return (
    <Box sx={{ height: 600, width: '100%', my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Open Events Table
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        density="comfortable"
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  )
}
