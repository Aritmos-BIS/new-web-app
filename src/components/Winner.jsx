import { Container, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/libs/request';
import { styled } from '@mui/material/styles';

const WinnerComponent = ({winner}) => {
    const FireworkBackground = styled('div')(({ fireworks }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        overflow: 'hidden',
        '& .firework': {
          position: 'absolute',
          width: '0.5vmin',
          height: '0.5vmin',
          content: '""',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
          backgroundSize: '0.5vmin 0.5vmin',
          backgroundRepeat: 'no-repeat',
          animation: 'firework 2s infinite',
          transformOrigin: 'center',
          ...(fireworks.map((firework, index) => ({
            [`& .firework:nth-of-type(${index + 1})`]: {
              top: firework.top,
              left: firework.left,
              animationDuration: firework.animationDuration,
              animationDelay: firework.animationDelay,
            },
          })))
        },
        '& .firework::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '0.5vmin',
          height: '0.5vmin',
          background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
          backgroundSize: '0.5vmin 0.5vmin',
          backgroundRepeat: 'no-repeat',
          animation: 'firework 2s infinite',
          transform: 'translate(-50%, -50%) rotate(25deg) !important',
        },
        '& .firework::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '0.5vmin',
          height: '0.5vmin',
          background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                      'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                      'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                      'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
          backgroundSize: '0.5vmin 0.5vmin',
          backgroundRepeat: 'no-repeat',
          animation: 'firework 2s infinite',
          transform: 'translate(-50%, -50%) rotate(-37deg) !important',
        },
        '@keyframes firework': {
          '0%': {
            transform: 'translate(-50%, 60vh)',
            width: '0.5vmin',
            opacity: '1',
          },
          '50%': {
            width: '0.5vmin',
            opacity: '1',
          },
          '100%': {
            width: '45vmin',
            opacity: '0',
          },
        },
      }));
      
      const generateRandomFireworks = (count) => {
        return [...Array(count)].map(() => ({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 1}s`,
          animationDelay: `${Math.random() * 2}s`,
        }));
      };

    const fireworks = generateRandomFireworks(10);

    const handleClickRestart = async () => {
        try {
          await apiFetch({ method: 'DELETE' }, '/api/battle');
          console.log('si borre');
          window.location.reload(); // Recarga la página
        } catch (error) {
          console.error('There was a problem with the delete operation:', error);
        }
      };
      

    return (
      <Container
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FireworkBackground fireworks={fireworks}>
        {fireworks.map((style, index) => (
          <div
            key={index}
            className="firework"
            style={{
              top: style.top,
              left: style.left,
              animationDuration: style.animationDuration,
              animationDelay: style.animationDelay,
            }}
          />
        ))}
      </FireworkBackground>
      <Typography variant="h4" style={{ color: 'white', marginBottom: '16px', zIndex: 1 }}>
        ¡Ganador de la batalla!
      </Typography>
      <Typography variant="h6" style={{ color: 'white', marginBottom: '16px', zIndex: 1 }}>
        {`${winner.firstName} ${winner.lastName}`}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '220px',
          height: '260px',
          backgroundColor: '#C77DFF',
          borderRadius: '10px',
          overflow: 'hidden',
          animation: 'growUp 1s ease-in-out',
          zIndex: 1,
        }}
      >
        <img
          src={winner.profileImage}
          style={{ width: '200px', height: '250px', borderRadius: '5%', display: 'block' }}
        />
      </div>
      
      <Button
        onClick={(handleClickRestart)}
        style={{
          marginTop: '20px',
          backgroundColor: '#7B2CBF',
          color: 'white',
          alignSelf: 'center',
          zIndex: 1,
        }}
      >
        Jugar de Nuevo
      </Button>
    </Container>
    );
  }

  export default WinnerComponent;
