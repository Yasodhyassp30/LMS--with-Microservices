// src/App.tsx
import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StudentDashboard from "./components/classes/students/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/combinedReducers";
import { authSlice } from "./reducers/authreducer/authReducer";
import Navbar from "./components/navbar/navbar";
import TeacherDashboard from "./components/classes/teacher/dashboard";
import { SYSTEM_USER_TYPES } from "./commonContsnats";
import PageNotFound from "./components/common/pageNotFound";
import ClassView from "./components/classes/teacher/classView";

import CreateQuiz from "./components/quiz/CreateQuiz";
import GetQuiz from "./components/quiz/GetQuiz";
import ListQuizzes from "./components/quiz/ListQuizzes";
import CheckAnswers from "./components/quiz/CheckAnswers";
import DeleteQuiz from "./components/quiz/DeleteQuiz";

import RecordGrade from "./components/grade/RecordGrade";
import GetStudentGrades from "./components/grade/GetStudentGrades";
import GetCourseGrades from "./components/grade/GetCourseGrades";
import UpdateGrade from "./components/grade/UpdateGrade";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authSlice.actions.setLogged({}));
  }, [user, dispatch]);

  const getUserSpecificDashboard = () => {
    if (user.role === SYSTEM_USER_TYPES.TEACHER) {
      return <TeacherDashboard />;
    }
    if (user.role === SYSTEM_USER_TYPES.STUDENT) {
      return <StudentDashboard />;
    }
    return <PageNotFound />;
  };

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              user.token === "" ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/register"
            element={
              user.token === "" ? <Register /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              user.token !== "" ? (
               getUserSpecificDashboard()
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={
              user.token !== "" ? <PageNotFound /> : <Navigate to="/login" />
            }
          />
          <Route path="/class/:id" element={
            user.token !== "" ? <ClassView/> : <Navigate to="/login" />
          }/>
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/get-quiz" element={<GetQuiz />} />
          <Route path="/list-quizzes" element={<ListQuizzes />} />
          <Route path="/check-answers" element={<CheckAnswers />} />
          <Route path="/delete-quiz" element={<DeleteQuiz />} />
          <Route path="/record-grade" element={<RecordGrade />} />
          <Route path="/get-student-grades" element={<GetStudentGrades />} />
          <Route path="/get-course-grades" element={<GetCourseGrades />} />
          <Route path="/update-grade" element={<UpdateGrade />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
