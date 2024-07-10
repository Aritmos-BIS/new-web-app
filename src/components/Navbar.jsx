'use client'

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useStore } from '@/libs/store';

function Navbar() {
  const { user } = useStore(state => state);

  const isLoggedIn = user && user.id;

  const homeLink = isLoggedIn ? `/auth/${user.userType}s` : '/';

  return (
    <AppBar position="static" style={{ backgroundColor: '#3C096C' }}>
      <Toolbar>
        <Link href={homeLink} passHref>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none', flexGrow: 1 }}
          >
            <img src="/images/logo.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component='div' sx={{ color: '#E0AAFF', textDecoration: 'none' }}>
              Aritmos
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login" passHref>
                <Button style={{ color: '#E0AAFF' }}>Ingresar</Button>
              </Link>
              <Link href="/auth/register" passHref>
                <Button style={{ color: '#E0AAFF' }}>Registrarse</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/auth/profile`} passHref>
                <Button style={{ color: '#E0AAFF' }}>Perfil</Button>
              </Link>
              <Link href="/auth/logout" passHref>
                <Button style={{ color: '#E0AAFF' }}>Salir</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
