import { Route } from "react-router-dom";
import React from "react";
// Auth pages components
import { Logon, Register, PasswordRecovery} from "./pages";
// User pages components
import { UserDashboard, Profile, Pet } from "./pages";
// Admin pages components
import { AdminDashboard, AdminProfile, ManageUsers, ManageStock } from "./pages";
// Public pages components
import { Contact } from "./pages";

const publicRoutes = [
  {
    layout: "/auth",
    page: "/contato",
    nome: "Contato",
    component: Contact,
  },
];

const authRoutes = [
  {
    layout: "/auth",
    page: "/login",
    nome: "Login",
    component: Logon,
  },
  {
    layout: "/auth",
    page: "/cadastrar",
    nome: "Cadastrar",
    component: Register,
  },
  {
    layout: "/auth",
    page: "/recuperar-senha",
    nome: "Recuperar senha",
    component: PasswordRecovery,
  },
];

const userRoutes = [
  {
    layout: "/user",
    page: "/home",
    nome: "Dashboard",
    component: UserDashboard,
  },
  {
    layout: "/user",
    page: "/profile",
    nome: "Profile",
    component: Profile,
  },
  {
    layout: "/user",
    page: "/cadastrar",
    nome: "CadastrarPet",
    component: Pet,
  },
];

const adminRoutes = [
  {
    layout: "/admin",
    page: "/home",
    nome: "Dashboard",
    component: AdminDashboard,
  },
  {
    layout: "/admin",
    page: "/profile",
    nome: "Profile",
    component: AdminProfile,
  },
  {
    layout: "/admin",
    page: "/gerenciar-usuarios",
    nome: "Usuários",
    component: ManageUsers,
  },
  {
    layout: "/admin",
    page: "/gerenciar-frota",
    nome: "Frota",
    component: ManageStock,
  },
];

const routes = [].concat(...[
  userRoutes,
  adminRoutes,
  authRoutes,
  publicRoutes
]);

function getPageName(path) {
  
  const  pathParts = path.split('/').filter(x => x !== "");

  if(pathParts.length < 1){
    return ""
  }

  if(pathParts.length === 1){
    const isLayout = routes.filter((x) =>`${x.layout}` === path).length > 0;
    if(isLayout){
      path = path + "/home";
    }
  }

  if(pathParts.length === 2 && pathParts[1] === "home") {
    return ""
  }

  const routePage = routes.filter((x) =>`${x.layout}${x.page}` === path)[0];
  
  return routePage ? routePage.nome : "";
}

function getRoutes(routesArray, layout) {
  return routesArray.map((prop, key) => {
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.page}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
}

export default routes;
export { getRoutes, getPageName };
