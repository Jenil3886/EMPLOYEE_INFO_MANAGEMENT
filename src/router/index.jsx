import { AdminDashboard } from "../Pages/admin/adminDashboard";
import { HrDashboard } from "../Pages/hr/hrDashboard";
import { UserDashboard } from "../Pages/user/userDashboard";

export const AdminRoutes = [
  { path: "/admin", component: <AdminDashboard /> },
  // Add other admin routes here
];

export const HrRoutes = [
  { path: "/hr", component: <HrDashboard /> },
  // Add other HR routes here
];

export const UserRoutes = [
  { path: "/user", component: <UserDashboard /> },
  // Add other user routes here
];
