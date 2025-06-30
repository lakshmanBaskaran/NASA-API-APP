import React, { useMemo } from 'react';
import { Box, Autocomplete, TextField, Chip } from '@mui/material';

export default function FacetFilters({ items, filters, onChange }) {
  // pull out unique centers & keywords from all items
  const centers = useMemo(() => {
    const set = new Set();
    items.forEach(item => {
      const center = item.data?.[0]?.center;
      if (center) set.add(center);
    });
    return [...set].sort();
  }, [items]);

  const keywords = useMemo(() => {
    const set = new Set();
    items.forEach(item => {
      (item.data?.[0]?.keywords || []).forEach(kw => set.add(kw));
    });
    return [...set].sort();
  }, [items]);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      <Autocomplete
        multiple
        options={centers}
        value={filters.centers}
        onChange={(_, v) => onChange({ ...filters, centers: v })}
        renderTags={(value, getTagProps) =>
          value.map((option, i) => (
            <Chip label={option} size="small" {...getTagProps({ index: i })} />
          ))
        }
        renderInput={params => <TextField {...params} label="Center" />}
        sx={{ minWidth: 160 }}
      />

      <Autocomplete
        multiple
        options={keywords}
        value={filters.keywords}
        onChange={(_, v) => onChange({ ...filters, keywords: v })}
        renderTags={(value, getTagProps) =>
          value.map((option, i) => (
            <Chip label={option} size="small" {...getTagProps({ index: i })} />
          ))
        }
        renderInput={params => <TextField {...params} label="Keyword" />}
        sx={{ minWidth: 160 }}
      />
    </Box>
  );
}
