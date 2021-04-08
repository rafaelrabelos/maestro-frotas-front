import { Route } from "react-router-dom";
import React from "react";
import { Logon, Register, Pet, Home, Profile } from "./pages";
import { AdminProfile, AdminDashboard, ManageUsers, ManageStock } from "./pages";

var userRoutes = [
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
    layout: "/user",
    page: "/home",
    nome: "Dashboard",
    component: Home,
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

var adminRoutes = [
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
    nome: "Classes",
    component: ManageUsers,
  },
  {
    layout: "/admin",
    page: "/gerenciar-frota",
    nome: "Classes",
    component: ManageStock,
  },
];

const routes = userRoutes.concat(adminRoutes);

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
