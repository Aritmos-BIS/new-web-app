'use client'

import React, { useState } from 'react';
import { useStore } from '@/libs/store';
import { useRouter } from 'next/navigation';
import { Container, Typography, ListItemText, Checkbox, Button, Card } from '@mui/material';
import { apiFetch } from '@/libs/request';

const GroupPage = () => {
  const router = useRouter();
  const { group } = useStore(state => state);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else if (selectedStudents.length < 2) {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const payload = {
    _id: 2,
    turn: 0,
    player1: {
      playerId: selectedStudents[0],
      turn: 0,
    },
    player2: {
      playerId: selectedStudents[1],
      turn: 0,
    }
  };

  const handleSaveSelection = async () => {
    console.log("Payload to send:", payload);
    try {
      const response = await apiFetch('/api/battle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const textResponse = await response.text();
      console.log("Raw response:", textResponse);

      if (!response.ok) {
        throw new Error(`Failed to save selection: ${textResponse}`);
      }

      const result = JSON.parse(textResponse);
      console.log("Parsed response:", result);
      router.push('/auth/professors/tournamentStart');
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };

  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" color="white" gutterBottom>Estudiantes del Grupo</Typography>
      {group && group.students && group.students.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {group.students.map((student) => (
            <Card key={student.id} style={{ backgroundColor: '#3C096C', margin: '10px', padding: '10px', width: '300px' }}>
              <ListItemText primary={`${student.name} ${student.lastname}`} style={{ color: '#E0AAFF' }} />
              <Checkbox
                checked={selectedStudents.includes(student.id)}
                onChange={() => handleCheckboxChange(student.id)}
                style={{ alignSelf: 'flex-end' }}
                disabled={selectedStudents.length === 2 && !selectedStudents.includes(student.id)}
              />
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="h5">No hay estudiantes en este grupo.</Typography>
      )}
      <Button variant="contained" onClick={handleSaveSelection} style={{ marginTop: '20px' }}>
        Guardar Selección
      </Button>
    </Container>
  );
};

export default GroupPage;
