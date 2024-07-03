import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import Image from 'next/image';

const LandingPage = () => {
  return (
      <Grid xs={12}>
        <Box sx={{ backgroundColor: '#4a148c', color: 'white', py: 8, height: '80vh', justifyContent: 'center', alignContent: 'center' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
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
              <Grid item xs={12} md={6} 
              sx={{ display: 'flex', 
                justifyContent: 'center', 
                backgroundImage: "url('/images/ninosestudiando.jpg')",
                height: '90vh',
                width: '90vw',
                backgroundPosition: 'origin',
                backgroundPosition: ''
              }}
              />
            </Grid>
          </Container>
        </Box>
      </Grid>
  );
};

export default LandingPage;
