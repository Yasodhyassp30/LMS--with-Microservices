// src/components/quiz/DeleteQuiz.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

const DeleteQuiz: React.FC = () => {
  const [quizId, setQuizId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = () => {
    setMessage('Quiz deleted successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Delete Quiz</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleDelete} style={{ marginLeft: '16px' }}>
          Delete Quiz
        </Button>
      </Box>
      {message && <Typography variant="h6" color="success.main">{message}</Typography>}
    </Container>
  );
};

export default DeleteQuiz;
