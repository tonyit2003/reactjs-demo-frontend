import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

import Header from "~/components/Header";

function AdminLayout({ children }) {
    return (
        <>
            <Header />
            <Container>
                <div>{children}</div>
            </Container>
        </>
    );
}

AdminLayout.ropTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
