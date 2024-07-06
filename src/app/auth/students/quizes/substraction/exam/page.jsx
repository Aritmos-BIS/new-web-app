'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { quiz } from '../users/students/quizes/substraction/exam/data.js';
import { Container, Typography, Button, Grid, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const handleAnswerSelection = (answer, idx) => {
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const handleFinishExam = async () => {
    if (session?.user.id) {
      try {
        const res = await fetch(`/api/studentsExam/substraction/${session.user.id}`, {
          method: "PUT",
          body: JSON.stringify({ SubstractionQuiz: result.correctAnswers }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          console.error('Failed to update quiz results:', res.statusText);
          // Handle the error (e.g., show an error message to the user)
          return;
        }

        // Handle the data if needed

      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }

    router.push(`/auth/users/students/dashboard/${session.user.id}`);
  };

  return (
    <main>
      <Typography variant="h2" align="center" style={{ marginBottom: '1rem', color: 'white' }}>
        Examen de Restas
      </Typography>
      <Container maxWidth="md" sx={{ p: '30px', borderRadius: '20px', backgroundColor:"#3C096C", marginTop: '2rem', marginBottom: '2rem' }}>
        {!showResult ? (
          <div>
            <Typography variant="h5" style={{ marginBottom: '0.5rem' }}>
              Pregunta: {activeQuestion + 1}/{questions.length}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
              {questions[activeQuestion].question}
            </Typography>
            <List component="div" aria-label="respuestas">
              {answers.map((answer, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={() => handleAnswerSelection(answer, idx)}
                  disabled={selectedAnswerIndex !== null}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '0.5rem',
                    backgroundColor: selectedAnswerIndex === idx ? '#673AB7' : 'inherit',
                    color: selectedAnswerIndex === idx ? '#ffffff' : 'inherit',
                  }}
                >
                  <ListItemText primary={answer} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleNextQuestion}
              disabled={selectedAnswerIndex === null}
              style={{ marginTop: '1rem' }}
            >
              {activeQuestion === questions.length - 1 ? 'Terminar examen' : 'Siguiente pregunta'}
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" style={{ marginBottom: '1rem' }}>
              Resultados del examen
            </Typography>
            <Typography variant="h5" align="center" style={{ marginBottom: '0.5rem' }}>
              Total {(result.score / (questions.length * 5)) * 100}%
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: '1rem' }}>
              Total de preguntas: {questions.length}
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: '1rem' }}>
              Puntuación total: {result.score}
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: '1rem' }}>
              Preguntas correctas: {result.correctAnswers}
            </Typography>
            <Typography variant="body1" align="center" style={{ marginBottom: '2rem' }}>
              Preguntas incorrectas: {result.wrongAnswers}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFinishExam}
              style={{ marginTop: '1rem' }}
            >
              Regresar al inicio
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
};

export default Page;
