import React from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';

function Loadview() {
  return (
    <div style={{ color: 'white', textAlign: 'center', padding: '2rem 0' }}>
      <Container maxWidth="md">
        <div style={{ width: '50%', maxWidth: '100%', margin: 'auto', marginBottom: '2rem' }}>
          <img src="/images/logo-xl.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </div>
        <CircularProgress color="secondary" size={80} thickness={4} />
        <Typography variant="h3" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Cargando...
        </Typography>
      </Container>
    </div>
  );
}

export default Loadview;
