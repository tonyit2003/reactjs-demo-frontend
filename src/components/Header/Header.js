import { useContext, useState } from "react";
import classNames from "classnames/bind";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Zoom } from "@mui/material";
import { UserContext } from "~/context/UserContext";

import styles from "./Header.module.scss";
import config from "~/config";
import { DarkMode } from "@mui/icons-material";

const cx = classNames.bind(styles);

function Header() {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState({ content: "", error: false });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setOpenToast(true);
        setMessage({ content: "Logout successfully", error: false });
        navigate(config.routes.login);
    };

    const handleCloseToast = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setMessage({ content: "", error: false });
        setOpenToast(false);
    };

    return (
        <div className={cx("header")}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <Link
                                className={cx("link")}
                                to={config.routes.home}
                            >
                                ReactJS Demo
                            </Link>
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? cx("link-small", "active")
                                            : cx("link-small")
                                    }
                                    to={config.routes.home}
                                    onClick={handleCloseNavMenu}
                                >
                                    <MenuItem>Home</MenuItem>
                                </NavLink>
                                {user && user.auth && (
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? cx("link-small", "active")
                                                : cx("link-small")
                                        }
                                        to={config.routes.personnelManagement}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <MenuItem>
                                            Personnel management
                                        </MenuItem>
                                    </NavLink>
                                )}
                            </Menu>
                        </Box>
                        <AdbIcon
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <Link
                                className={cx("link")}
                                to={config.routes.home}
                            >
                                ReactJS Demo
                            </Link>
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? cx("link", "active") : cx("link")
                                }
                                to={config.routes.home}
                                onClick={handleCloseNavMenu}
                            >
                                <MenuItem>Home</MenuItem>
                            </NavLink>
                            {user && user.auth && (
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? cx("link", "active")
                                            : cx("link")
                                    }
                                    to={config.routes.personnelManagement}
                                    onClick={handleCloseNavMenu}
                                >
                                    <MenuItem>Personnel management</MenuItem>
                                </NavLink>
                            )}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <div className={cx("user")}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <div>{user && user.auth && user.email}</div>
                            </div>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div className={cx("menu-item")}>
                                    {user && user.auth ? (
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Button
                                                onClick={handleLogout}
                                                className={cx("item")}
                                            >
                                                Logout
                                            </Button>
                                        </MenuItem>
                                    ) : (
                                        <>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Link
                                                    to={config.routes.login}
                                                    className={cx("item")}
                                                >
                                                    Login
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Link
                                                    to={config.routes.register}
                                                    className={cx("item")}
                                                >
                                                    Register
                                                </Link>
                                            </MenuItem>
                                        </>
                                    )}
                                </div>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
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

export default Header;
