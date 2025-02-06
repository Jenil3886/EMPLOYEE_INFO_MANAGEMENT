import { AdminDashboard } from "../Pages/admin/adminDashboard";
import { HrDashboard } from "../Pages/hr/hrDashboard";
import { UserDashboard } from "../Pages/user/userDashboard";

export const AdminRoutes = [
  { path: "/admin/dashboard", component: <AdminDashboard /> },
  // Add other admin routes here
];

export const HrRoutes = [
  { path: "/hr/dashboard", component: <HrDashboard /> },
  // Add other HR routes here
];

export const UserRoutes = [
  { path: "/user/dashboard", component: <UserDashboard /> },
  // Add other user routes here
];
