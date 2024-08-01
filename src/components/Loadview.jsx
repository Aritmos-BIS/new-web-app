import React from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';

function Loadview() {
  return (
    <div style={{ color: 'white', textAlign: 'center', padding: '2rem 0' }}>
      <Container maxWidth="md">
        <div style={{ width: '50%', maxWidth: '100%', margin: 'auto', marginBottom: '2rem' }}>
          <img src="/images/logo-xl.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
        <Typography variant="h1" style={{ fontSize: '5rem', marginBottom: '1rem' }}>
          Cargando...
        </Typography>
        <CircularProgress color="secondary" size={80} thickness={4} />
      </Container>
    </div>
  );
}

export default Loadview;
