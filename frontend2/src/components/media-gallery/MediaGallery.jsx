// src/components/media-gallery/MediaGallery.jsx

import React, { useState } from 'react';
import useMediaSearch from '../../api/useMediaSearch';
import SearchBar from './SearchBar';
import FacetFilters from './FacetFilters';
import CardGrid from './CardGrid';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Typography 
} from '@mui/material';

export default function MediaGallery() {
  // free‐text / year search params
  const [params, setParams] = useState({
    q: '',
    media_type: 'image',
    year_start: '',
    year_end: ''
  });

  // facet filters state
  const [filters, setFilters] = useState({
    centers: [],
    keywords: []
  });

  // fetch pages of results
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useMediaSearch(params);

  // flatten out all pages into one array
  const allItems = data?.pages.flatMap(page => page.items) ?? [];

  // apply facet filtering client‐side
  const items = allItems.filter(item => {
    const d = item.data?.[0] || {};
    if (filters.centers.length && !filters.centers.includes(d.center)) {
      return false;
    }
    if (
      filters.keywords.length && 
      !d.keywords?.some(kw => filters.keywords.includes(kw))
    ) {
      return false;
    }
    return true;
  });

  // when the free‐text / year search is submitted
  const onSearch = newParams => {
    setParams(newParams);
    refetch();
  };

  return (
    <Box sx={{ my: 4 }}>
      {/* 1) free-text / year search */}
      <SearchBar onSearch={onSearch} />

      {/* 2) facet filters (center, keyword) */}
      <FacetFilters
        items={allItems}
        filters={filters}
        onChange={setFilters}
      />

      {/* 3) results grid / loading / empty */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No results found.
        </Typography>
      ) : (
        <CardGrid items={items} />
      )}

      {/* 4) load more button if more pages */}
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
