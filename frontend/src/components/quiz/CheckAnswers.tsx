// src/components/quiz/CheckAnswers.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

const dummyResults = [
  { name: 'Sam', score: 1 },
  { name: 'Joy', score: 2 },
  { name: 'Alex', score: 3 },
  { name: 'Taylor', score: 4 },
  { name: 'Jordan', score: 5 },
  { name: 'Chris', score: 2 },
  { name: 'Pat', score: 3 },
];

const CheckAnswers: React.FC = () => {
  const [quizId, setQuizId] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleFetch = () => {
    setResults(dummyResults);
    setMessage('Answers checked successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Check Answers</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleFetch} style={{ marginLeft: '16px' }}>
          Check Answers
        </Button>
      </Box>
      {message && <Typography variant="h6" color="success.main">{message}</Typography>}
      {results.length > 0 && (
        <Box mt={2}>
          {results.map((result, index) => (
            <Paper key={index} style={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="body1">{result.name}</Typography>
              <Typography variant="body2">Score: {result.score}/5</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default CheckAnswers;
