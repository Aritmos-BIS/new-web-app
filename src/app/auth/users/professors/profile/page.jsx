'use client'

import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/libs/request';
import { useStore } from '@/libs/store'
import Loadview from '@/components/Loadview';

function ProfessorPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { doFetchUser, user  } = useStore(state => state)

  useEffect(() => {
    handleLoad();
  },[]);
  
  useEffect(() => {
    console.log({user})
  }, [user])
  
  const handleLoad = async () => {
    setLoading(true);
    await doFetchUser()
    setLoading(false);
  };
  
  if (loading) {
    return <Loadview/>;
  }

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
                  <Typography variant="h6">Escuela: <b>NombreEscuela</b></Typography>
                  <Typography variant="h6">Clave de Grupo: <b>{user.id}</b></Typography>
                  <Typography variant="h6">Grupo al que pertenece: <b>{user.group.name}</b></Typography>
                  <Box mt={2}>
                    <Link href={'/auth/users/professors/configurations'}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      sx={{ mb: 2, width: '100%' }}
                    >
                      Edita tu perfil
                    </Button>
                    </Link>
                    <Link href={`/auth/users/professors/group`}>
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
