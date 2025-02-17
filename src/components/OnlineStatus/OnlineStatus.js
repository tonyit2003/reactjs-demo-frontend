import PropTypes from "prop-types";
import { useSyncExternalStore } from "react";

function OnlineStatus({ children }) {
    const subscribeToOnlineStatus = (callback) => {
        window.addEventListener("online", callback);
        window.addEventListener("offline", callback);

        // Trả về một hàm cleanup khi component unmount
        return () => {
            window.removeEventListener("online", callback);
            window.removeEventListener("offline", callback);
        };
    };

    const getOnlineStatus = () => {
        return navigator.onLine;
    };

    const isOnline = useSyncExternalStore(
        subscribeToOnlineStatus,
        getOnlineStatus
    );

    return (
        <>
            {isOnline ? (
                <div>{children}</div>
            ) : (
                <div style={{ padding: "10px", textAlign: "center" }}>
                    <h1>You are offline!</h1>
                    <p>Check your Internet connection.</p>
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            backgroundColor: "red",
                            color: "white",
                        }}
                    >
                        Connection interrupted
                    </div>
                </div>
            )}
        </>
    );
}

OnlineStatus.propTypes = {
    children: PropTypes.node.isRequired,
};

export default OnlineStatus;
