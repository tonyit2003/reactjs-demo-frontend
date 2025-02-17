import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button, styled, TableCell, TableRow } from "@mui/material";
import classNames from "classnames/bind";

import PersonnelTableHead from "./components/PersonnelTableHead";
import PersonnelTableToolbar from "./components/PersonnelTableToolbar";
import CustomButton from "../CustomButton";
import { green } from "@mui/material/colors";
import { Delete, Edit } from "@mui/icons-material";
import styles from "./PersonnelTable.module.scss";

const cx = classNames.bind(styles);

const ButtonEdit = styled(Button)(() => ({
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
        backgroundColor: green[700],
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function PersonnelTable({
    headCell = [],
    data = [],
    title = "Data",
    className = "",
    handleOnClickButtonEdit,
    handleOnClickButtonDelete,
}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const visibleData = React.useMemo(
        () => [...data].sort(getComparator(order, orderBy)),
        [order, orderBy, data]
    );

    return (
        <Box sx={{ width: "100%" }} className={className}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <PersonnelTableToolbar
                    title={title}
                    numSelected={selected.length}
                />
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <PersonnelTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            headCell={headCell}
                        />
                        <TableBody>
                            {visibleData &&
                                visibleData.map((item, index) => {
                                    const isItemSelected = selected.includes(
                                        item.id
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, item.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={item.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            {headCell &&
                                                headCell.map(
                                                    (cell, cellIndex) => {
                                                        return (
                                                            <TableCell
                                                                key={`cell-${index}-${cellIndex}`}
                                                                align={
                                                                    cell.align
                                                                }
                                                            >
                                                                {item[cell.id]}
                                                            </TableCell>
                                                        );
                                                    }
                                                )}
                                            <TableCell>
                                                <div className={cx("actions")}>
                                                    <CustomButton
                                                        title="Edit"
                                                        color="success"
                                                        Custom={ButtonEdit}
                                                        startIcon={<Edit />}
                                                        handleClick={() => {
                                                            handleOnClickButtonEdit(
                                                                item
                                                            );
                                                        }}
                                                    />
                                                    <CustomButton
                                                        title="Delete"
                                                        color="error"
                                                        startIcon={<Delete />}
                                                        handleClick={() => {
                                                            handleOnClickButtonDelete(
                                                                item
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </Box>
    );
}

PersonnelTable.propTypes = {
    headCell: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    handleOnClickButtonEdit: PropTypes.func,
    handleOnClickButtonDelete: PropTypes.func,
};

export default React.memo(PersonnelTable);
