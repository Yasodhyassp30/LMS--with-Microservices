import {
  Button,
  Container,
  Icon,
  Link,
  TextField
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authSlice } from "../../reducers/authreducer/authReducer";

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error,setError] = useState<string>("");
  const dispatch = useDispatch();

  const login = () => {
    if (!email.current?.value || !password.current?.value) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    axios
      .post("http://localhost:8080/auth/login", {
        email: email.current?.value,
        password: password.current?.value,
      })
      .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch(authSlice.actions.setLogged({}));
          
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div>
      <img
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
        src="images/wall.jpg"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            margin: "10px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255)",
            width: "max-content",
            "& > *": {
              minWidth: "300px",
            },
          }}
          maxWidth="md"
        >
          <Icon
            sx={{
              fontSize: "50px",
              margin: "20px",
            }}
          >
            <LockIcon
              color="primary"
              sx={{
                fontSize: "50px",
              }}
            />
          </Icon>
          <p style={{
            color: "red"
            }}>
          {error}</p>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            sx={{
              margin: "10px",
            }}
            inputRef={email}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            sx={{
              margin: "10px",
            }}
            inputRef={password}
          />

          <Button
            variant="contained"
            sx={{
              margin: "10px",
            }}
            onClick={login}
          >
            Login
          </Button>

          <Link
            href="/register"
            sx={{
              margin: "10px",
              textDecoration: "none",
            }}
          >
            Don't have an account? Register
          </Link>
        </Container>
      </div>
    </div>
  );
}
