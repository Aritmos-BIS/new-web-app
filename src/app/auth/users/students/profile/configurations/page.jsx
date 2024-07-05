'use client'

import Link from 'next/link';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function ConfigurationPage() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [idGroup, setIdGroup] = useState('');
  const [school, setSchool] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Supongo que tienes el token almacenado en localStorage
    const response = await fetch('/api/auth/users/students', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        lastname,
        id_group: id,
      })
    });

    const result = await response.json();

    if (response.ok) {
      // Redirige a la página de perfil o muestra un mensaje de éxito
      alert('Perfil actualizado con éxito');
      router.push('/auth/users/students/profile');
    } else {
      // Muestra un mensaje de error
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        component="form"
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
        onSubmit={handleSubmit}
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
          id="name"
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
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Clave del Grupo"
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
          id="id_group"
          value={idGroup}
          onChange={(e) => setIdGroup(e.target.value)}
        />
        <TextField
          label="Escuela"
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
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Link href={`/auth/users/students/profile`} passHref>
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
