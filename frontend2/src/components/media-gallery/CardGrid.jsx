import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';

export default function CardGrid({ items }) {
  return (
    <Grid container spacing={2}>
      {items.map(item => {
        const data = item.data?.[0] ?? {};
        const thumb = item.links?.[0]?.href;
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.href}>
            <Card>
              <CardActionArea
                href={item.href}
                target="_blank"
                rel="noopener"
              >
                {thumb && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={thumb}
                    alt={data.title}
                  />
                )}
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    {data.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {data.date_created?.slice(0, 10)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
