// src/components/grade/GetCourseGrades.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

type Grades = { studentId: number; score: number }[];

const dummyCourseGrades: Record<number, Grades> = {
  101: [
    { studentId: 1, score: 95.0 },
    { studentId: 2, score: 92.0 },
    { studentId: 3, score: 89.0 },
  ],
  102: [
    { studentId: 1, score: 88.5 },
  ],
  103: [
    { studentId: 2, score: 76.0 },
  ],
  104: [
    { studentId: 3, score: 84.0 },
  ],
};

const GetCourseGrades: React.FC = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [grades, setGrades] = useState<Grades>([]);
  const [message, setMessage] = useState('');

  const handleFetch = () => {
    const id = parseInt(courseId);
    const fetchedGrades = dummyCourseGrades[id];
    if (fetchedGrades) {
      setGrades(fetchedGrades);
      setMessage('Grades fetched successfully!');
    } else {
      setGrades([]);
      setMessage('No grades found for this course.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Get Course Grades</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
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
              <Typography variant="body1">Student ID: {grade.studentId}</Typography>
              <Typography variant="body2">Score: {grade.score}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default GetCourseGrades;
