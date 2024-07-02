import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: '#4a148c', color: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  A place to have fun while learning
                </Typography>
                <Typography variant="h6" gutterBottom>
                  4 topics to start
                </Typography>
                <Typography variant="h6">
                  3 games to learn
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={'/images/ninosestudiando.jpg'}
                  alt="Kids learning"
                  width={600}
                  height={400}
                  layout="intrinsic"
                  style={{ borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
