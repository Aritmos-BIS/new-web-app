'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loadview from '@/components/Loadview';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';

function ConfigurationPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [fullname, setFullname] = useState("");
  const [school, setSchool] = useState("");
  const [id_group, setGroupId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id_student) {
      setLoading(true);

      fetch(`/api/students/${Number(params.id_student)}`)
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.fullname);
          setSchool(data.school);
          setGroupId(data.id_group);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id_student]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id_student) {
      await fetch(`/api/students/${params.id_student}`, {
        method: "PUT",
        body: JSON.stringify({ fullname, school, id_group }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    alert("Actualizado");
    router.back();
    router.refresh();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/students/${Number(params.id_student)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete student: ${res.status} ${res.statusText}`);
      }

      alert("BORRADO");
      router.back();
      router.refresh();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <Loadview />
      ) : (
        <Box component="form" onSubmit={onSubmit} sx={{ bgcolor: 'purple.600', boxShadow: 3, p: 4, borderRadius: 2, width: { lg: '25%', md: '50%', xs: '90%' }, color: 'white' }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>Edicion de perfil</Typography>
          <TextField
            fullWidth
            label="Nombre de usuario"
            variant="outlined"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Clave del Grupo"
            variant="outlined"
            value={id_group}
            onChange={(e) => setGroupId(e.target.value)}
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Escuela"
            variant="outlined"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ height: '100%' }}
              >
                Borrar
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link href={`../`} passHref>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ height: '100%' }}
                >
                  Cancelar
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: '100%' }}
              >
                Actualizar perfil
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ConfigurationPage;
