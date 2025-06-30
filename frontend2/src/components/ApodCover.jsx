import React, { useState } from 'react'
import useApod from '../api/useApod.js'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material'

export default function ApodCover() {
  const [date, setDate] = useState('')
  const { data, refetch } = useApod({ date }, { enabled: false })

  return (
    <Card>
      {data?.url && (
        <CardMedia
          component="img"
          height="300"
          image={data.url}
          alt={data.title}
        />
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {data?.title}
        </Typography>
        <Typography paragraph>{data?.explanation}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label="Pick APOD date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={() => refetch()}>
            Load
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
