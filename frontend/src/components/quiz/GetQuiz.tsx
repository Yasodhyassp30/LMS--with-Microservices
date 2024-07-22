// src/components/quiz/GetQuiz.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';

const dummyQuizzes = {
  1: {
    title: 'Distributed Systems Quiz 1',
    description: 'Quiz on basic concepts of distributed systems.',
    scheduledTime: '2024-07-20T10:00',
    questions: [
      { questionText: 'What is a distributed system?', options: ['A collection of independent computers', 'A single computer system', 'A type of software', 'None of the above'], correctOption: 0 },
      { questionText: 'What is the CAP theorem?', options: ['Consistency, Availability, Partition Tolerance', 'Concurrency, Access, Protocol', 'Correctness, Algorithm, Protocol', 'None of the above'], correctOption: 0 },
      { questionText: 'What is a consensus algorithm?', options: ['An algorithm to reach agreement', 'An algorithm for sorting', 'An algorithm for searching', 'None of the above'], correctOption: 0 },
      { questionText: 'What is a distributed hash table?', options: ['A decentralized data structure', 'A centralized database', 'A type of cryptographic hash', 'None of the above'], correctOption: 0 },
      { questionText: 'What is the Byzantine Generals Problem?', options: ['A problem of reaching consensus in a distributed system', 'A problem of sorting data', 'A problem of searching data', 'None of the above'], correctOption: 0 },
    ],
  },
  2: {
    title: 'Distributed Systems Quiz 2',
    description: 'Advanced topics in distributed systems.',
    scheduledTime: '2024-07-21T10:00',
    questions: [
      { questionText: 'What is consensus in distributed systems?', options: ['Agreement among nodes', 'A method of communication', 'A type of network', 'None of the above'], correctOption: 0 },
      { questionText: 'Explain the Byzantine Generals Problem.', options: ['A problem of reaching consensus with faulty nodes', 'A problem of resource allocation', 'A problem of load balancing', 'None of the above'], correctOption: 0 },
      { questionText: 'What is a quorum in distributed systems?', options: ['A majority needed to agree', 'A type of algorithm', 'A network protocol', 'None of the above'], correctOption: 0 },
      { questionText: 'What is fault tolerance?', options: ['Ability to continue operation despite failures', 'A method of data replication', 'A type of network', 'None of the above'], correctOption: 0 },
      { questionText: 'What is a leader election algorithm?', options: ['An algorithm to designate a coordinator', 'An algorithm to distribute tasks', 'An algorithm to sort data', 'None of the above'], correctOption: 0 },
    ],
  },
  3: {
    title: 'Distributed Systems Quiz 3',
    description: 'Quiz on distributed algorithms.',
    scheduledTime: '2024-07-22T10:00',
    questions: [
      { questionText: 'What is a distributed hash table?', options: ['A decentralized data structure', 'A centralized database', 'A type of cryptographic hash', 'None of the above'], correctOption: 0 },
      { questionText: 'Explain the Paxos algorithm.', options: ['A consensus algorithm', 'A sorting algorithm', 'A searching algorithm', 'None of the above'], correctOption: 0 },
      { questionText: 'What is Raft?', options: ['A consensus algorithm', 'A type of network', 'A data structure', 'None of the above'], correctOption: 0 },
      { questionText: 'What is eventual consistency?', options: ['Consistency over time', 'Immediate consistency', 'No consistency', 'None of the above'], correctOption: 0 },
      { questionText: 'What is a distributed ledger?', options: ['A decentralized ledger', 'A centralized database', 'A type of log', 'None of the above'], correctOption: 0 },
    ],
  },
};

const GetQuiz: React.FC = () => {
  const [quizId, setQuizId] = useState<string>('');
  const [quiz, setQuiz] = useState<any>(null);
  const [message, setMessage] = useState('');

  const handleFetch = () => {
    const id = parseInt(quizId) as 1 | 2 | 3;
    const fetchedQuiz = dummyQuizzes[id];
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz);
      setMessage('Quiz fetched successfully!');
    } else {
      setQuiz(null);
      setMessage('Quiz not found.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Get Quiz</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleFetch} style={{ marginLeft: '16px' }}>
          Fetch Quiz
        </Button>
      </Box>
      {message && <Typography variant="h6" color="error.main">{message}</Typography>}
      {quiz && (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h5">{quiz.title}</Typography>
          <Typography variant="body1">{quiz.description}</Typography>
          <Typography variant="body2">{quiz.scheduledTime}</Typography>
          {quiz.questions.map((q: any, index: number) => (
            <Box key={index} mt={2}>
              <Typography variant="subtitle1">{q.questionText}</Typography>
              <ul>
                {q.options.map((option: string, i: number) => (
                  <li key={i}>{option} {q.correctOption === i && '(Correct Answer)'}</li>
                ))}
              </ul>
            </Box>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default GetQuiz;
