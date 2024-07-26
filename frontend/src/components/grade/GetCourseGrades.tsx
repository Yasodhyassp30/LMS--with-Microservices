// src/components/grade/GetStudentGrades.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

type Grades = { courseId: number; score: number }[];

const dummyStudentGrades: Record<number, Grades> = {
  1: [
    { courseId: 101, score: 95.0 },
    { courseId: 102, score: 88.5 },
  ],
  2: [
    { courseId: 101, score: 92.0 },
    { courseId: 103, score: 76.0 },
  ],
  3: [
    { courseId: 104, score: 84.0 },
    { courseId: 101, score: 89.0 },
  ],
};

const GetStudentGrades: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [grades, setGrades] = useState<Grades>([]);
  const [message, setMessage] = useState('');

  const handleFetch = () => {
    const id = parseInt(studentId);
    const fetchedGrades = dummyStudentGrades[id];
    if (fetchedGrades) {
      setGrades(fetchedGrades);
      setMessage('Grades fetched successfully!');
    } else {
      setGrades([]);
      setMessage('No grades found for this student.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Get Student Grades</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleFetch} style={{ marginLeft: '16px' }}>
          Fetch Grades
        </Button>
      </Box>
      {message && <Typography variant="h6" color="error.main">{message}</Typography>}
      {grades.length > 0 && (
        <Box mt={2}>
          {grades.map((grade, index) => (
            <Paper key={index} style={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="body1">Course ID: {grade.courseId}</Typography>
              <Typography variant="body2">Score: {grade.score}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default GetStudentGrades;
