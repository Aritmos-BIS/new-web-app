import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Box sx={{ color: 'white', py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" sx={{ height: '100%' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                A place to have fun while learning
              </Typography>
              <Typography variant="h3" gutterBottom>
                4 topics to start
              </Typography>
              <Typography variant="h3">
                3 games to learn
              </Typography>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                backgroundImage: "url('/images/ninosestudiando.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: '50vh', md: '100%' }, // Ajusta la altura en función del tamaño de la pantalla
                width: '100%',
              }}
            />
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default LandingPage;
 