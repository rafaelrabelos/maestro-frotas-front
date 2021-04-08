import React from "react";
import { withRouter } from "react-router";
import buildSideNav  from '../../shared/util/sidebar';
import "layout/admin/styles/sidebar.css";
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
    };
  }

  menuSubItemList() {
    const {basePath} = this.props;
    const subItens_Pet = [
      {
        href: `${basePath}/pets`,
        faIco: "fa fa-dog",
        name: "Gerenciar pets",
        class: "nc",
        color: "#833f94",
        parentName: "Pets",
      },
      {
        href: `${basePath}/pets-classes`,
        faIco: "fa fa-tasks",
        name: "Classes",
        class: "nc",
        color: "#513f94",
        parentName: "Pets",
      },
      {
        href: `${basePath}/pets-racas`,
        faIco: "fa fa-cat",
        name: "Raças",
        class: "nc",
        color: "#943f82",
        parentName: "Pets",
      },
    ];

    const subItens_Users = [
      {
        href: `${basePath}/users`,
        faIco: "fa fa-users-cog",
        name: "Gerenciar Usuários",
        class: "nc",
        parentName: "Usuários",
      },
    ];

    const subItens_Vaccine = [
      {
        href: `${basePath}/vacinas`,
        faIco: "fa fa-pills",
        name: "Gerenciar Vacinas",
        class: "nc",
        parentName: "Vacinas",
      },
    ];

    const subItens_Ajuste = [
      {
        href: `${basePath}/settings-geral`,
        faIco: "fa fa-cog",
        name: "Geral",
        class: "nc",
        parentName: "Ajustes",
      },
      {
        href: `${basePath}/settings-sistema`,
        faIco: "fa fa-wrench",
        name: "Sistema",
        class: "nc",
        parentName: "Ajustes",
      },
    ];

    return subItens_Pet.concat(
      subItens_Users.concat(subItens_Vaccine.concat(subItens_Ajuste))
    );
  }

  menuItemList() {
    const {basePath} = this.props;
    const itens = [
      {
        href: basePath,
        faIco: "fa fa-home",
        name: "Home",
        class: "nc",
        group: true,
        subItens: null,
      },
      //in group
      {
        href: basePath,
        faIco: "fa fa-paw",
        name: "Pets",
        class: "darkerlishadow",
        color: "#860ba5",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-user-circle",
        name: "Usuários",
        class: "darkerli",
        color: "#04885c",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-syringe",
        name: "Vacinas",
        class: "darkerli",
        color: "#75b1f5",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-rocket",
        name: "Ajustes",
        class: "darkerlishadowdown",
        group: true,
        subItens: [],
      },
      //ou of group
      {
        href: basePath,
        faIco: "fa fa-question-circle",
        name: "Ajuda",
        class: "nc",
        color: "#0c91a8",
        group: false,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-bug",
        name: "Bugs",
        class: "nc",
        color: "Tomato",
        group: false,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-blog",
        name: "Blog",
        class: "nc",
        color: "Orange",
        group: false,
        subItens: [],
      },
    ];

    return itens;
  }

  render() {
    const menuItemList = this.menuItemList();
    const menuSubItemList = this.menuSubItemList();
    return buildSideNav(menuItemList, menuSubItemList);
  }
}

export default withRouter(SideBar);
