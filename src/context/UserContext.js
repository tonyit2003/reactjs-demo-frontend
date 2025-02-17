const { createContext, useState } = require("react");

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const initUser =
        localStorage.getItem("token") && localStorage.getItem("email")
            ? { email: localStorage.getItem("email"), auth: true }
            : { email: "", auth: false };
    const [user, setUser] = useState(initUser);

    const login = (email) => {
        setUser({ email, auth: true });
    };

    const logout = () => {
        setUser({ email: "", auth: false });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
