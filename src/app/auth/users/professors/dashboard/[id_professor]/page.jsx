'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loadview from '@/components/Loadview';
import Checker from '@/components/Checker';
import { Container, Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';

// Define the professorPage component
function ProfessorPage({ params }) {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [school, setSchool] = useState("");
  const [groupName, setGroupName] = useState(""); // Separate state for group name
  const [loading, setLoading] = useState(true);
  const [id_group, setIdGroup] = useState("");

  useEffect(() => {
    if (params.id_professor) {
      setLoading(true);

      fetch(`/api/professors/${Number(params.id_professor)}`)
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.fullname);
          setSchool(data.school);
          setIdGroup(data.id_group);

          return fetch(`/api/groups-unique/${data.id_group}`);
        })
        .then((res) => res.json())
        .then((data) => {
          setGroupName(data.group_name);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle errors appropriately, e.g., set an error state
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id_professor]);

  return (
    <Checker id={params.id_professor}>
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper sx={{ bgcolor: 'purple', color: 'white', textAlign: 'center', p: 4, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <img src="/images/logoempresa.png" alt="Logo" style={{ width: '80%', margin: 'auto' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ bgcolor: 'white', color: 'black', p: 2, borderRadius: 2 }}>
                  <Typography variant="h4" gutterBottom>Perfil del usuario</Typography>
                  <Typography variant="h6">Nombre: <b>{fullname}</b></Typography>
                  <Typography variant="h6">Escuela: <b>{school}</b></Typography>
                  <Typography variant="h6">Clave de Grupo: <b>{id_group}</b></Typography>
                  <Typography variant="h6">Grupo al que pertenece: <b>{groupName}</b></Typography>
                  <Box mt={2}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      sx={{ mb: 2, width: '100%' }}
                      onClick={() => router.push(`/auth/users/professors/dashboard/${params.id_professor}/configurations`)}
                    >
                      Edita tu perfil
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ width: '100%' }} 
                      onClick={() => {
                        setLoading(true);
                        router.push(`/auth/users/professors/dashboard/${params.id_professor}/${id_group}`);
                        setLoading(false);
                      }}
                    >
                      Alumnos de tu grupo
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Checker>
  );
}

export default ProfessorPage;
