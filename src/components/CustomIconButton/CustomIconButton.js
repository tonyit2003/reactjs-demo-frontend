import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

function CustomIconButtons({
    color = "success",
    size = "medium",
    icon,
    disabled = false,
    loading = false,
    href,
    handleClick,
}) {
    return (
        <IconButton
            onClick={handleClick}
            href={href}
            color={color}
            size={size}
            disabled={disabled}
            loading={loading}
        >
            {icon}
        </IconButton>
    );
}

CustomIconButtons.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    icon: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    href: PropTypes.string,
    handleClick: PropTypes.func,
};

export default CustomIconButtons;
