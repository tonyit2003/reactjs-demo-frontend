/* eslint-disable no-unused-expressions */
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import classNames from "classnames/bind";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
    Alert,
    Box,
    Pagination,
    PaginationItem,
    Snackbar,
    TextField,
    Zoom,
} from "@mui/material";
import { Add, Email } from "@mui/icons-material";

import style from "./PersonnelManagement.module.scss";
import {
    addUser,
    deleteUser,
    getPaginationUsers,
    searchUsers,
    updateUser,
} from "~/services/UserService";
import CustomButton from "~/components/CustomButton";
import ModalUser from "~/components/ModalUser";
import PersonnelTable from "~/components/PersonnelTable";
import ModalConfirm from "~/components/ModalConfirm";

const cx = classNames.bind(style);

const headCells = [
    {
        id: "id",
        align: "center",
        disablePadding: false,
        label: "ID",
    },
    {
        id: "first_name",
        align: "left",
        disablePadding: false,
        label: "First name",
    },
    {
        id: "last_name",
        align: "left",
        disablePadding: false,
        label: "Last name",
    },

    {
        id: "email",
        align: "left",
        disablePadding: false,
        label: "Email",
    },
];

function PersonnelManagement() {
    const [listUsers, setListUsers] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState({ content: "", error: false });
    const [openConfirm, setOpenConfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [userInformation, setUserInformation] = useState({
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
    });

    const deferredSearch = useDeferredValue(keyword);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUsers();
        }
    }, []);

    useEffect(() => {
        handleSearchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deferredSearch]);

    const handleSearchUsers = async () => {
        if (deferredSearch) {
            try {
                const res = await searchUsers(deferredSearch);
                if (res && res.data) {
                    setListUsers(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setPage(1);
            getUsers(page);
        }
    };

    const getUsers = async (page = 1) => {
        try {
            let res = await getPaginationUsers(page);
            console.log(res);

            if (res && res.data) {
                setListUsers(res.data);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePagination = (event, value) => {
        getUsers(value);
        setPage(value);
    };

    const handleAddUser = async (dataAdd) => {
        try {
            let res = await addUser(
                dataAdd.email,
                dataAdd.first_name,
                dataAdd.last_name
            );
            if (res && res.message && res.user) {
                setMessage({ content: res.message, error: false });
                setOpenToast(true);
                getUsers(page);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage({
                    content: error.response.data.message,
                    error: true,
                });
                setOpenToast(true);
            } else {
                setMessage({
                    content: "Error adding new member",
                    error: true,
                });
                setOpenToast(true);
            }
        }
    };

    const handleCloseToast = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessage({ content: "", error: false });
        setOpenToast(false);
    };

    const handleEditUser = async (dataEdit) => {
        try {
            let res = await updateUser(
                dataEdit.id,
                dataEdit.email,
                dataEdit.first_name,
                dataEdit.last_name
            );
            if (res && res.message && res.user) {
                setMessage({ content: res.message, error: false });
                setOpenToast(true);
                getUsers(page);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage({
                    content: error.response.data.message,
                    error: true,
                });
                setOpenToast(true);
            } else {
                setMessage({
                    content: "Error while updating member",
                    error: true,
                });
                setOpenToast(true);
            }
        }
    };

    const handleDeleteUser = async (dataDelete) => {
        try {
            let res = await deleteUser(dataDelete);
            if (res && res.message && res.user) {
                setMessage({ content: res.message, error: false });
                setOpenToast(true);
                getUsers(page);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage({
                    content: error.response.data.message,
                    error: true,
                });
                setOpenToast(true);
            } else {
                setMessage({
                    content: "Error while deleting member",
                    error: true,
                });
                setOpenToast(true);
            }
        }
    };

    const handleOnClickButtonEdit = useCallback((user) => {
        setOpenModal(true);
        setAction("edit");
        setUserInformation(user);
    }, []);

    const handleOnClickButtonDelete = useCallback((user) => {
        setOpenConfirm(true);
        setUserInformation(user);
    }, []);

    return (
        <div className={cx("container")}>
            <div className={`my-3 ${cx("action")}`}>
                <strong>Actions:</strong>
                <div>
                    <CustomButton
                        title="Add new user"
                        variant="contained"
                        color="info"
                        size="medium"
                        startIcon={<Add />}
                        handleClick={() => {
                            setOpenModal(true);
                            setAction("add");
                        }}
                    />
                </div>
            </div>
            <div className="my-3">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    <TextField
                        color="secondary"
                        fullWidth
                        id="email-search"
                        label="Search users by email"
                        type="search"
                        variant="standard"
                        value={keyword}
                        onChange={(event) => {
                            setKeyword(event.target.value);
                        }}
                    />
                </Box>
            </div>
            <PersonnelTable
                className="my-3"
                headCell={headCells}
                data={listUsers}
                title="List of personnel"
                handleOnClickButtonEdit={handleOnClickButtonEdit}
                handleOnClickButtonDelete={handleOnClickButtonDelete}
            />
            {!keyword && (
                <Pagination
                    page={page}
                    variant="outlined"
                    count={totalPage}
                    color="primary"
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }}
                            {...item}
                        />
                    )}
                    onChange={handleChangePagination}
                />
            )}
            <ModalUser
                title={action === "add" ? "Add user" : "Edit user"}
                description="Fill in user information"
                openModal={openModal}
                handleCloseModal={() => {
                    setOpenModal(false);
                    setUserInformation({
                        id: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        avatar: "",
                    });
                }}
                handleSubmit={action === "add" ? handleAddUser : handleEditUser}
                fillId={userInformation.id ? userInformation.id + "" : ""}
                fillEmail={userInformation.email || ""}
                fillFirstName={userInformation.first_name || ""}
                fillLastName={userInformation.last_name || ""}
            />
            <ModalConfirm
                title="Delete user?"
                description={`Confirm deletion of member whose email is ${
                    userInformation.email || ""
                }? Data cannot be restored after deletion.`}
                openModal={openConfirm}
                handleCloseModal={() => {
                    setOpenConfirm(false);
                    setUserInformation({
                        id: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        avatar: "",
                    });
                }}
                handleSubmit={() => {
                    handleDeleteUser(userInformation.id);
                }}
            />
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

export default PersonnelManagement;
