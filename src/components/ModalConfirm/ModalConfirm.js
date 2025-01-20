import {
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ThemeProvider,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import PropTypes from "prop-types";

const theme = createTheme({
    palette: {
        primary: blue,
    },
});

function ModalConfirm({
    openModal = false,
    handleCloseModal,
    title = "",
    description = "",
    handleSubmit,
}) {
    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
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
                        onClick={() => {
                            handleSubmit();
                            handleCloseModal();
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Agree
                    </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    );
}

ModalConfirm.propTypes = {
    openModal: PropTypes.bool,
    handleCloseModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};

export default ModalConfirm;
