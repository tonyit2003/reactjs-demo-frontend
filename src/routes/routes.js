import config from "~/config";
import AdminLayout from "~/layouts/AdminLayout";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import PersonnelManagement from "~/pages/PersonnelManagement";
import Register from "~/pages/Register";

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: AdminLayout },
    {
        path: config.routes.personnelManagement,
        component: PersonnelManagement,
        layout: AdminLayout,
    },
    { path: config.routes.login, component: Login, layout: AdminLayout },
    { path: config.routes.register, component: Register, layout: AdminLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
