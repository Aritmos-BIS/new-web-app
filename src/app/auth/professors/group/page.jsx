'use client'

import React, { useEffect } from 'react';
import { useStore } from '@/libs/store';
import { Container, Typography, Card, ListItemText } from '@mui/material';

const StudentsInfoPage = () => {

  const { doFetchGroup, group } = useStore(state => state);

  useEffect(() => {
    const fetchData = async () => {
      await doFetchGroup();
    };

    fetchData();
  }, [doFetchGroup]);
  
  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" color="white" gutterBottom>Estudiantes del Grupo</Typography>
      {group && group.students && group.students.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {group.students.map((student) => (
            <Card key={student.id} style={{ backgroundColor: '#3C096C', margin: '10px', padding: '10px', display: 'flex', width: '300px' }}>
              <div style={{ flex: 1, paddingRight: '10px' }}>
                <ListItemText primary={`${student.name} ${student.lastname}`} style={{ color: '#E0AAFF' }} />
                <Typography variant="body1" color="white">{`Email: ${student.email}`}</Typography>
              </div>
              <div style={{ flex: 0 }}>
                <img 
                  src={student.urlImage !== '' ? student.urlImage : "/images/logoempresa.png"} 
                  alt="Profile Image" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="h5" color="white">No hay estudiantes en este grupo.</Typography>
      )}
    </Container>
  );
};

export default StudentsInfoPage;
