import config from "~/config";
import AdminLayout from "~/layouts/AdminLayout";
import Home from "~/pages/Home";
import PersonnelManagement from "~/pages/PersonnelManagement";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    {
        path: config.routes.personnelManagement,
        component: PersonnelManagement,
        layout: AdminLayout,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
