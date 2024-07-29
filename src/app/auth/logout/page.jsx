'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { useStore } from '@/libs/store';

function Logout() {
  const router = useRouter();
  const { logout } = useStore(state => state);

  const handleSignOut = () => {
    logout();
    alert('Cerraste sesión');
    router.push('/');
  };

  return (
    <Container sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        sx={{
          p: 4,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          width: '60%',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          ¿Estas seguro de que deseas cerrar tu sesión?
        </Typography>
        <Box
          component="img"
          src="/images/chihuahuasad.jpg"
          alt="Sad Chihuahua"
          width={{xs:'100%', md: '20%', lg:'40%'}}
          sx={{
            borderRadius: '50%',
            margin: '20px auto',
            display: 'block',
            boxShadow: 3,
          }}
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleSignOut}
          sx={{
            mt: 2,
            width: '100%',
            ':hover': {
              backgroundColor: 'darkred',
              color: 'gray',
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Paper>
    </Container>
  );
}

export default Logout;
