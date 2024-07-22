// src/components/grade/RecordGrade.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

const RecordGrade: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Grade recorded successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Record Grade</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      {message && <Typography variant="h6" color="success.main">{message}</Typography>}
    </Container>
  );
};

export default RecordGrade;
