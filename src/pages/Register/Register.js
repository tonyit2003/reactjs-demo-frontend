import { Alert, Button, Snackbar, TextField, Zoom } from "@mui/material";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";
import { useActionState, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { backgroundLogin } from "~/assets/Images";
import config from "~/config";
import { registerUser } from "~/services/UserService";
import { checkRePassword } from "~/utils/utils";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState({ content: "", error: false });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const register = async (previousState, formData) => {
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const password = formData.get("password");
        const re_password = formData.get("re_password");

        if (!email || !password || !re_password || !first_name || !last_name) {
            setMessage({
                content: "All fields are required",
                error: true,
            });
            setOpenToast(true);
            return false;
        }

        if (!checkRePassword(password, re_password)) {
            setMessage({
                content: "Passwords do not match",
                error: true,
            });
            setOpenToast(true);
            return false;
        }

        try {
            const res = await registerUser(
                email,
                password,
                first_name,
                last_name
            );
            if (res && res.message) {
                setMessage({
                    content: res.message,
                    error: false,
                });
            } else {
                setMessage({
                    content: "Invalid credentials",
                    error: true,
                });
            }
            setOpenToast(true);
            return true;
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
            setOpenToast(true);
            return false;
        }
    };

    const [state, formAction, isPending] = useActionState(register, false);

    useEffect(() => {
        if (state) {
            navigate(config.routes.login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleCloseToast = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessage({ content: "", error: false });
        setOpenToast(false);
    };

    return (
        <form action={formAction}>
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
                            <p className="lead fw-normal mb-0 me-3">Register</p>
                        </div>

                        <TextField
                            required
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="first_name"
                            label="Enter first name..."
                            type="text"
                            variant="standard"
                            value={firstName}
                            name="first_name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />

                        <TextField
                            required
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="last_name"
                            label="Enter last name..."
                            type="text"
                            variant="standard"
                            value={lastName}
                            name="last_name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />

                        <TextField
                            required
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="email"
                            label="Enter email..."
                            type="email"
                            variant="standard"
                            value={email}
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />

                        <TextField
                            required
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="password"
                            label="Enter password..."
                            variant="standard"
                            type="password"
                            value={password}
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <TextField
                            required
                            className="mb-4"
                            color="primary"
                            fullWidth
                            id="re_password"
                            label="Re-enter password..."
                            variant="standard"
                            type="password"
                            value={rePassword}
                            name="re_password"
                            onChange={(e) => {
                                setRePassword(e.target.value);
                            }}
                        />

                        <div className="text-center text-md-start mt-4 pt-2">
                            <Button
                                loading={isPending}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">
                                Do have an account?{" "}
                                <Link
                                    to={config.routes.login}
                                    className="link-danger"
                                >
                                    Login
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
                autoHideDuration={2000}
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
            ;
        </form>
    );
}

export default Register;
