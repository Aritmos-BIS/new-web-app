import React from 'react';
import Link from 'next/link';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

function ConfigurationPage() {

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
          id="fullname"
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
