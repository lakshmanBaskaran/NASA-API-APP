import React, { useState } from 'react';
import useMediaSearch from '../../api/useMediaSearch';
import SearchBar from './SearchBar';
import CardGrid   from './CardGrid';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export default function MediaGallery() {
  const [params, setParams] = useState({ q: '', media_type: 'image', year_start: '', year_end: '' });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useMediaSearch(params);
  
  const items = data?.pages.flatMap(page => page.items) ?? [];

  const onSearch = newParams => {
    setParams(newParams);
    refetch();
  };

  return (
    <Box sx={{ my: 4 }}>
      <SearchBar onSearch={onSearch} />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>No results found.</Typography>
      ) : (
        <CardGrid items={items} />
      )}

      {hasNextPage && !isLoading && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading…' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
