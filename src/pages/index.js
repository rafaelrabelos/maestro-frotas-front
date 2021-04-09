import Logon from "./user/logon";
import Register from "./user/register";
import Home from "./user/home";
import Pet from "./user/pet";
import Profile from "./user/profile";

// Admin imports
import AdminDashboard from "./admin/home";
import AdminProfile from "./admin/profile";
import ManageStock from "./admin/manage-stock";
import ManageUsers from "./admin/manage-users";
import PasswordRecovery from './user/pass-recovery'

export {
  Logon,
  Register,
  Pet,
  Home,
  Profile,
  // Admin exports
  AdminDashboard,
  AdminProfile,
  ManageStock,
  ManageUsers,
  PasswordRecovery
};
