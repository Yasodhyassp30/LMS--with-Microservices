// src/components/quiz/ListQuizzes.tsx
import React, { useState } from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';

const dummyQuizzes = [
  { quizId: 1, title: 'Distributed Systems Quiz 1', description: 'Basic concepts of distributed systems.', scheduledTime: '2024-07-20T10:00' },
  { quizId: 2, title: 'Distributed Systems Quiz 2', description: 'Advanced topics in distributed systems.', scheduledTime: '2024-07-21T10:00' },
  { quizId: 3, title: 'Distributed Systems Quiz 3', description: 'Distributed algorithms.', scheduledTime: '2024-07-22T10:00' },
  { quizId: 4, title: 'Distributed Systems Quiz 4', description: 'Consensus protocols.', scheduledTime: '2024-07-23T10:00' },
  { quizId: 5, title: 'Distributed Systems Quiz 5', description: 'CAP theorem.', scheduledTime: '2024-07-24T10:00' },
];

const ListQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const handleFetch = () => {
    setQuizzes(dummyQuizzes);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>List Quizzes</Typography>
      <Button variant="contained" color="primary" onClick={handleFetch}>Search Available Quizzes</Button>
      {quizzes.length > 0 && (
        <Box mt={2}>
          {quizzes.map((quiz) => (
            <Paper key={quiz.quizId} style={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="h5">{quiz.title}</Typography>
              <Typography variant="body1">{quiz.description}</Typography>
              <Typography variant="body2">{quiz.scheduledTime}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ListQuizzes;
