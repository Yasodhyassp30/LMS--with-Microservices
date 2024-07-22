// src/components/quiz/CreateQuiz.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, IconButton, Paper } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);
  const [message, setMessage] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOption = oIndex;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Quiz created successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Quiz</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        {questions.map((q, qIndex) => (
          <Paper key={qIndex} style={{ padding: '16px', marginBottom: '16px' }}>
            <TextField
              label={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {q.options.map((option, oIndex) => (
              <Box key={oIndex} display="flex" alignItems="center">
                <TextField
                  label={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                <Button
                  variant={q.correctOption === oIndex ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleCorrectOptionChange(qIndex, oIndex)}
                >
                  {q.correctOption === oIndex ? 'Correct' : 'Mark as Correct'}
                </Button>
              </Box>
            ))}
            <IconButton onClick={() => handleRemoveQuestion(qIndex)}>
              <RemoveCircleOutline />
            </IconButton>
          </Paper>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={handleAddQuestion}>Add Question</Button>
          <Button type="submit" variant="contained" color="primary">Submit Quiz</Button>
        </Box>
      </form>
      {message && <Typography variant="h6" color="success.main">{message}</Typography>}
    </Container>
  );
};

export default CreateQuiz;
