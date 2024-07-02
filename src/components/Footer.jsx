import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer() {
  return (
    <div style={{ backgroundColor: '#3C096C', color: 'white', padding: '1.5rem 0' }}>
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          &copy; Aritmos Corporation
        </Typography>
      </Container>
    </div>
  );
}

export default Footer;
