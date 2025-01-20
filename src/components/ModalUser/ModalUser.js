import {
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    ThemeProvider,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const theme = createTheme({
    palette: {
        primary: blue,
    },
});

function ModalUser({
    title = "",
    description = "",
    openModal = false,
    handleCloseModal,
    handleSubmit,
    fillId = "",
    fillEmail = "",
    fillFirstName = "",
    fillLastName = "",
}) {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (openModal === true) {
            setId(fillId);
            setEmail(fillEmail);
            setFirstName(fillFirstName);
            setLastName(fillLastName);
        }
    }, [fillEmail, fillFirstName, fillId, fillLastName, openModal]);

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={openModal}
                onClose={() => {
                    handleCloseModal();
                }}
                aria-labelledby="responsive-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        handleSubmit(formJson);
                        handleCloseModal();
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <strong>{title}</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="id"
                        name="id"
                        label="ID User"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={id}
                        onChange={(event) => {
                            setId(event.target.value);
                        }}
                        disabled={id === "" ? true : false}
                        aria-readonly={id === "" ? false : true}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="firstName"
                        name="first_name"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={firstName}
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="lastName"
                        name="last_name"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ModalUser.propTypes = {
    openModal: PropTypes.bool,
    handleCloseModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fillEmail: PropTypes.string,
    fillFirstName: PropTypes.string,
    fillLastName: PropTypes.string,
};

export default ModalUser;
