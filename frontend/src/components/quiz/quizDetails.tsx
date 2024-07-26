import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Paper
} from '@mui/material';

interface Question {
  // question_id(question_id: any, arg1: number): void;
  question_id: number;
  question_text: string;
  options: string[];
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface Answer {
  question_id: number;
  selected_option: number;
}

interface Result {
  question_id: number;
  correct: boolean;
  correct_option: number;
}

interface CheckAnswersResponse {
  quiz_id: string;
  results: Result[];
  score: number;
}

const QuizDetails: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<CheckAnswersResponse | null>(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/quiz/${quizId}`).then(response => {
      setQuiz(response.data);
    });
  }, [quizId]);

  const handleOptionChange = (questionId: number, selectedOption: number) => {
    console.log(questionId);
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.question_id === questionId);

      if (existingAnswerIndex > -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex].selected_option = selectedOption;
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { question_id: questionId, selected_option: selectedOption }];
      }
    });
  };

  const handleCheckAnswers = () => {
    console.log(answers);
    console.log(quiz?.questions);

    if (answers.length !== quiz?.questions.length) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    axios.post(`http://127.0.0.1:8000/quiz/${quizId}/check-answers`, answers)
      .then(response => {
        setResults(response.data);
      }).catch(error => {
        toast.error('Failed to check answers!');
      });
  };
console.log(quiz)
  return (
    <Container style={{ marginTop: '4rem' }}>
      {quiz ? (
        <>
          <Typography variant="h4">{quiz.title}</Typography>
          {quiz.questions.map(question => (
            <Paper key={question.question_id} style={{ padding: '1rem', marginBottom: '1rem' }}>
              <Typography variant="h6">{question.question_text}</Typography>
              <RadioGroup
                name={`question-${question.question_id}`}
                onChange={(event) => handleOptionChange(question.question_id, parseInt(event.target.value))}
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={option}
                    disabled={!!results}
                  />
                ))}
              </RadioGroup>
              {results && (
                <Box>
                  {results.results.find(result => result.question_id === question.question_id)?.correct ? (
                    <Typography style={{ color: 'green' }}>Correct</Typography>
                  ) : (
                    <>
                      <Typography style={{ color: 'red' }}>Wrong</Typography>
                      <Typography>
                        {(() => {
                          const result = results.results.find(result => result.question_id === question.question_id);
                          if (result) {
                            return `Correct answer: ${question.options[result.correct_option]}`;
                          }
                          return 'Correct answer not available';
                        })()}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Paper>
          ))}
          {!results && (
            <Button variant="contained" color="primary" onClick={handleCheckAnswers}>
              Check Answers
            </Button>
          )}
          {results && (
            <Typography variant="h5">
              Your Score: {results.score}
            </Typography>
          )}
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <ToastContainer />
    </Container>
  );
};

export default QuizDetails;
