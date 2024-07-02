'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loadview from '@/components/Loadview';
import Checker from '@/components/Checker';
import { Container, Box, Typography, TextField, Button, CircularProgress, Paper } from '@mui/material';

function ConfigurationPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [fullname, setFullname] = useState("");
  const [school, setSchool] = useState("");
  const [id_group, setGroupId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState(""); 

  useEffect(() => {
    if (params.id_professor) {
      setLoading(true);

      fetch(`/api/professors/${Number(params.id_professor)}`)
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.fullname);
          setSchool(data.school);
          setGroupId(data.id_group);
          return fetch(`/api/groups-unique/${Number(data.id_group)}`);
        })
        .then((res) => res.json())
        .then((data) => {
          setGroupName(data.group_name);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id_professor]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id_professor) {
      const professorData = {
        fullname,
        school,
        id_group,
      };

      try {
        const res = await fetch(`/api/professors/${params.id_professor}`, {
          method: "PUT",
          body: JSON.stringify(professorData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error('Failed to update professor details:', res.statusText);
          return;
        }

        const data = await res.json();
      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
      }
    }

    if (id_group) {
      const groupData = {
        group_name: groupName,
      };

      try {
        const res = await fetch(`/api/groups-unique/${id_group}`, {
          method: "PUT",
          body: JSON.stringify(groupData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error('Failed to update group details:', res.statusText);
          return;
        }

        const data = await res.json();
      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
      }
    }

    router.push(`/auth/users/professors/dashboard/${params.id_professor}`);
  };

  return (
    <Checker id={params.id_professor}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper sx={{ p: 4, bgcolor: 'purple.600', color: 'white', borderRadius: 2, boxShadow: 3 }}>
            <form onSubmit={onSubmit}>
              <Typography variant="h4" align="center" gutterBottom>
                Edición de perfil
              </Typography>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                margin="normal"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Grupo"
                variant="outlined"
                margin="normal"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Escuela"
                variant="outlined"
                margin="normal"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Link href={`/auth/users/professors/dashboard/${session?.user.id}`}>
                  <Button variant="contained" color="error" sx={{ width: '48%' }}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '48%' }}>
                  Actualizar perfil
                </Button>
              </Box>
            </form>
          </Paper>
        )}
      </Container>
    </Checker>
  );
}

export default ConfigurationPage;
