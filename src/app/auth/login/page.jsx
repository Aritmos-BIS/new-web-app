'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Grid, Box, Avatar, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { apiFetch } from '@/libs/request';
import Loadview from '@/components/Loadview';
import Image from 'next/image';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const imageStyle = {
    borderRadius: '15px',
    border: '0',
    boxShadow: '5px 5px 5px 5px #000000'
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const payload = { email: data.email, password: data.password };
      const response = await apiFetch({ payload, method: 'POST' }, '/api/login');
      localStorage.setItem('token', response.token); // Almacenar el token en localStorage
      router.push('/auth/users');
      router.refresh();
      setLoading(false)
    } catch (error) {
      setError(error.message);
      setLoading(false)
    }
  };

  if(loading){
    return <Loadview/>
  }

  return (
    <Grid container sx={{ height: 'min100vh', width: 'auto', justifyContent: 'space-evenly', alignItems: 'center', m: 4 }}>
      <Grid sx={{ backgroundColor: '#7B2CBF', height: '500px', width: '500px', borderRadius: '15px', boxShadow: '5px 5px 5px 5px #000000', p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blueviolet' }}></Avatar>
          <Typography variant="h3" sx={{ color: 'white' }}>
            Iniciar sesión
          </Typography>
          <Grid sx={{ flex: '1', flexDirection: 'column' }}>
            <Typography>¿Aún no tienes cuenta?</Typography>
            <Link href="/auth/register">
              <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', color: '#E0AAFF' }}>Regístrate ahora</Typography>
            </Link>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: '100%' }}>
              <TextField
                sx={{
                  boxShadow: 'inset 5px 5px 5px 5px #E0E0E0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                }}
                variant="filled"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  }
                })}
              />
              <Typography color="error" sx={{ height: '24px' }}>
                {errors.email ? errors.email.message : ' '}
              </Typography>
            </Box>
            <Box sx={{ width: '400px' }} >
              <TextField
                sx={{
                  boxShadow: 'inset 5px 5px 5px 5px #E0E0E0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                }}
                variant="filled"
                color="secondary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contrasena"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <Typography color="error" sx={{ height: '24px' }}>
                {errors.password ? errors.password.message : ' '}
              </Typography>
            </Box>
            <Button
              type="submit"
              sx={{ backgroundColor: '#C77DFF', color: 'white' }}
            >
              Ingresar
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Grid>
        <Image
        src= "/images/ajoloteMimido.png"
        width={550}
        height={550} 
        style={imageStyle}
        />
    </Grid>
  );
}

export default LoginPage;
  