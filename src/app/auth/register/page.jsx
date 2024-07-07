"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Grid, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import Image from "next/image";
import { useState } from "react";
import Loadview from "@/components/Loadview";
import { apiFetch } from "@/libs/request";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
  const router = useRouter();
  const isProfessor = watch("isprofessor");
  const [loading, setLoading] = useState(false);

  const imageStyle = {
    borderRadius: '15px',
    border: '0',
    boxShadow: '5px 5px 5px 5px #000000'
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors();

    if (data.password !== data.confirmPassword) {
      setLoading(false);
      return setError("confirmPassword", { type: "manual", message: "Las contraseñas no coinciden" });
    }

    try {
      const payload = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        groupId: isProfessor ? null : data.groupId,
      };

      const res = await apiFetch({ payload, method: 'POST' }, '/api/register');

      if (res.ok) {
        alert("Registro Exitoso");
        setLoading(false);
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        setLoading(false);

        if (errorData.error) {
          if (errorData.details) {
            setError("server", { type: "manual", message: `${errorData.error}: ${errorData.details}` });
          } else {
            setError("server", { type: "manual", message: errorData.error });
          }
        } else {
          setError("server", { type: "manual", message: "Hubo un error en el registro. Por favor, inténtalo de nuevo." });
        }
      }
    } catch (error) {
      setLoading(false);
      setError("server", { type: "manual", message: "Error en el servidor. Por favor, inténtalo de nuevo más tarde." });
    }
  });

  if (loading) {
    return <Loadview />;
  }

  return (
    <Grid container sx={{ height: '90vh', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item sx={{ backgroundColor: '#7B2CBF', height: 'auto', width: '600px', borderRadius: '15px', boxShadow: '5px 5px 5px 5px #000000', p: 4, m: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>Registro</Typography>
            {errors.server && <Typography color="error" sx={{ mb: 2 }}>{errors.server.message}</Typography>}
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name", { required: "Nombre es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.name ? errors.name.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              autoComplete="lastname"
              {...register("lastname", { required: "Apellido es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.lastname ? errors.lastname.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              {...register("email", { required: "Correo electrónico es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.email ? errors.email.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Contraseña es requerida" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.password ? errors.password.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirma tu contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword", { required: "Es necesario que confirmes tu contraseña" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.confirmPassword ? errors.confirmPassword.message : ' '}
            </Typography>
            {!isProfessor && (
              <>
                <TextField
                  sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
                  variant="filled"
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="groupId"
                  label="ID del Grupo"
                  name="groupId"
                  autoComplete="groupId"
                  {...register("groupId", { required: "ID del Grupo es requerido" })}
                />
                <Typography color="error" sx={{ height: '24px' }}>
                  {errors.groupId ? errors.groupId.message : ' '}
                </Typography>
              </>
            )}
            <FormControlLabel
              control={<Checkbox {...register("isprofessor")} color="primary" />}
              label="Marca esta casilla si eres un profesor"
            />
            <Button
              type="submit"
              sx={{ backgroundColor: '#C77DFF', color: 'white', mt: 1, mx: 'auto' }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>
      <Image
        src="/images/ajoloteMimido.png"
        width={550}
        height={550}
        style={imageStyle}
        alt="Axolotl mimido"
      />
    </Grid>
  );
}

export default RegisterPage;
