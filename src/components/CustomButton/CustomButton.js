import { Button } from "@mui/material";
import PropTypes from "prop-types";

function CustomButton({
    title = "",
    variant = "contained",
    color = "success",
    size = "medium",
    startIcon,
    endIcon,
    disabled = false,
    loading = false,
    className = "",
    Custom,
    href,
    handleClick,
}) {
    return Custom ? (
        <Custom
            onClick={handleClick}
            href={href}
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            loading={loading}
            className={className}
        >
            {title}
        </Custom>
    ) : (
        <Button
            onClick={handleClick}
            href={href}
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            loading={loading}
            className={className}
        >
            {title}
        </Button>
    );
}

CustomButton.propTypes = {
    title: PropTypes.string,
    variant: PropTypes.oneOf(["text", "contained", "outlined"]),
    color: PropTypes.oneOf([
        "error",
        "info",
        "inherit",
        "primary",
        "secondary",
        "success",
        "warning",
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    Custom: PropTypes.object,
    href: PropTypes.string,
    handleClick: PropTypes.func,
};

export default CustomButton;
