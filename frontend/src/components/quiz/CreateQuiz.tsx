import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, IconButton, Paper, Grid } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const quizData = {
      title,
      description,
      questions: questions.map(q => ({
        question_text: q.question,
        options: q.options,  // Convert options array to comma-separated string
        correct_option: q.correctOption
      })),
      scheduled_time: scheduledTime
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        toast.success('Quiz created successfully!');
      } else {
        toast.error('Failed to create quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the quiz.');
    }
  };

  return (
    <Container>
      <ToastContainer />
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
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Scheduled Time"
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
                  style={{ marginLeft: '8px' }}
                >
                  {q.correctOption === oIndex ? 'Correct' : 'Mark as Correct'}
                </Button>
              </Box>
            ))}
            <IconButton onClick={() => handleRemoveQuestion(qIndex)} style={{ marginTop: '16px' }}>
              <RemoveCircleOutline />
            </IconButton>
          </Paper>
        ))}
        <Box display="flex" justifyContent="space-between" marginTop="16px">
          <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={handleAddQuestion}>Add Question</Button>
          <Button type="submit" variant="contained" color="primary">Submit Quiz</Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateQuiz;
