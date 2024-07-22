// src/components/grade/UpdateGrade.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

const UpdateGrade: React.FC = () => {
  const [gradeId, setGradeId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Grade updated successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Update Grade</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Grade ID"
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
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
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
      {message && <Typography variant="h6" color="success.main">{message}</Typography>}
    </Container>
  );
};

export default UpdateGrade;
