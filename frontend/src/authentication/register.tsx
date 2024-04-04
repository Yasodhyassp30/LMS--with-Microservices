import {
    Button,
    Container,
    Icon,
    Link,
    MenuItem,
    Select,
    TextField
  } from "@mui/material";
  import LockIcon from "@mui/icons-material/Lock";
  import { useRef, useState } from "react";
  import axios from "axios";


export default function Register() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username = useRef<HTMLInputElement>(null);
    const [role,setRole] = useState<string>("");

    const [error,setError] = useState<string>("");

    const register = () => {
        if (!email.current?.value || !password.current?.value || !username.current?.value || role === "Select Role") {
            setError("Please fill all fields");
            return;
        }
        setError("");
        axios
            .post("http://localhost:8080/auth/register", {
                email: email.current?.value,
                password: password.current?.value,
                username: username.current?.value,
                role: role,
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    }
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
                        label="Username"
                        variant="outlined"
                        size="small"
                        sx={{
                            margin: "10px",
                        }}
                        inputRef={username}
                    />
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
                        <Select
                            labelId="role-label"
                            id="role-select"
                            size="small"
                            value={role}
                            label="Role"
                            sx={{
                                margin: "10px",
                            
                            }}
                            onChange={(e) => {
                                setRole( e.target.value);
                            
                            }}
                        >
                            <MenuItem value="Select Role" disabled>Select Role</MenuItem>
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Teacher">Teacher</MenuItem>
                        </Select>
                    <Button
                        variant="contained"
                        sx={{
                            margin: "10px",
                        }}
                        onClick={register}
                    >
                        Register
                    </Button>

                    <Link
                        href="/login"
                        sx={{
                            margin: "10px",
                            textDecoration: "none",
                        }}
                    >
                        Already have an account? Login
                    </Link>
                </Container>
            </div>
        </div>
    );
}
