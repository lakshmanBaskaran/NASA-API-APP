import React, { useState } from 'react'
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  Typography
} from '@mui/material'
import EonetEvents from '../components/dashboard/EonetEvents.jsx'
import EonetTimeline from '../components/dashboard/EonetTimeline.jsx'
import EonetMap from '../components/dashboard/EonetMap.jsx'

export default function DashboardPage() {
  const [days, setDays] = useState(7)
  const [tab, setTab] = useState(0)

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Days selector */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Past&nbsp;Days:</Typography>
        <TextField
          type="number"
          value={days}
          onChange={e => setDays(Math.max(1, Number(e.target.value)))}
          InputProps={{ inputProps: { min: 1 } }}
          size="small"
        />
      </Box>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Cards" />
        <Tab label="Timeline" />
        <Tab label="Map" />
      </Tabs>

      {/* Tab panels */}
      {tab === 0 && <EonetEvents days={days} />}
      {tab === 1 && <EonetTimeline days={days} />}
      {tab === 2 && <EonetMap days={days} />}
    </Container>
  )
}
