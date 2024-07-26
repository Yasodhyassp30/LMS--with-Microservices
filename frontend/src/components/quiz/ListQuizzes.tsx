import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Button, Card, CardContent, Typography, IconButton, Container, Box, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Quiz {
  quiz_id: number;
  title: string;
  description: string;
  scheduled_time: string;
}

const ListQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = (quizId: number) => {
    axios.delete(`http://127.0.0.1:8000/quiz/${quizId}`).then(response => {
      toast.success('Quiz deleted successfully!');
      setQuizzes(quizzes.filter(quiz => quiz.quiz_id !== quizId));
    }).catch(error => {
      toast.error('Failed to delete quiz!');
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>List Quizzes</Typography>
      {quizzes.length > 0 && (
        <Box mt={2}>
          {quizzes.map((quiz) => (
            <Card key={quiz.quiz_id} style={{ marginBottom: '16px' }}>
              <CardActionArea component={Link} to={`/quiz/${quiz.quiz_id}`}>
                <CardContent>
                  <Typography variant="h5">{quiz.title}</Typography>
                  <Typography variant="body1">{quiz.description}</Typography>
                  <Typography variant="body2">{new Date(quiz.scheduled_time).toLocaleString()}</Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(quiz.quiz_id)}
                style={{ float: 'right' }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ListQuizzes;
