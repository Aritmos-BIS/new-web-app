'use client'

import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/libs/store'

function ProfessorPage() {

  const { user } = useStore(state => state)

  return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ bgcolor: 'purple', color: 'white', textAlign: 'center', p: 4, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <img src="/images/logoempresa.png" alt="Logo" style={{ width: '80%', margin: 'auto' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ bgcolor: 'white', color: 'black', p: 2, borderRadius: 2 }}>
                  <Typography variant="h4" gutterBottom>Perfil del usuario</Typography>
                  <Typography variant="h6">Nombre: <b>{user.name}</b></Typography>
                  <Typography variant="h6">Apellidos: <b>{user.lastname}</b></Typography>
                  <Typography variant="h6">Clave de Grupo: <b>{user.id}</b></Typography>
                  <Typography variant="h6">Nombre de su grupo: <b>{user.group.name}</b></Typography>
                  <Box mt={2}>
                    <Link href={'/auth/professors/profile/configurations'}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      sx={{ mb: 2, width: '100%' }}
                    >
                      Edita tu perfil
                    </Button>
                    </Link>
                    <Link href={`/auth/professors/group`}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ width: '100%' }}
                       
                    >
                      Alumnos de tu grupo
                    </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
      </Container>
  );
}

export default ProfessorPage;
