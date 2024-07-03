'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from 'next/image';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const imageStyle = {
    borderRadius: '15px',
    border: '0',
    boxShadow: '5px 5px 5px 5px #000000'
  }

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      if (!res.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const result = await res.json();
      localStorage.setItem('token', result.token); // Almacenar el token en localStorage
      router.push('/auth/users');
      router.refresh();
    } catch (error) {
      setError(error.message);
    }
  };

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
