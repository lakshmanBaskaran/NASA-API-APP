import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({
      q,
      media_type: mediaType,
      year_start: yearStart,
      year_end: yearEnd
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}
    >
      <TextField
        label="Query"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <TextField
        select
        label="Media Type"
        value={mediaType}
        onChange={e => setMediaType(e.target.value)}
        sx={{ width: 140 }}
      >
        <MenuItem value="image">Image</MenuItem>
        <MenuItem value="video">Video</MenuItem>
      </TextField>
      <TextField
        type="number"
        label="Year Start"
        value={yearStart}
        onChange={e => setYearStart(e.target.value)}
        sx={{ width: 120 }}
      />
      <TextField
        type="number"
        label="Year End"
        value={yearEnd}
        onChange={e => setYearEnd(e.target.value)}
        sx={{ width: 120 }}
      />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
}
