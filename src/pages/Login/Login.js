import React, { useContext, useEffect, useState } from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import { FacebookOutlined, LinkedIn, Twitter } from "@mui/icons-material";
import {
    Alert,
    Button,
    IconButton,
    Snackbar,
    TextField,
    Zoom,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { backgroundLogin } from "~/assets/Images";
import { loginUser } from "~/services/UserService";
import config from "~/config";
import { UserContext } from "~/context/UserContext";

function Login() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState({ content: "", error: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate(config.routes.home);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            setMessage({
                content: "Email or password is required",
                error: true,
            });
            setLoading(false);
            setOpenToast(true);
            return;
        }
        try {
            const res = await loginUser(email, password);
            if (res && res.message && res.token) {
                setLoading(false);
                setMessage({
                    content: res.message,
                    error: false,
                });
                login(email);
                localStorage.setItem("token", res.token);
                localStorage.setItem("email", email);
                navigate(config.routes.home);
            } else {
                setMessage({
                    content: "Invalid credentials",
                    error: true,
                });
            }
            setLoading(false);
            setOpenToast(true);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage({
                    content: error.response.data.message,
                    error: true,
                });
            } else {
                setMessage({
                    content: "Invalid credentials",
                    error: true,
                });
            }
            setLoading(false);
            setOpenToast(true);
        }
    };

    const handleCloseToast = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessage({ content: "", error: false });
        setOpenToast(false);
    };

    return (
        <div>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col="10" md="6">
                        <img
                            src={backgroundLogin}
                            className="img-fluid"
                            alt="Sample_image"
                        />
                    </MDBCol>

                    <MDBCol col="4" md="6">
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p className="lead fw-normal mb-0 me-3">
                                Sign in with
                            </p>

                            <IconButton color="primary">
                                <FacebookOutlined />
                            </IconButton>

                            <IconButton color="primary">
                                <Twitter />
                            </IconButton>

                            <IconButton color="primary">
                                <LinkedIn />
                            </IconButton>
                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        <TextField
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="email"
                            label="Enter email..."
                            type="email"
                            variant="standard"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />

                        <TextField
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="password"
                            label="Enter password..."
                            variant="standard"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox
                                name="flexCheck"
                                value=""
                                id="flexCheckDefault"
                                label="Remember me"
                            />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <div className="text-center text-md-start mt-4 pt-2">
                            <Button
                                loading={loading}
                                type="submit"
                                onClick={handleLogin}
                                variant="contained"
                                color="primary"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleLogin();
                                    }
                                }}
                            >
                                Login
                            </Button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">
                                Don't have an account?{" "}
                                <Link
                                    to={config.routes.register}
                                    className="link-danger"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </MDBCol>
                </MDBRow>

                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                </div>
            </MDBContainer>
            <Snackbar
                open={openToast}
                autoHideDuration={5000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={Zoom}
            >
                <Alert
                    onClose={handleCloseToast}
                    variant="filled"
                    severity={message.error ? "error" : "success"}
                >
                    {message.content}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
