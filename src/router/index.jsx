import { ProfileView } from "../components/ProfileView";
import { AddLeave } from "../Pages/admin/addLeave";
import { AdminDashboard } from "../Pages/admin/adminDashboard";
import { HrDashboard } from "../Pages/hr/hrDashboard";
import { Leave } from "../Pages/user/Leave";
import { UserDashboard } from "../Pages/user/userDashboard";

export const AdminRoutes = [
  { path: "/admin", component: <AdminDashboard /> },
  { path: "/admin/profile/:id", component: <ProfileView /> },
  { path: "/admin/addleave", component: <AddLeave /> },

  // Add other admin routes here
];

export const HrRoutes = [
  { path: "/hr", component: <HrDashboard /> },
  // Add other HR routes here
];

export const UserRoutes = [
  { path: "/user", component: <UserDashboard /> },
  { path: "/user/leave", component: <Leave /> },

  // Add other user routes here
];
