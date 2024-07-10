'use client'

import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingPage = () => {

  const router = useRouter()

  router.push("/")

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          height: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            A place to have fun while learning
          </Typography>
          <Typography variant="h3" gutterBottom>
            4 topics to start
          </Typography>
          <Typography variant="h3" gutterBottom>
            3 games to learn
          </Typography>
        </Container>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: "url('/images/ninosestudiando.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      />
    </Grid>
  );
};

export default LandingPage;
