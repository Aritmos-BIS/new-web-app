'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useStore } from '@/libs/store'

function ConfigurationPage() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const router = useRouter();
  const { doFetchUser, user  } = useStore(state => state)

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        lastname,
      }),
    });

    if (response.ok) {
      alert('Perfil actualizado con éxito');
      await doFetchUser()
      router.push(`/auth/professors`)

    } else {
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        component="form"
        onSubmit={handleUpdateProfile}
        sx={{
          backgroundColor: 'purple',
          boxShadow: 3,
          margin: 3,
          padding: 4,
          borderRadius: 2,
          textAlign: 'center',
          color: 'white',
          maxWidth: { lg: '25%', md: '100%' },
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Edición de perfil
        </Typography>
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            borderColor: 'purple',
            borderWidth: 2,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Apellido de usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            borderColor: 'purple',
            borderWidth: 2,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Link href={`/auth/users/professors`} passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'red',
                color: 'white',
                ':hover': {
                  backgroundColor: 'darkred',
                  color: 'gray',
                },
              }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'skyblue',
              color: 'white',
              ':hover': {
                backgroundColor: 'blue',
                color: 'black',
              },
            }}
          >
            Actualizar perfil
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ConfigurationPage;
